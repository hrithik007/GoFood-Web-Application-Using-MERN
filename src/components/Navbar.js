import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setCardData } from "./CardSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [totalQuantity, setTotalQuantity] = useState(0);

  // Get cart items from Redux state
  const cartItems = useSelector((state) => state.card.cartItems);

  // Calculate total quantity whenever cart items change
  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity;
    });
    setTotalQuantity(total);
  }, [cartItems]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(setCardData([]));
    alert("Logged out");
    Navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" aria-current="page">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.getItem("authToken") ? (
            <div className="d-flex align-items-center">
              <Link
                className="btn btn-outline-primary nav-link mx-2 mt-2 position-relative my-orders-link"
                to="/orders"
              >
                <span className="me-1">My Orders</span>
                {totalQuantity > 0 && (
                  <span className="badge bg-secondary position-absolute top-0 start-100 translate-middle">
                    {totalQuantity}
                  </span>
                )}
              </Link>
              <button
                className="btn btn-outline-danger mx-1"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="btn btn-outline-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-success mx-1" to="/createuser">
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
