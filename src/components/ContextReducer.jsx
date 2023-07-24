import React, { useContext, useReducer, createContext } from "react";

// global state
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "ADDCAKEORPASTRY":
      return [
        ...state,
        {
          id: action.id,
          cakeName: action.cakeName,
          pastryName: action.pastryName,
          cakeImg: action.cakeImg,
          pastryImg: action.pastryImg,
          qty: action.qty,
          size: action.size,
          price: action.price,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;

    case "DROP":
      let empArray = [];
      return empArray;

    // case "UPDATE":
    //   let arr = [...state];
    //   arr.find((food, index) => {
    //     console.log(food.id, action.id);
    //     if (food.id === action.id) {
    //       console.log(
    //         food.qty,
    //         parseInt(action.qty),
    //         action.price + food.price
    //       );
    //       arr[index] = {
    //         ...food,
    //         qty: parseInt(action.qty) + parseInt(food.qty),
    //         price: action.price + food.price,
    //       };
    //     }
    //   });
    //   return arr;

    default:
      console.log("Error in Reducer");
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
