import { Card, Container, FormControl, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/UserCard.css";
import { useState } from "react";

const UserCard = ({ user, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userEdit, setUserEdit] = useState(user);

  // Ir order to not have much lines in return method, I manage the different inputs in this array.
  const inputs = [
    {
      id: "email",
      value: userEdit.email,
      type: "text",
      onChange: (value) =>
        setUserEdit({
          ...userEdit,
          email: value
        })
    },
    {
      id: "cell",
      value: userEdit.cell,
      type: "text",
      onChange: (value) =>
        setUserEdit({
          ...userEdit,
          cell: value
        })
    },
    {
      id: "location",
      value: userEdit.location,
      type: "text",
      onChange: (value) =>
        setUserEdit({
          ...userEdit,
          location: value
        })
    }
  ];

  const onCancelEdit = () => {
    setIsEditing(!isEditing);
    setUserEdit(user);
  };

  const onConfirmEdit = () => {
    setIsEditing(false);
    onEdit(user, userEdit);
  };

  return (
    <Card className="shadow border-0">
      <Card.Header className="Header">
        <Card.Title>
          <FontAwesomeIcon
            icon={faUserEdit}
            onClick={onCancelEdit}
            className="Icon position-absolute"
          />
          <Container className="d-flex justify-content-center">
            <FormControl
              className={
                "FormInput text-center text-white border-0 pl-5 " +
                (isEditing ? "border-bottom" : "")
              }
              style={{ resize: "none", overflow: "hidden" }}
              type="text"
              value={userEdit.name}
              onChange={(e) =>
                setUserEdit({
                  ...userEdit,
                  name: e.target.value
                })
              }
              disabled={!isEditing}
            />
          </Container>
        </Card.Title>
        <Container className="d-flex justify-content-center">
          <Image
            className="Image border-white shadow position-absolute border-4 mt-2"
            src={userEdit.image}
            roundedCircle
          />
        </Container>
      </Card.Header>
      <Card.Body className="Body mb-2">
        {inputs.map((i) => (
          <Card.Text key={i.id}>
            <FormControl
              className={
                "FormInput text-center text-secondary border-0 " +
                (isEditing ? "border-bottom" : "")
              }
              type={i.type}
              value={i.value}
              onChange={(e) => i.onChange(e.target.value)}
              disabled={!isEditing}
            />
          </Card.Text>
        ))}
        {isEditing ? (
          <Container className="d-flex justify-content-around">
            <FontAwesomeIcon
              icon={faTimes}
              title="Cancel"
              onClick={onCancelEdit}
            />
            <FontAwesomeIcon
              icon={faCheck}
              title="Save"
              onClick={onConfirmEdit}
            />
          </Container>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default UserCard;
