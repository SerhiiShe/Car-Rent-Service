import { RichText } from '@payloadcms/richtext-lexical/react'

export default function ContentBlock({ content }: any) {
  if (!content) return null

  return (
    <section className="max-w-4xl mx-auto py-16 px-6">
      <div className="prose prose-lg prose-gray max-w-none mx-auto">
        <RichText data={content} />
      </div>
    </section>
  )
}
