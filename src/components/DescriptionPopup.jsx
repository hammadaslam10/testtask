import React from "react";
import "./PopupDesign.css";

const PopupDescription = (data) => {
  return (
    <>
      <div className="popup1 design">
        <div className="popupform1">
          <div className="row">
            <div className="imge">
              <img src={data.data.image} />
            </div>

            <div className="col-sm-12">
              <h1>HotelName</h1>
              <h3>{data.data.HotelName}</h3>
              <h1>Price</h1>
              <h3>{data.data.Price}</h3>
              <h1>Description</h1>
              {data.data.data.map((data1, index) => {
                return (
                  <p key={index}>
                    (     {index + 1}   )  {data1.description}
                  </p>
                );
              })}
            </div>
            <a
              href={data.data.BookNowURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="ctm-booknow">Book Now</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupDescription;
