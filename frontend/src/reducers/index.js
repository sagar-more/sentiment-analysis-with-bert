import {
  setMessage,
  setPageAsChat,
  setPageAsUser,
  setUserName,
  setSentiment,
} from "../actions";

const initialState = {
  username: "",
  userID: "",
  page: "user",
  messages: [
    {
      message: "Hi",
      displayName: "aviva",
      timestamp: "Mon Oct 24 2022",
    },
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case setUserName:
      return {
        ...state,
        username: action.payload.username,
        userID: action.payload.userID,
      };
    case setPageAsUser:
    case setPageAsChat:
      return {
        ...state,
        page: action.payload,
      };
    case setMessage: {
      const messages = state.messages.slice();
      messages.push(action.payload);
      return {
        ...state,
        messages,
      };
    }
    case setSentiment: {
      const messages = state.messages.map((details) => {
        if (action.payload.id === details.id) {
          details.sentiment = action.payload.sentiment;
        }
        return details;
      });
      return {
        ...state,
        messages,
      };
    }
    default:
      return state;
  }
}
