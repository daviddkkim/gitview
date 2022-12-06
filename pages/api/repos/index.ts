// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {octokit} from '../../../utils/octokit';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await octokit.request("GET /user/repos?sort=updated,direction=desc");
  res.status(200).json(response.data);
}
