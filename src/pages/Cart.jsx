import React from "react";
import { PiTrashSimpleLight } from "react-icons/pi";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orders/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    // console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div className="container">
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Options</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  {food.size === "cake" ? (
                    <td>{food.cakeName}</td>
                  ) : food.size === "pastry" ? (
                    <td>{food.pastryName}</td>
                  ) : (
                    <td>{food.name}</td>
                  )}
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button
                      type="button"
                      className="p-0"
                      style={{
                        background: "none",
                        border: "none",
                      }}
                    >
                      <PiTrashSimpleLight
                        style={{
                          backgroundColor: "#720E07",
                          color: "#f7e0d2",
                          padding: "5px",
                          fontSize: "2rem",
                          borderRadius: "0.5rem",
                        }}
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price : {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn mt-3 mb-5" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
