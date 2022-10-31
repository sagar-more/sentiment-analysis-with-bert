import { AppBar, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import "./App.css";
import ChatContainer from "./components/ChatContainer";
import User from "./components/User";

function App() {
  const page = useSelector((state) => state.page);
  return (
    <div className="App">
      <div className="outerContainer">
        <div className="container">
          <AppBar>
            <Toolbar>
              <h1>Chat App </h1>
            </Toolbar>
          </AppBar>
          {page === "user" ? <User /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
}

export default App;
