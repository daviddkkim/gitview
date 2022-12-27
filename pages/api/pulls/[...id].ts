import { NextApiRequest, NextApiResponse } from "next";
import { octokit } from "../../../utils/octokit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ...slug } = req.query;

  if (slug && Object.keys(slug).length === 2) {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/pulls/{pull_number}?state=all",
      {
        //hard code for now
        owner: "daviddkkim",
        repo: slug[0],
        pull_number: slug[1]
      }
    );
    res.status(200).json(response.data);
  } else {
    return res.status(400).end("invalid query");
  }
}
