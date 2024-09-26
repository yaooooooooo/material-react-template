// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material styled-components
import Grid from "@mui/material/Grid";

// Material styled-components
import MDBox from "../../../../styled-components/MDBox";

// Material styled-components
import DefaultNavbar from "../../../../components/Navbars/DefaultNavbar";
import PageLayout from "../../../../components/LayoutContainers/PageLayout";

// Authentication pages styled-components
import Footer from "../../../authentication/components/Footer";

function BasicLayout({ image, children }) {
  return (
    <PageLayout>
      <DefaultNavbar
        action={{
          type: "external",
          route: "",
          label: "free download",
          color: "dark",
        }}
      />
      <MDBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
