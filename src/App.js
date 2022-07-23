import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ViewPolls from "./components/ViewPolls"
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/viewpolls" element={<ViewPolls />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
