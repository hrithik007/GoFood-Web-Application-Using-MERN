import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import MyOrders from "./screens/MyOrders";
function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/createuser" element={<SignUp />}></Route>
            <Route exact path="/orders" element={<MyOrders />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
