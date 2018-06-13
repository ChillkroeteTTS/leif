import {mainReducer} from "./reducer";
import createStore from "redux/src/createStore";

export const store = createStore(mainReducer);

store.dispatch({type: "test"});