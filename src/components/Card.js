import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "./CardSlice";

export default function Card({ name, img, price }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = async () => {
    await dispatch(addToCart({ name, img, price }));
    dispatch(updateQuantity({ name, quantity: quantity }));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="card mb-3">
      <img
        src={img}
        className="card-img-top img-fluid"
        alt="Food"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: ${price}</p>
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <input
            type="text"
            className="form-control text-center"
            value={quantity}
            readOnly
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-success w-100"
          onClick={handleAddToCart}
          disabled={quantity === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
