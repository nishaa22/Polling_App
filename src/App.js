import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ViewPolls from "./components/ViewPolls"
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/viewpolls" element={<ViewPolls />} />
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
