import { useRect } from '@studio-freight/hamo'
import { Link } from 'components/link'
import { fetchCmsQuery } from 'dato-cms/api.js'
import {
  allBlogsQuery,
  getAllPageSlugsQuery,
} from 'dato-cms/queries/blogs.graphql'
import { Layout } from 'layouts/default'
import Image from 'next/image'
import { useRef } from 'react'
import { StructuredText } from 'react-datocms'

export default function Blog({ data }) {
  const { title, image, richText } = data

  const rectRef = useRef()
  const [ref, compute] = useRect()

  return (
    <Layout theme="light">
      <section>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ margin: '10px' }}>{title}</h1>
          <p style={{ margin: '10px' }}>
            <StructuredText data={richText.value} />
          </p>

          {image && <Image src={image.url} alt="" width={500} height={500} />}
        </div>

        <Link href="/blog" style={{ margin: '10px' }}>
          <h2 style={{ margin: '20px' }}>back to Blogs</h2>
        </Link>
      </section>
    </Layout>
  )
}

export const getStaticPaths = async (context) => {
  const slugQuery = await fetchCmsQuery(allBlogsQuery, {})

  const paths = slugQuery?.allBlogs.map(({ slug }) => ({
    params: { slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ preview = false, params }) => {
  const fetchBlogPost = await fetchCmsQuery(getAllPageSlugsQuery, {
    slug: params.slug,
  })

  if (!fetchBlogPost) {
    return { notFound: true }
  }

  const data = fetchBlogPost.blog

  return {
    props: {
      data,
      key: params.slug,
    },
  }
}
