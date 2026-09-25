import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Cars } from './collections/Cars'
import { Rentals } from './collections/Rentals'
import { Pages } from './collections/Pages'
import { News } from './collections/News'
import { CarsPage } from './globals/CarsPage'
import { HomePage } from './globals/HomePage'
import { Footer } from './globals/Footer'
import { NewsPage } from './globals/NewsPage'
import { ContactPage } from './globals/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Cars, Rentals, Pages, News],
  globals: [CarsPage, HomePage, Footer, NewsPage, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename, prefix }) => {
            const endpoint = process.env.S3_ENDPOINT as string
            const publicUrl = endpoint.replace('/s3', `/object/public/${process.env.S3_BUCKET}`)

            return `${publicUrl}/${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        endpoint: process.env.S3_ENDPOINT as string,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION as string,
        forcePathStyle: true,
      },
    }),
  ],
})
