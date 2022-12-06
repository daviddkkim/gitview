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

const Page: NextPageWithLayout = () => {

  return (
    <Box
      css={{
        padding: "$4",
        gap: "$4",
        flexDirection: "column",
      }}
    >
      <Title>Repo</Title>
      <Link href={'/'}>Back</Link>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
