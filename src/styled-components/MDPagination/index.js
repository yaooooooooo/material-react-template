import { forwardRef, createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import MDBox from "../MDBox";
import MDPaginationItemRoot from "../MDPagination/MDPaginationItemRoot";

const Context = createContext();

const MDPagination = forwardRef(
  (
    {
      item = false,
      variant = "gradient",
      color = "info",
      size = "medium",
      active = false,
      children,
      ...rest
    },
    ref
  ) => {
    const context = useContext(Context);
    const paginationSize = context ? context.size : null;

    const value = useMemo(() => ({ variant, color, size }), [variant, color, size]);

    return (
      <Context.Provider value={value}>
        {item ? (
          <MDPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}
          >
            {children}
          </MDPaginationItemRoot>
        ) : (
          <MDBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}
          >
            {children}
          </MDBox>
        )}
      </Context.Provider>
    );
  }
);

// Typechecking props for the MDPagination
MDPagination.propTypes = {
  item: PropTypes.bool,
  variant: PropTypes.oneOf(["gradient", "contained"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDPagination;
