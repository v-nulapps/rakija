// pages/api/revalidate.js

export default async function handler(req, res) {
  // check for the POST request
  if (req.method !== 'POST') {
    return res
      .status(400)
      .json({ error: 'Invalid HTTP method. Only POST requests are allowed.' })
  }

  // check for the secret token
  // if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
  if (req.query.secret !== 'satus') {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // check that body is not empty
    const body = req.body
    if (!body) {
      res.status(400).send('Bad request (no body)')
      return
    }

    // get the slug to revalidate from body
    const slugToRevalidate = body.slug
    console.log(body)
    if (slugToRevalidate) {
      await res.unstable_revalidate(`/${slugToRevalidate}`)
      return res.json({ revalidated: true })
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
