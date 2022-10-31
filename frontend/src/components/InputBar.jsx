import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { setMessage, setSentiment } from "../actions";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles(() =>
  createStyles({
    wrapForm: {
      display: "flex",
      justifyContent: "center",
      width: "95%",
    },
    wrapText: {
      width: "100%",
    },
  })
);

export default function InputBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const username = useSelector((state) => state.username);
  const onSubmit = (e) => {
    e.preventDefault();
    if (msg.trim()) {
      const id = uuidv4();
      dispatch({
        type: setMessage,
        payload: {
          id,
          message: msg,
          displayName: username,
          timestamp: new Date().toISOString(),
        },
      });
      fetchSentiment(id, msg);
      setMsg("");
    }
  };

  const fetchSentiment = (id, msg) => {
    fetch("/data", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence: msg }),
    })
      .then((req) => req.json())
      .then((data) => {
        const sentiment = data ? (data[0] ? data[0][0] : "") : "";
        console.log(msg, data);
        dispatch({
          type: setSentiment,
          payload: {
            id,
            sentiment,
          },
        });
      });
  };

  return (
    <>
      <form
        className={classes.wrapForm}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="standard-text"
          label="enter message"
          className={classes.wrapText}
          value={msg}
          onChange={({ target }) => setMsg(target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          <SendIcon />
        </Button>
      </form>
    </>
  );
}
