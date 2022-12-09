import { Endpoints } from "@octokit/types";
import { useRouter } from "next/router";
import React from "react";
import { ReactElement, useEffect } from "react";
import { Layout, Box, Link, Button } from "../../../components";
import { styled } from "../../../stitches.config";
import { NextPageWithLayout } from "../../_app";
import { Tabs } from "../../../components";

const Title = styled("h1", {
  margin: "0",
  fontSize: " $4",
  fontFamily: "$mono",
});

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
type userResponseData = Endpoints["GET /user"]["response"]["data"];

const Page: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();
  const { repo, userName } = query;
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
        <Link href={"/"} variant={"tertiary"}>
          {repo}
        </Link>
      </Box>
      <Tabs.Root defaultValue="open">
        <Tabs.List>
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
            }}
          >
            {data &&
              data.map((item) => {
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
          {data &&
            data.map((item) => {
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
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
