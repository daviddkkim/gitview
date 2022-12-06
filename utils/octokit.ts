import { createTokenAuth } from "@octokit/auth-token";

export let authToken = "";

export const initGithub = async () => {
  const githubPAT = process.env.GIT_ACCESS_TOKEN;

  if (!githubPAT) {
    throw Error("github pat token is not initialized");
  }
  const auth = createTokenAuth(githubPAT);
  const { token } = await auth();
  authToken = token;
};
