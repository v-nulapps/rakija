import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

export default function renderer({ json }) {
  const document = json

  const options = {
    renderNode: {
      [BLOCKS.HEADING_5]: function p(node, children) {
        return <h5>{children}</h5>
      },
      [BLOCKS.PARAGRAPH]: function p(node, children) {
        return <p>{children}</p>
      },
      [INLINES.HYPERLINK]: function hyperlink(node, children) {
        return (
          <a target="_blank" href={node.data.uri} rel="noopener noreferrer">
            {children}
          </a>
        )
      },
    },
  }
  return documentToReactComponents(document, options)
}
