import { Endpoints } from "@octokit/types";
import { useRouter } from "next/router";
import React from "react";
import { ReactElement, useEffect } from "react";
import { Layout, Box, Link, Button } from "../../../components";
import { styled } from "../../../stitches.config";
import { NextPageWithLayout } from "../../_app";
import { Tabs } from "../../../components";

const CardTitle = styled("h2", {
  margin: "0",
  fontSize: "$3",
});

const CardDescription = styled("span", {
  margin: "0",
  fontSize: "$3",
  color: "$textSecondary",
});

type listUserReposResponseData =
  Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];
type IssuesListResponseData =
  Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();
  const { repo, userName } = query;
  const [prData, setPrData] = React.useState<listUserReposResponseData | null>(
    null
  );
  const [issuesData, setIssuesData] =
    React.useState<IssuesListResponseData | null>(null);

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
        setPrData(dataBody);
      });
      const issuesUrl = "/api/issues/" + repo;
      fetch(issuesUrl, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }).then(async (data) => {
        const dataBody = (await data.json()) as IssuesListResponseData;
        setIssuesData(dataBody);
      });
    }
  }, [isReady, repo]);

  return (
    <Box
      css={{
        padding: "$4",
        gap: "$4",
        flexDirection: "column",
      }}
    >
      <Box
        css={{
          gap: "$2",
          alignItems: "center",
        }}
      >
        <Link href={"/"} variant={"tertiary"}>
          {userName && userName}
        </Link>
        /
        <Button disabled variant={"tertiary"}>
          {repo}
        </Button>
      </Box>
      <Tabs.Root defaultValue="pr">
        <Tabs.List
          css={{
            marginLeft: "-$4",
            marginRight: "-$4",
          }}
        >
          <Tabs.Trigger asChild value={"pr"}>
            <Button variant={"tertiary"}>Pull Requests</Button>
          </Tabs.Trigger>
          <Tabs.Trigger asChild value={"issues"}>
            <Button variant={"tertiary"}>Issues</Button>
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={"pr"}>
          <Tabs.Root
            defaultValue="open"
            css={{
              border: "1px solid $separator",
              backgroundColor: "$bgSecondary",
              borderRadius: "$1",
            }}
          >
            <Tabs.List
              css={{
                borderBottom: "1px solid $separator",
                paddingTop: "$2",
              }}
            >
              <Tabs.Trigger asChild value={"open"}>
                <Button variant={"tertiary"}>Open</Button>
              </Tabs.Trigger>
              <Tabs.Trigger asChild value={"closed"}>
                <Button variant={"tertiary"}>Closed</Button>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={"open"}>
              <Box
                css={{
                  gap: "$2",
                  flexDirection: "column",
                  padding: "0  $4 $4 $4",
                }}
              >
                {prData &&
                  prData.map((item) => {
                    if (item.state === "open") {
                      return (
                        <Link
                          href={"/" + repo + "/" + item.id}
                          key={item.id}
                          css={{
                            flexDirection: "column",
                            gap: "$2",
                            border: "1px solid $separator",
                            padding: "$2",
                            borderRadius: "$1",
                            background: "$fg",
                            width: "100%",
                            alignItems: "flex-start",
                            height: "auto",
                          }}
                        >
                          <Box
                            css={{
                              gap: "$2",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              css={{
                                fontSize: "$1",
                                padding: "$1",
                                alignItems: "center",
                                background:
                                  item.state === "open" ? "$green8" : "$red8",
                                border: "1px solid $separator",
                                borderRadius: "$2",
                              }}
                            >
                              {item.state}
                            </Box>
                            <CardTitle>#{item.number}</CardTitle>
                            <CardTitle>{item.title} </CardTitle>
                          </Box>
                          {item.body && (
                            <CardDescription>{item.body}</CardDescription>
                          )}
                        </Link>
                      );
                    }
                  })}
              </Box>
            </Tabs.Content>
            <Tabs.Content value={"closed"}>
              <Box
                css={{
                  gap: "$2",
                  flexDirection: "column",
                  padding: "0  $4 $4 $4",
                }}
              >
                {prData &&
                  prData.map((item) => {
                    if (item.state === "closed") {
                      return (
                        <Link
                          href={"/" + repo + "/" + item.id}
                          key={item.id}
                          css={{
                            flexDirection: "column",
                            gap: "$2",
                            border: "1px solid $separator",
                            padding: "$2",
                            borderRadius: "$1",
                            background: "$fg",
                            width: "100%",
                            alignItems: "flex-start",
                            height: "auto",
                          }}
                        >
                          <Box
                            css={{
                              gap: "$2",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              css={{
                                fontSize: "$1",
                                padding: "$1",
                                alignItems: "center",
                                background: "$red8",
                                border: "1px solid $separator",
                                borderRadius: "$2",
                              }}
                            >
                              {item.state}
                            </Box>
                            <CardTitle>#{item.number}</CardTitle>
                            <CardTitle>{item.title} </CardTitle>
                          </Box>
                          {item.body && (
                            <CardDescription>{item.body}</CardDescription>
                          )}
                        </Link>
                      );
                    }
                  })}
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Tabs.Content>
        <Tabs.Content value={"issues"}>
          <Tabs.Root
            defaultValue="open"
            css={{
              border: "1px solid $separator",
              backgroundColor: "$bgSecondary",
              borderRadius: "$1",
            }}
          >
            <Tabs.List
              css={{
                borderBottom: "1px solid $separator",
                paddingTop: "$2",
              }}
            >
              <Tabs.Trigger asChild value={"open"}>
                <Button variant={"tertiary"}>Open</Button>
              </Tabs.Trigger>
              <Tabs.Trigger asChild value={"closed"}>
                <Button variant={"tertiary"}>Closed</Button>
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={"open"}>
              <Box
                css={{
                  gap: "$2",
                  flexDirection: "column",
                  padding: "0  $4 $4 $4",
                }}
              >
                {issuesData &&
                  issuesData.map((item) => {
                    if (item.state === "open") {
                      return (
                        <Link
                          href={"/" + repo + "/" + item.id}
                          key={item.id}
                          css={{
                            flexDirection: "column",
                            gap: "$2",
                            border: "1px solid $separator",
                            padding: "$2",
                            borderRadius: "$1",
                            background: "$fg",
                            width: "100%",
                            alignItems: "flex-start",
                            height: "auto",
                          }}
                        >
                          <Box
                            css={{
                              gap: "$2",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              css={{
                                fontSize: "$1",
                                padding: "$1",
                                alignItems: "center",
                                background:
                                  item.state === "open" ? "$green8" : "$red8",
                                border: "1px solid $separator",
                                borderRadius: "$2",
                              }}
                            >
                              {item.state}
                            </Box>
                            <CardTitle>#{item.number}</CardTitle>
                            <CardTitle>{item.title} </CardTitle>
                          </Box>
                          {item.body && (
                            <CardDescription>{item.body}</CardDescription>
                          )}
                        </Link>
                      );
                    }
                  })}
              </Box>
            </Tabs.Content>
            <Tabs.Content value={"closed"}>
              <Box
                css={{
                  gap: "$2",
                  flexDirection: "column",
                  padding: "0  $4 $4 $4",
                }}
              >
                {issuesData &&
                  issuesData.map((item) => {
                    if (item.state === "closed") {
                      return (
                        <Link
                          href={"/" + repo + "/" + item.id}
                          key={item.id}
                          css={{
                            flexDirection: "column",
                            gap: "$2",
                            border: "1px solid $separator",
                            padding: "$2",
                            borderRadius: "$1",
                            background: "$fg",
                            width: "100%",
                            alignItems: "flex-start",
                            height: "auto",
                          }}
                        >
                          <Box
                            css={{
                              gap: "$2",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              css={{
                                fontSize: "$1",
                                padding: "$1",
                                alignItems: "center",
                                background: "$red8",
                                border: "1px solid $separator",
                                borderRadius: "$2",
                              }}
                            >
                              {item.state}
                            </Box>
                            <CardTitle>#{item.number}</CardTitle>
                            <CardTitle>{item.title} </CardTitle>
                          </Box>
                          {item.body && (
                            <CardDescription>{item.body}</CardDescription>
                          )}
                        </Link>
                      );
                    }
                  })}
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
