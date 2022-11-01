// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  //console.log(req.body.lvalue)

  res.status(200).json({ auth: 'ok'})
}
