import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GIT_ACCESS_TOKEN,
});
