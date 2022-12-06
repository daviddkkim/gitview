import type { NextPage } from 'next'
import { ReactElement } from 'react';
import { Layout, Box } from '../components';
import { styled } from '../stitches.config';
import { NextPageWithLayout } from './_app';

const Title = styled('h1', {
  margin: '0',
  fontSize: ' $4',
  fontFamily: "$mono"
})


const Page: NextPageWithLayout = () => {
  return (
    <Box css={{
      padding: '$4',
      gap: '$4'
    }}>
      <Title>
        Gitview
      </Title>
    </Box>
  )
}


Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
