import { useDispatch } from "react-redux";
import { Button, Container, TextField } from "@mui/material";
import { setPageAsChat, setUserName } from "../actions";
import "../css/User.css";
import { useState, useId } from "react";

export default function User() {
  const [name, setName] = useState("");
  const id = useId();
  const dispatch = useDispatch();
  const onChange = ({ target }) => {
    setName(target.value.trim());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch({
        type: setUserName,
        payload: { username: name.trim(), userID: id },
      });
      dispatch({ type: setPageAsChat, payload: "chat" });
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <TextField
          id="standard-basic"
          label="enter name"
          variant="outlined"
          value={name}
          onChange={onChange}
        />
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}
