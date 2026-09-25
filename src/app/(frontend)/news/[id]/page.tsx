import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const revalidate = 60

export default async function SingleNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config })

  let article
  try {
    article = await payload.findByID({
      collection: 'news',
      id,
    })
  } catch (error) {
    return notFound()
  }

  if (!article) return notFound()

  const imageUrl =
    typeof article.coverImage === 'object' && article.coverImage?.url
      ? article.coverImage.url
      : null
  const date = new Date(article.createdAt).toLocaleDateString()

  return (
    <article className="pb-20">
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">
          Published on {date}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">{article.title}</h1>
        {imageUrl && (
          <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mt-8">
            <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6 prose prose-lg prose-gray">
        {article.content ? (
          <RichText data={article.content} />
        ) : (
          <p>No content provided for this article.</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-16 pt-8 border-t">
        <Link href="/news" className="text-black font-semibold hover:underline">
          &larr; Back to all news
        </Link>
      </div>
    </article>
  )
}
