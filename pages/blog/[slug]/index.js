// https://satus.studiofreight.com
import { fetchCmsQuery } from 'contentful/api'
import { blogPageQuery, blogSlugQuery } from 'contentful/queries/blog.graphql'
import { Layout } from 'layouts/default'

export default function PortfolioBio({ blogdata }) {
  return (
    <Layout theme="dark">
      <div>{blogdata.title}</div>
    </Layout>
  )
}

export const getStaticPaths = async ({ preview = false }) => {
  const [{ blog }] = await Promise.all([
    fetchCmsQuery(blogSlugQuery, {
      preview,
    }),
  ])

  const paths = blog.items.map(({ slug }) => ({
    params: { slug: slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ preview = false, params }) {
  const [{ blog }] = await Promise.all([
    fetchCmsQuery(blogPageQuery, {
      preview,
      slug: params.slug,
    }),
  ])

  return {
    props: {
      blogdata: blog.items[0],
      key: params.slug,
    },
    revalidate: 30,
  }
}
