import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import InputBar from "./InputBar";
import Message from "./Message";

const useStyles = makeStyles({
  paper: {
    width: "80vw",
    height: "80vh",
    maxWidth: "500px",
    maxHeight: "700px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  paper2: {
    width: "80vw",
    maxWidth: "500px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "85px",
  },
  messagesBody: {
    width: "calc( 100% - 20px )",
    margin: 10,
    overflowY: "scroll",
    height: "calc( 100% - 80px )",
  },
});

export default function ChatContainer() {
  const classes = useStyles();
  const messages = useSelector((state) => state.messages);
  const messagesEndRef = createRef();
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Paper id="style-1" className={classes.messagesBody}>
          {messages.map((details, index) => (
            <Message key={index} {...details} />
          ))}
          <div ref={messagesEndRef} />
        </Paper>
        <InputBar />
      </Paper>
    </div>
  );
}
