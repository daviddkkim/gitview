import { Endpoints } from "@octokit/types";
import { useRouter } from "next/router";
import React from "react";
import { ReactElement, useEffect } from "react";
import { Layout, Box, Link } from "../../components";
import { styled } from "../../stitches.config";
import { NextPageWithLayout } from "../_app";

const Title = styled("h1", {
  margin: "0",
  fontSize: " $4",
  fontFamily: "$mono",
});



type listUserReposResponseData = Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();
  const { repo } = query;
  const [data, setData] = React.useState<listUserReposResponseData | null>(
    null
  );

  useEffect(() => {
    if (isReady) {
      const url = "/api/repos/" + repo;
      fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then(async (data) => {
        const dataBody = (await data.json()) as listUserReposResponseData;
        setData(dataBody);
      });
    }
  }, []);

  return (
    <Box
      css={{
        padding: "$4",
        gap: "$4",
        flexDirection: "column",
      }}
    >
      <Title>Repo</Title>
      <Link href={"/"}>Back</Link>
      <div>
        {data && data.name}
      </div>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
