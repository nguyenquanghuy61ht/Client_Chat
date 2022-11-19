import userReducer from "../Features/auth/component/userSlice";
import messReducer from "../Features/Messages/messSlice";

const { configureStore } = require("@reduxjs/toolkit");
const rootReducer = {
  user: userReducer,
  mess: messReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
