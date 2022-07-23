import { createStore, applyMiddleware, compose} from "redux";
import rootreducer from "./reducers/rootreducer";
import createSagaMiddleware from "redux-saga";
import rootsaga from "./saga/rootsaga"

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootreducer,composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootsaga);

export default store;