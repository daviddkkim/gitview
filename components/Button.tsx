import { styled } from "../stitches.config";

export const Button = styled("button", {
  unset: "all",
  fontSize: "$3",
  lineHeight: "$3",
  gap: "$2",
  height: "$6",
  transition: "all 200ms ease-out",
  border: "1px solid transparent",
  borderRadius: "$1",
  padding: "$2",
  display: "flex",
  alignItems: "center",
  outline: "none",
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
        svg: {
          color: "$textSecondary",
        },
      },
      tertiary: {
        backgroundColor: "transparent",
        color: "$textPrimary",
        "&:hover": {
          backgroundColor: "$fgHover",
        },
        svg: {
          color: "$textSecondary",
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
    muted: {
      true: {
        color: "$textMuted",
        pointerEvents: "none",
      },
      false: {},
    },
  },
  defaultVariants: {
    variant: "secondary",
    stretch: "false",
  },
});
