import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="d-flex justify-content-center pt-5">
      <Spinner animation="border" />
    </Container>
  );
};

export default Loader;
