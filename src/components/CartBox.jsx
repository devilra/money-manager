import React from "react";

const CartBox = ({ title, amount, color }) => {
  return (
    <div className={color}>
      <h1 className="text-slate-500">{title}</h1>
      <p className="text-orange-600 text-[15px]">Rs.{amount}</p>
    </div>
  );
};

export default CartBox;
