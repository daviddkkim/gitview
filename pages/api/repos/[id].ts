// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { octokit } from "../../../utils/octokit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (id && typeof id === "string") {
    const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
      //hard code for now
      owner: "daviddkkim",
      repo: id,
    });
    res.status(200).json(response.data);
  } else {
    return res.status(400).end("invalid query");
  }
}
