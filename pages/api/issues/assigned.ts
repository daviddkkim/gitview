import { NextApiRequest, NextApiResponse } from "next";
import { octokit } from "../../../utils/octokit";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const response = await octokit.graphql(
        `query {
            viewer {
              pullRequests(first: 100, states: OPEN) {
                totalCount
                nodes {
                  id
                  createdAt
                  body
                  number
                  title
                  state
                  assignees(first:10) {
                    nodes {
                        login
                        name
                        id
                        avatarUrl
                    }
                  }
                  author {
                    avatarUrl
                    login
                  }
                  mergeable
                  reviews(first:10) {
                    nodes {
                        author {
                            avatarUrl
                            login
                        }
                        state
                    }
                  }
                  comments(first:10) {
                    totalCount
                    nodes {
                        author {
                            avatarUrl
                            login
                        }
                        body
                        id
                    }
                  }
                  changedFiles
                  additions
                  deletions
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }`
    )
    res.status(200).json(response);
}
