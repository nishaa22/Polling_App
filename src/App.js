import { Provider, useSelector } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestDashboard from "./components/GuestDashboard";
import ViewPolls from "./components/ViewPolls";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./PrivateRoute";
import AddNewPoll from "./components/AddNewPoll";

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
            </Route>
            <Route path="/viewpolls" element={<ViewPolls />} />
            <Route path="/addnewpoll" element={<AddNewPoll />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
