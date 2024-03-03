import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { setCardData } from "../components/CardSlice";

export default function Home() {
  const cardData = useSelector((state) => state.card.cardData);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foodData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          dispatch(setCardData(data)); // Dispatch action to set card data
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 text-dark"
                type="search"
                placeholder="Type in..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Placeholder images for the carousel */}
          {[1, 2, 3].map((index) => (
            <div className={`carousel-item${index === 1 ? " active" : ""}`} key={index}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOdNaw2PAv8M3L-kohnAHFse2cz5UEy3_W3v0GyUhw-A&s"
                className="d-block w-100"
                style={{height:"220px", filter: "brightness(40%)" }}
                alt={`Slide ${index}`}
              />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        <div className="row">
          {cardData &&
            cardData[0] &&
            cardData[0].length === 0 && <div className="col">No items found</div>}
          {cardData &&
            cardData[0] &&
            cardData[0]
              .filter((item) => item.name.toLowerCase().includes(search.toLocaleLowerCase()))
              .map((item) => (
                <div className="col-md-4 mb-3 mt-5" key={item._id}>
                  <Card name={item.name} img={item.img} price={item.price} />
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
