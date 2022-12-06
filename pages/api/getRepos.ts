// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GIT_ACCESS_TOKEN,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await octokit.request("GET /user/repos?sort=updated,direction=desc,per_page=100",);
  res.status(200).json(response.data);
}
