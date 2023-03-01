import { GraphQLClient } from 'graphql-request'

const fetchCmsQuery = async (query, variables) => {
  try {
    const endpoint = `https://graphql.datocms.com/`
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      },
    })
    return await graphQLClient.request(query, variables)
  } catch (error) {
    console.error(
      `There was a problem retrieving entries with the query ${query}`
    )
    console.error(error)
  }
}

// Start CmsMethods
class CmsMethods {
  slugTester = (slug) => {
    return typeof slug !== 'string' ? 'exclude' : slug
  }

  slugMe = (name, lastname) => {
    const prettier = (word) => {
      return word.trim().toLowerCase()
    }
    return `${prettier(name)}-${prettier(lastname)}`
  }

  metadata(input) {
    const preInput = input
      ? input
      : { title: null, description: null, og: null, keywords: null }
    return {
      title: preInput?.title || 'Stord',
      description: preInput.description || 'Stord Description',
      og: preInput?.openGraphImage
        ? this.imageLighter(preInput.openGraphImage)
        : '/og.jpg',
      keywords: preInput?.keywords || ['Stord'],
    }
  }
}

export { CmsMethods, fetchCmsQuery }
