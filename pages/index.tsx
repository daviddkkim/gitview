import { Endpoints } from "@octokit/types";
import React from "react";
import { ReactElement, useEffect } from "react";
import { Layout, Box, Link } from "../components";
import { styled } from "../stitches.config";
import { NextPageWithLayout } from "./_app";

const Title = styled("h1", {
  margin: "0",
  fontSize: " $4",
  fontFamily: "$mono",
});

type listUserReposResponseData =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

type userResponseData = Endpoints["GET /user"]["response"]["data"];

const Page: NextPageWithLayout = () => {
  const [data, setData] = React.useState<listUserReposResponseData[] | null>(
    null
  );
  const [user, setUser] = React.useState<userResponseData | null>(null);

  useEffect(() => {
    const userUrl = "/api/user";
    fetch(userUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }).then(async (data) => {
      const dataBody = (await data.json()) as userResponseData;
      setUser(dataBody);
    });

    const url = "/api/repos";
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }).then(async (data) => {
      const dataBody = (await data.json()) as listUserReposResponseData[];
      setData(dataBody);
    });
  }, []);

  if(!user) return <div> loading... </div>

  return (
    <Box
      css={{
        padding: "$4",
        gap: "$4",
        flexDirection: "column",
      }}
    >
      <Link href="/" variant={'tertiary'}>{user.login}</Link>
      <Box
        css={{
          gap: "$2",
          maxWidth: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data ? (
          data.map((repo) => {
            return (
              <Link key={repo.id} href={"/"+ user.login + "/" + repo.name}>
                {repo.name}
              </Link>
            );
          })
        ) : (
          <div> loading...</div>
        )}
      </Box>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
