import { fetchCmsQuery } from 'contentful/api'
import { blogPreviewQuery } from 'contentful/queries/previews.graphql'

export default async function preview(req, res) {
  const response = req.query
  const previewToken = process.env.NEXT_CONTENTFUL_PREVIEW_TOKEN

  const responseSelector = {
    blog: {
      query: blogPreviewQuery,
      field: 'blog',
      redirectPath: 'slug',
      urlPrefix: '/blog/',
    },
  }

  async function redirectPreview({
    secret,
    slug,
    query,
    field,
    redirectPath,
    urlPrefix,
  }) {
    if (secret !== previewToken || !slug) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const data = await fetchCmsQuery(query, {
      preview: true,
      slug: slug,
    })

    const redirectSlug = data[field].items[0][redirectPath]

    if (!redirectSlug) {
      return res.status(401).json({ message: 'Invalid slug' })
    }

    res.setPreviewData({})
    res.writeHead(307, {
      Location: `${urlPrefix}${redirectSlug}`,
    })
  }

  await redirectPreview({ ...responseSelector[response.type], ...response })
  res.end()
}
