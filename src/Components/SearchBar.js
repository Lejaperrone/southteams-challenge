import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Form,
  FormControl,
  InputGroup,
  Navbar
} from "react-bootstrap";
import "../Styles/SearchBar.css";

const SearchBar = ({ searchString, onChangeString, onChangeOrderBy }) => {
  // Ir order to not have much lines in return method, I manage the different order types in this array.
  const userProps = [
    {
      label: "Name",
      orderKey: "name"
    },
    {
      label: "Email",
      orderKey: "email"
    }
  ];

  return (
    <Navbar>
      <Container>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className="BorderLeftRounded h-100">
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            className="rounded-0"
            placeholder="Search..."
            value={searchString}
            onChange={(e) => onChangeString(e.target.value)}
          />
          <InputGroup.Prepend>
            <InputGroup.Prepend>
              <InputGroup.Text className="rounded-0">Order by</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup.Prepend>
          <Form.Control
            className="BorderRightRounded bg-white"
            as="select"
            custom
            onChange={(e) => onChangeOrderBy(e.target.value)}
          >
            <option value=""> None </option>
            {userProps.map((userProp) => (
              <option key={userProp.orderKey} value={userProp.orderKey}>
                {userProp.label}
              </option>
            ))}
          </Form.Control>
        </InputGroup>
      </Container>
    </Navbar>
  );
};

export default SearchBar;
