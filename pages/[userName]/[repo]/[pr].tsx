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

type pullsDetailsResponseData =
    Endpoints["GET /repos/{owner}/{repo}/pulls/{pull_number}"]["response"]["data"];

const Page: NextPageWithLayout = () => {
    const { query, isReady } = useRouter();
    const { repo, pr } = query;
    const [prData, setPrData] = React.useState<pullsDetailsResponseData | null>(
        null
    );


    useEffect(() => {
        if (isReady) {
            const url = "/api/pulls/" + repo + "/" + pr;
            fetch(url, {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            }).then(async (data) => {
                const dataBody = (await data.json()) as pullsDetailsResponseData;
                setPrData(dataBody);
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
            {prData && prData.url}
        </Box>
    );
};

Page.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Page;
