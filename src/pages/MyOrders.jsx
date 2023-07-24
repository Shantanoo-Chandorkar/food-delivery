import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});
  const navigate = useNavigate();

  // localhostURI: http://localhost:5000/api/user/loginuser

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/orders/singleOrderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });

    // await res.map((data)=>{
    //    console.log(data)
    // })
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <button
        className="btn"
        onClick={handleBack}
        style={{ top: 0, left: 0, marginTop: "1rem", marginLeft: "1rem" }}
      >
        Home
      </button>

      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {orderData !== {}
          ? Array(orderData).map((data) => {
              return data.orderData
                ? data.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((item) => {
                      return item.map((arrayData) => {
                        return (
                          <div
                            key={arrayData.id}
                            className="card-container"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                            }}
                          >
                            {arrayData.Order_date ? (
                              <div className="mt-5">
                                {(data = arrayData.Order_date)}
                                <hr />
                              </div>
                            ) : (
                              <div
                                className="cards-cantainer"
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div
                                  className="card mt-3"
                                  style={{
                                    width: "15rem",
                                    maxHeight: "500px",
                                    borderRadius: "20px",
                                  }}
                                >
                                  {arrayData.size === "cake" ? (
                                    <img
                                      src={arrayData.cakeImg}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
                                  ) : arrayData.size === "pastry" ? (
                                    <img
                                      src={arrayData.pastryImg}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={arrayData.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
                                  )}

                                  <div className="card-body">
                                    {arrayData.size === "cake" ? (
                                      <h5
                                        className="card-title"
                                        style={{ overflowY: "hidden" }}
                                      >
                                        {arrayData.cakeName}
                                      </h5>
                                    ) : arrayData.size === "pastry" ? (
                                      <h5
                                        className="card-title"
                                        style={{ overflowY: "hidden" }}
                                      >
                                        {arrayData.pastryName}
                                      </h5>
                                    ) : (
                                      <h5
                                        className="card-title"
                                        style={{ overflowY: "hidden" }}
                                      >
                                        {arrayData.name}
                                      </h5>
                                    )}
                                    <div className="container w-100 p-0">
                                      <div className="d-flex flex-start">
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                      </div>
                                      <div className="d-flex flex-start">
                                        <span>{data}</span>
                                        <br />
                                        <div className=" d-inline ms-2 fs-6">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      });
                    })
                : "No Orders :(. Please place your first Order";
            })
          : "No Orders :(. Please place your first Order"}
      </div>

      <Footer />
    </div>
  );
}
