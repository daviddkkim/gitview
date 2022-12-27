import Link from "next/link";
import { styled } from "../stitches.config";

const Root = styled("div", {
    display: "table",
    width: "100%",
    borderRadius: "$1",
});

const HeaderRow = styled("div", {
    width: "100%",
    height: "$7",
    display: "table-row",
});

const LinkBodyRow = styled(Link, {
    height: "$7",
    display: "table-row",
    outline: "none",
    textDecoration: 'none',
    color: '$textPrimary',
    "&:hover": {
        backgroundColor: "$fgHover",
    },
    boxShadow: "0px 1px $colors$separator",
    "&:last-child": {
        boxShadow: "none",
    },
    "&:focus-visible": {
        borderColor: "$focusBorder",
        boxShadow: "0px 0px 0px 2px $colors$focusShadow",
    },
});

const HeaderCell = styled("div", {
    justifyContent: "flex-start",
    textAlign: "start",
    alignItems: "center",
    padding: "$3 $5",
    fontSize: "$2",
    fontWeight: 500,
    color: "$textSecondary",
    display: "table-cell",
    verticalAlign: 'middle'
});


const BodyCell = styled("div", {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "$2 $5",
    display: "table-cell",
    verticalAlign: 'middle'
});

export { HeaderCell, LinkBodyRow, HeaderRow, BodyCell, Root };
