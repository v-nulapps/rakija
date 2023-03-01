import { useRect } from '@studio-freight/hamo'
import { fetchCmsQuery } from 'dato-cms/api.js'
import { blogPageQuery } from 'dato-cms/queries/blogs.graphql'
import { Layout } from 'layouts/default'
import Link from 'next/link'
import { useRef } from 'react'
import s from './blogs.module.scss'

export default function Blogs({ data }) {
  const rectRef = useRef()
  const [ref, compute] = useRect()

  console.log('DATA FROM DATO', data)

  return data ? (
    <Layout theme="light">
      <section>
        <div
          className={s.wrapper}
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          {data.length > 0 &&
            data.map(({ title, slug }, i) => (
              <div key={i} className={s.links}>
                <Link href={`blog/${slug}`}>
                  <a>Go to {title}</a>
                </Link>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  ) : null
}

export const getStaticProps = async ({ preview = false }) => {
  // const variables = {
  //   id: '8332380',
  // }

  const fetchBlogPage = await fetchCmsQuery(blogPageQuery)

  // console.log({ fetchBlogPage })

  const data = fetchBlogPage?.blogPage?.blog
    ? fetchBlogPage.blogPage.blog
    : null

  console.log('DATA FROM DATO', data)

  return {
    props: {
      data,
    },
  }
}
