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

const Page: NextPageWithLayout = () => {
  const [data, setData] = React.useState<listUserReposResponseData[] | null>(
    null
  );

  useEffect(() => {
    const url = "/api/getRepos";
    fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }).then(async (data) => {
      console.log(url);
      const dataBody = (await data.json()) as listUserReposResponseData[];
      console.log(dataBody);
      setData(dataBody);
    });
  }, []);

  return (
    <Box
      css={{
        padding: "$4",
        gap: "$4",
        flexDirection: "column",
      }}
    >
      <Title>Gitview</Title>
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
            console.log(repo.name)
            return (
              <Link key={repo.id} href={"/" + repo.name}>
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
