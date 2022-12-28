import Link from "next/link";
import { styled } from "../stitches.config";

const Root = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  width: "100%",
  borderRadius: "$1",
});

const HeaderRow = styled("div", {
  width: "100%",
  height: "$7",
  display: "flex",
});

const LinkBodyRow = styled(Link, {
  cursor: "default",
  display: "flex",
  outline: "none",
  padding: "$3",
  gap: "$4",
  textDecoration: "none",
  justifyContent: "space-between",
  border: "1px solid $fgBorder",
  background: "linear-gradient(120deg, $colors$bgSecondary, $colors$fgHover)",
  borderRadius: "$1",
  color: "$textPrimary",
  "&:hover": {
    background: "$fgHover",
  },
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
  display: "flex",
});

const BodyCell = styled("div", {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  display: "flex",
  gap: "$1",
});

export { HeaderCell, LinkBodyRow, HeaderRow, BodyCell, Root };
