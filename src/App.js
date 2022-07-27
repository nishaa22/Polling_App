import { Provider, useSelector } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestDashboard from "./components/GuestDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./PrivateRoute";
import AddNewPoll from "./components/AddNewPoll";
import AdminDashboard from "./components/AdminDashboard";
import ListUsers from "./components/ListUsers";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route exact path="/guest" element={<GuestDashboard />} />
              <Route exact path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/addnewpoll" element={<AddNewPoll />} />
            <Route path="/userlist" element={<ListUsers />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
