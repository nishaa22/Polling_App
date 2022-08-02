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
import EditPoll from "./components/EditPoll";
import Profile from "./components/Profile";
import ListPoll from "./components/ListPoll";
import AddNewPollOption from "./components/AddNewPollOption";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path="/guest" element={<GuestDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/addnewpoll" element={<AddNewPoll />} />
              <Route path="/userlist" element={<ListUsers />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editpoll/:_id" element={<EditPoll />} />
              <Route path="/listpoll/:_id" element={<ListPoll />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
