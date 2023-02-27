import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await res.revalidate('/')

  return res.json({ revalidate: true })
}
