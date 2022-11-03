import React from "react";
import "./PopupDesign.css";

const PopupDescription = (data) => {
  // prop data from parent div
  return (
    <>
      <div className="popup1 design">
        <div className="popupform1">
          <div className="row">
            <div className="imge">
              <img src={data.data.image} />
            </div>

            <div className="col-sm-12">
              <div className="inlinement">
                <h5>Hotel Name:- </h5>
                <p>{data.data.HotelName}</p>
              </div>
              <div className="inlinement">
                <h5>Price:- </h5>
                <p>{data.data.Price}</p>
              </div>
              <h4>Description</h4>
              {data.data.data.map((data1, index) => {
                return (
                  <p key={index}>
                    ( {index + 1} ) {data1.description}
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
