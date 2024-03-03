import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteData, selectCartItems } from '../components/CardSlice';
import { updateQuantity } from "../components/CardSlice";

export default function MyOrders() {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  // Function to handle quantity change
  const handleQuantityChange = (name, quantity) => {
    dispatch(updateQuantity({ name, quantity: quantity }));
  };

const handleDelete = (name)=>{
   dispatch(deleteData({name}));
}

  return (
    <div className="container mt-4">
      <div className='d-flex'>
      <h2 className="mb-4">My Orders</h2>
      <div className='mx-2'><Link className='btn btn-primary' to={"/"}>Go back</Link></div>
      </div>
      {cartItems.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price per Item</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <div>
                      <img src={item.img} className="img-fluid me-3" alt="Food" style={{ maxWidth: "100px" }} />
                    </div>
                    <div>
                      <h5>{item.name}</h5>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => handleQuantityChange(item.name, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-outline-primary btn-sm ms-2"
                      onClick={() => handleQuantityChange(item.name, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button className='btn btn-danger mx-2' onClick={()=>{handleDelete(item.name)}}>D</button>
                  </div>
                </td>
                <td>${item.price}</td>
                <td>${item.quantity * item.price}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end">Total:</td>
              <td>${totalPrice}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
