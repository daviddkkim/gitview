import React from "react"
import { styled } from "@stitches/react"
import { Button, Box, Link } from "."
import Image from "next/image"
import { Endpoints } from "@octokit/types"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const NavContainer = styled('div', {
    display: 'flex',
    height: '$7',
    padding: '$6 $4',
    alignItems: "center",
})

type userResponseData = Endpoints["GET /user"]["response"]["data"];


const Nav = () => {
    const { query } = useRouter();

    const [user, setUser] = useState<userResponseData | null>(null)
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
        })
    }, [])

    return (
        <NavContainer>
            {user ?
                query.repo ?
                    <Box css={{
                        gap: '$2',
                        alignItems: 'center'
                    }}>

                        <Link href={'/'} variant={"tertiary"} css={{
                            color: '$textSecondary'
                        }}>
                            <Box css={{
                                borderRadius: '100%',
                                overflow: 'hidden'
                            }}>
                                <Image src={"https://avatars.githubusercontent.com/u/12561526?v=4"} height={20} width={20} alt={"avatar for " + user.login} />
                            </Box>
                            {user.login}
                        </Link>
                        /
                        <Button disabled variant={"tertiary"}>
                            {query.repo}
                        </Button>
                    </Box> :
                    <Button disabled variant={"tertiary"}>

                        <Box css={{
                            borderRadius: '100%',
                            overflow: 'hidden'
                        }}>
                            <Image src={"https://avatars.githubusercontent.com/u/12561526?v=4"} height={20} width={20} alt={"avatar for " + user.login} />
                        </Box>
                        {user.login}
                    </Button>
                : '...loading'}
        </NavContainer>
    )
}

export { Nav };