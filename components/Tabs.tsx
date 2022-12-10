import React from "react";
import * as TabsPrimitives from "@radix-ui/react-tabs";
import { styled } from "../stitches.config";

const Root = styled(TabsPrimitives.Root);

const List = styled(TabsPrimitives.List, {
  display: "flex",
  position: "relative",
  gap: "$1",
  marginBottom: "$4",
  borderBottom: "1px solid $separator",
});

const Trigger = styled(TabsPrimitives.Trigger, {
  position: "relative",
  marginBottom: "$2",
  "&:first-child": {
    marginLeft: "$4",
  },
  "&:after": {
    content: " ",
    position: "absolute",
    display: "flex",
    height: "0",
    bottom: "-$2",
    left: 0,
    right: 0,
    backgroundColor: "tranparent",
    transition: "all 200ms ease-out",
  },
  "&[data-state=active]": {
    "&:after": {
      content: " ",
      position: "absolute",
      display: "flex",
      height: "1px",
      bottom: "-10px",
      left: 0,
      right: 0,
      backgroundColor: "white",
    },
  },
});

const Content = styled(TabsPrimitives.Content, {
  display: "flex",
  flexDirection: "column",
});

export { Root, List, Trigger, Content };
