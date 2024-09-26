import { forwardRef } from "react";
import PropTypes from "prop-types";
import MDAvatarRoot from "../MDAvatar/MDAvatarRoot";

const MDAvatar = forwardRef(
  ({ bgColor = "transparent", size = "md", shadow = "none", ...rest }, ref) => (
    <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
  )
);

// Typechecking props for the MDAvatar
MDAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default MDAvatar;
