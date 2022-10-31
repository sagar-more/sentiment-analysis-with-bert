import { Chip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  messageRowRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  messageRowLeft: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
  },
  messageBlue: {
    position: "relative",
    marginLeft: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#A8DDFD",
    width: "60%",
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #97C6E3",
    borderRadius: "10px",
    wordWrap: "break-word",
    "&:after": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "15px solid #A8DDFD",
      borderLeft: "15px solid transparent",
      borderRight: "15px solid transparent",
      top: "0",
      left: "-15px",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "17px solid #97C6E3",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      left: "-17px",
    },
  },
  messageOrange: {
    position: "relative",
    marginRight: "20px",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#f8e896",
    width: "60%",
    //height: "50px",
    textAlign: "left",
    font: "400 .9em 'Open Sans', sans-serif",
    border: "1px solid #dfd087",
    borderRadius: "10px",
    wordWrap: "break-word",
    "&:after": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "15px solid #f8e896",
      borderLeft: "15px solid transparent",
      borderRight: "15px solid transparent",
      top: "0",
      right: "-15px",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "0",
      borderTop: "17px solid #dfd087",
      borderLeft: "16px solid transparent",
      borderRight: "16px solid transparent",
      top: "-1px",
      right: "-17px",
    },
  },

  messageContent: {
    padding: 0,
    margin: 0,
  },
  messageTimeStampRight: {
    position: "relative",
    fontSize: ".85em",
    marginTop: "10px",
    float: "right",
  },
  displayName: {
    marginLeft: "20px",
    textAlign: "left",
  },
});

export default function Message(props) {
  const username = useSelector((state) => state.username);
  const side = props.displayName === username ? "right" : "left";
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const displayName = props.displayName ? props.displayName : "";
  const sentiment = props.sentiment ? props.sentiment : "";

  return (
    <>
      {side === "left" ? (
        <div className={classes.messageRow}>
          <div className={classes.messageRowLeft}>
            <div className={classes.displayName}>{displayName}</div>
            <div className={classes.messageBlue}>
              <p className={classes.messageContent}>{message}</p>
              <div className={classes.messageTimeStampRight}>
                {sentiment && (
                  <Chip color="primary" size="small" label={sentiment} />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.messageRowRight}>
          <div className={classes.messageOrange}>
            <p className={classes.messageContent}>{message}</p>
            <div className={classes.messageTimeStampRight}>
              {sentiment && (
                <Chip color="primary" size="small" label={sentiment} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
