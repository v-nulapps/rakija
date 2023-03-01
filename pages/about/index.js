import { useRect } from '@studio-freight/hamo'
import { CmsMethods, fetchCmsQuery } from 'dato-cms/api.js'
import { aboutQuery } from 'dato-cms/queries/aboutpage.graphql'
import { Layout } from 'layouts/default'
import { useRef } from 'react'
import s from './about.module.scss'

export default function About({ content }) {
  const { title, subtitle, description } = content

  const rectRef = useRef()
  const [ref, compute] = useRect()

  // console.log('update')
  console.log('DATA FROM DATO', content)

  return (
    <Layout theme="light">
      <section className={s.about}>
        <div
          className={s.inner}
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          <h1 style={{ margin: '10px' }}>{title}</h1>
          <h2 style={{ margin: '10px' }}>{subtitle}</h2>
          <p style={{ margin: '10px' }}>{description}</p>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  const cmsMethods = new CmsMethods()

  const fetchAboutPage = await fetchCmsQuery(aboutQuery)
  const content = fetchAboutPage?.about

  return {
    props: {
      content,
    },
  }
}
