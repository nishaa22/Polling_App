import Home from "./components/Home";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Dashboard  from "./components/Dashboard";
import history from "./history";
function App() {
  return (  
    <>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
