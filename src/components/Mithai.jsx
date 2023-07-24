import React, { useState, useEffect } from "react";
import CardComp from "./CardComp";

function Mithai(props) {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // localhostURI: http://localhost:5000/api/menu/foodData
  const loadData = async () => {
    let response = await fetch(
      "https://easy-seal-culottes.cyclic.app/api/menu/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();
    console.log(response[0], response[1]);

    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  // console.log(foodCat);

  return (
    <div className="container mt-3">
      {foodCat ? (
        foodCat
          .filter((cat) => cat.CategoryName === "Mithai")
          .map((data) => {
            // console.log(data);
            return (
              <div className="row w-100 mb-3" key={data._id}>
                <div className="fs-3 m-3">
                  {data.CategoryName}{" "}
                  <span
                    style={{
                      color: "grey",
                      fontSize: "14px",
                      borderBottom: "1px solid gray",
                      marginLeft: "1rem",
                    }}
                  >
                    Straight from Halwai
                  </span>
                </div>
                <hr />
                {foodItem ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.Name.toLowerCase().includes(
                          props.search.toLowerCase()
                        )
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-4 d-flex justify-content-around"
                        >
                          <CardComp
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></CardComp>
                        </div>
                      );
                    })
                ) : (
                  <div>No Such Data</div>
                )}
              </div>
            );
          })
      ) : (
        <div>No Such Data</div>
      )}
    </div>
  );
}

export default Mithai;
