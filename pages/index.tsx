import { Endpoints } from "@octokit/types";
import React from "react";
import { ReactElement, useEffect } from "react";
import { Layout, Box, Link, Button } from "../components";
import { styled } from "../stitches.config";
import { NextPageWithLayout } from "./_app";
import { Table } from "../components";
import { getUpdatedTime } from "../utils/time";
import Image from "next/image";

const Title = styled("h1", {
  margin: "0",
  fontSize: " $4",
  fontFamily: "$mono",
});

const SubText = styled("span", {
  color: "$textSecondary",
  fontSize: "$3",
});

const MainText = styled("h2", {
  margin: 0,
  fontWeight: 500,
  fontSize: "$3",
});

type listUserReposResponseData =
  Endpoints["GET /repos/{owner}/{repo}"]["response"]["data"];

const Page: NextPageWithLayout = () => {
  const [data, setData] = React.useState<listUserReposResponseData[] | null>(
    null
  );

  useEffect(() => {
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

  if (!data) return <div> loading... </div>;

  return (
    <Box
      css={{
        padding: "0 $4",
        gap: "$4",
        flexDirection: "column",
      }}
    >
      <Box
        css={{
          gap: "$2",
          maxWidth: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Table.Root>
          {data &&
            data.map((repo) => {
              return (
                <Table.LinkBodyRow
                  key={repo.id}
                  href={"/" + repo.owner.login + "/" + repo.name}
                >
                  <Table.BodyCell
                    css={{
                      flexDirection: "column",
                      gap: "$2",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      css={{
                        gap: "$1",
                        alignItems: " center",
                      }}
                    >
                      <MainText>{repo.name}</MainText>
                      <SubText
                        css={{
                          fontSize: "$3",
                        }}
                      >
                        {repo.private ? "private" : "public"}
                      </SubText>
                    </Box>
                    <Box>
                      <SubText>{repo.description ?? "-"}</SubText>
                    </Box>
                  </Table.BodyCell>
                  <Table.BodyCell
                    css={{
                      justifyContent: "flex-end",
                      gap: "$2",
                      alignItems: "flex-end",
                      flexDirection: "column",
                    }}
                  >
                    <SubText>{repo.fork ? "Forked" : ""}</SubText>
                    <SubText>
                      {getUpdatedTime(Date.parse(repo.pushed_at))}
                    </SubText>
                  </Table.BodyCell>
                </Table.LinkBodyRow>
              );
            })}
        </Table.Root>
      </Box>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
