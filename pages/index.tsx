import { Endpoints } from "@octokit/types";
import React from "react";
import { ReactElement, useEffect } from "react";
import { Layout, Box, Link, Button } from "../components";
import { styled } from "../stitches.config";
import { NextPageWithLayout } from "./_app";
import { Table } from "../components";
import { getUpdatedTime } from "../utils/time";

const Title = styled("h1", {
  margin: "0",
  fontSize: " $4",
  fontFamily: "$mono",
});

const SubText = styled("span", {
  color: '$textSecondary',
  fontSize: '$2'
})

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

  if (!user) return <div> loading... </div>;

  return (
    <Box
      css={{
        padding: "$4",
        gap: "$4",
        flexDirection: "column",
      }}
    >
      <Button variant={"tertiary"} disabled>
        {user.login}
      </Button>
      <Box
        css={{
          gap: "$2",
          maxWidth: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Table.Root>
          <Table.HeaderRow>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Description
            </Table.HeaderCell>
            <Table.HeaderCell>
              Upated at
            </Table.HeaderCell>
          </Table.HeaderRow>
          {data && (
            data.map((repo) => {
              return (
                <Table.LinkBodyRow key={repo.id} href={"/" + user.login + "/" + repo.name}>
                  <Table.BodyCell>
                    {repo.name} <SubText>{repo.private ? 'private' : "public"}</SubText>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    <SubText css={{
                      fontSize:'$3'
                    }}>
                      {repo.description}
                    </SubText>
                  </Table.BodyCell>
                  <Table.BodyCell>
                    {getUpdatedTime((Date.parse(repo.pushed_at)))}
                  </Table.BodyCell>
                </Table.LinkBodyRow>
              );
            }))}
        </Table.Root>
      </Box>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
