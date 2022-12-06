import { styled } from "../stitches.config";
import Link from "next/link";

const StyledLink = styled(Link, {
  unset: "all",
  textDecoration: 'none',
  fontSize: "$3",
  gap: "$2",
  height: "$6",
  transition: "all 150ms ease-out",
  border: "1px solid transparent",
  borderRadius: "$1",
  padding: "$2",
  display: "flex",
  alignItems: "center",
  outline: "none",
  cursor: 'default',
  "&:focus-visible": {
    borderColor: "$focusBorder",
    boxShadow: "0px 0px 0px 2px $colors$focusShadow",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "$fgAccent",
        borderColor: "$fgAccentBorder",
        color: "$fgAccentText",
        "&:hover": {
          backgroundColor: "$fgAccentHover",
          borderColor: "$fgAccentBorderHover",
        },
      },
      secondary: {
        backgroundColor: "$fg",
        borderColor: "$fgBorder",
        color: "$fgText",
        "&:hover": {
          backgroundColor: "$fgHover",
          borderColor: "$fgBorderHover",
        },
      },
      tertiary: {
        backgroundColor: "transparent",
        color: "$textPrimary",
        "&:hover": {
          backgroundColor: "$fgHover",
        },
        
      },
    },
    stretch: {
      true: {
        width: "100%",
      },
      false: {
        width: "fit-content",
      },
    },
    active: {
      true: {
        backgroundColor: "$fgActive",
        borderColor: "transparent",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "secondary",
    stretch: "false",
    active: "false",
  },
});

export { StyledLink as Link };
