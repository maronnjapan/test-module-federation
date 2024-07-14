// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors'

type Data = {
  name: string;
  consumes: any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await runMiddleware(req, res, cors)
  res.status(200).json({ name: "John Doe", consumes: {} });
}


const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// ミドルウェアのラッパー関数
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}