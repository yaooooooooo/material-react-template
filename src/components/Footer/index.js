import MDBox from "../../styled-components/MDBox";
import typography from "../../assets/theme/base/typography";

function Footer() {
  const { size } = typography;
  return (
    <MDBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, footer detail
      </MDBox>
    </MDBox>
  );
}

export default Footer;
