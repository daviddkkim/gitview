import { Endpoints } from "@octokit/types";
import React from "react";
import { ReactElement, useEffect } from "react";
import { Layout, Box, Button, Tabs } from "../components";
import { styled } from "../stitches.config";
import { NextPageWithLayout } from "./_app";
import { Table } from "../components";
import { getUpdatedTime } from "../utils/time";
import type { GraphQlQueryResponseData } from "@octokit/graphql";

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

  const [pulls, setPulls] = React.useState<GraphQlQueryResponseData | null>()
  console.log(pulls)
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
    const pullsUrl = "/api/issues/assigned";

    fetch(pullsUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    }).then(async (data) => {
      const dataBody = (await data.json()) as GraphQlQueryResponseData;
      setPulls(dataBody);
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
      <Tabs.Root
        defaultValue="pulls"
        css={{
          borderRadius: "$1",
        }}
      >
        <Tabs.List
          css={{
            marginLeft: "-$4",
            marginRight: "-$4",
            padding: '0 $6'
          }}
        >
          <Tabs.Trigger asChild value={"pulls"}>
            <Button variant={"tertiary"}>Pulls</Button>
          </Tabs.Trigger>
          <Tabs.Trigger asChild value={"repos"}>
            <Button variant={"tertiary"}>Repos</Button>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={"pulls"} css={{
          flexDirection: 'column',
        }}>
          <Box css={{
            flexDirection: 'column',
            padding: '$2 $6'
          }}>
            <Table.Root>
              {pulls &&
                pulls.viewer.pullRequests.nodes.map((pull: any) => {
                  return (
                    <Table.LinkBodyRow
                      key={pull.id}
                      href={"/"}
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
                            flexDirection: "column",
                            gap: "$1",
                            alignItems: "flex-start",
                          }}
                        >
                          <MainText>{pull.title}</MainText>
                          <SubText css={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'wrap',
                            display: '-webkit-box',
                            '-webkit-line-clamp': 2,
                            '-webkit-box-orient': 'vertical'
                          }}>{pull.body}</SubText>
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
                        <SubText>
                          {getUpdatedTime(Date.parse(pull.created_at))}
                        </SubText>
                      </Table.BodyCell>
                    </Table.LinkBodyRow>
                  );
                })}
            </Table.Root>
          </Box>
        </Tabs.Content>
        <Tabs.Content value={"repos"} css={{
          flexDirection: 'column',
        }}>
          <Box css={{
            flexDirection: 'column',
            padding: '$2 $6'
          }}>
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
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
