import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import _ from "lodash";
import Loader from "./Components/Loader";
import SearchBar from "./Components/SearchBar";
import UserCard from "./Components/UserCard";
import { getUsers } from "./API/users";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [userList, setUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);

  // First render I get the data from the API
  useEffect(() => {
    const getAndSetUsers = async (quantity) => {
      setIsLoading(true);
      const users = await getUsers(quantity);
      setUserList(users);
      setIsLoading(false);
    };

    getAndSetUsers(50);
  }, []);

  // Whenever the state of userList, orderBy and searchString changes I apply the filters to the userList.
  useEffect(() => {
    const applyFilters = () => {
      let sortedAndFilteredList = userList.filter(
        (user) =>
          user.name.toLowerCase().includes(searchString.toLowerCase()) ||
          user.cell.toLowerCase().includes(searchString.toLowerCase()) ||
          user.email.toLowerCase().includes(searchString.toLowerCase()) ||
          user.location.toLowerCase().includes(searchString.toLowerCase())
      );

      if (orderBy) {
        sortedAndFilteredList = _.orderBy(
          sortedAndFilteredList,
          [(user) => user[orderBy].toLowerCase()],
          ["asc"]
        );
      }
      setFilteredUserList(sortedAndFilteredList);
    };

    applyFilters();
  }, [userList, orderBy, searchString]);

  // As the state of an object is unmutable, I create a copy, modify and then set the userList with that.
  const onEditUser = (userToEdit, newUser) => {
    const userListCopy = [...userList];
    const index = userListCopy.indexOf(userToEdit);
    userListCopy[index] = newUser;
    setUserList(userListCopy);
  };

  return (
    <Container>
      <SearchBar
        searchString={searchString}
        onChangeString={setSearchString}
        onChangeOrderBy={setOrderBy}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          {filteredUserList.length > 0 ? (
            filteredUserList.map((user) => (
              <Col
                key={user.email}
                className="mb-4 pt-4 col-12 col-sm-6 col-lg-3"
              >
                <UserCard key={user.email} user={user} onEdit={onEditUser} />
              </Col>
            ))
          ) : (
            <Container className="d-flex justify-content-center pt-5">
              No data was found
            </Container>
          )}
        </Row>
      )}
    </Container>
  );
};

export default App;
