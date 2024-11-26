import Container from "@mui/material/Container";

const PageWrapper = ({ children }) => {
  return <Container maxWidth="lg">{children}</Container>;
};

export default PageWrapper;
