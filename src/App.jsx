import React, { useState } from "react";
import CartBox from "./components/CartBox";
import { ClipLoader } from "react-spinners";

const App = () => {
  const [transaction, setTransaction] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(50000);
  const [income, setIncome] = useState(60000);
  const [expenses, setExpenses] = useState(0);
  const [loading, setLoading] = useState(false);

  console.log(transaction);

  const handleTransaction = (type) => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || (type === "Expense" && amt > balance)) return;
    setLoading(true);
    setTimeout(() => {
      const amountHistory = { title, amount: amt, type };

      setTransaction([...transaction, amountHistory]);
      setTitle("");
      setAmount("");
      setLoading(false);
      if (type === "Income") {
        setBalance(balance + amt);
        setIncome(income + amt);
      } else {
        setBalance(balance - amt);
        setExpenses(expenses + amt);
      }
    }, 2000);
  };
  return (
    <div>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-30">
          <ClipLoader size={50} color="blue" />
        </div>
      )}
      <div className={`${loading && "  opacity-20 "}`}>
        <div className="md:w-[70%] mx-5  ">
          <h1 className="text-2xl font-bold font-sans px-5 py-3">
            Hello, Users
          </h1>
          <h1 className="text-md md:text-lg text-gray-700 font-mono px-5">
            Welcome back to money manager
          </h1>
          <div className="flex flex-col md:mt-3 justify-center items-center md:flex md:flex-row md:space-x-4 ">
            <CartBox
              title="Your Balance"
              amount={balance}
              color=" border-l-[5px] my-2 md:my-0 w-full text-green-600 font-bold font-mono  border-green-600 md:w-[100%] shadow shadow-md shadow-green-100 rounded-[15px] p-[20px] "
            />
            <CartBox
              title="Your Income"
              amount={income}
              color=" border-l-[5px] w-full my-2 md:my-0  text-blue-600 font-bold font-mono border-blue-600 md:w-[100%] shadow shadow-md shadow-blue-100 rounded-[15px] p-[20px] "
            />
            <CartBox
              title="Your Expenses"
              amount={expenses}
              color=" border-l-[5px] w-full my-2 md:my-0 text-purple-600 font-mono font-bold border-purple-600 md:w-[100%] shadow shadow-md shadow-purple-100 rounded-[15px] p-[20px] "
            />
          </div>

          <div className="md:flex ">
            <div className="md:w-[70%] w-full">
              <h1 className="my-2 font-semibold italic text-purple-500  md:text-xl   ">
                Add Transaction
              </h1>
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="my-2 py-2 focus:outline-none pl-2 font-mono border border-blue-200 w-full rounded "
              />
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="my-2 py-2 focus:outline-none pl-2 font-mono border border-blue-200 w-full rounded "
              />
              <button
                onClick={() => handleTransaction("Income")}
                className="w-full md:w-1/3 bg-blue-400 py-2 md:mx-2  rounded-full my-2 md:px-2 text-white font-semibold md:rounded-md text-[13px] hover:bg-blue-500"
              >
                Add income
              </button>
              <button
                onClick={() => handleTransaction("Expenses")}
                className="w-full md:w-1/3 bg-red-500 md:mx-2 md:px-2 py-2 rounded-full my-2 text-white font-semibold md:rounded-md text-[13px] hover:bg-red-600"
              >
                Add Expense
              </button>
            </div>
            <div className="w-full md:mx-20">
              {transaction.length > 0 && (
                <div>
                  <h1 className="my-2 font-semibold font-mono">History</h1>
                  <ul className="border border-neutral-400 border-opacity-30 rounded-md p-5">
                    {transaction.map((t, index) => (
                      <li
                        key={index}
                        className=" py-3 flex justify-between items-center border-b border-opacity-50 border-neutral-300 "
                      >
                        <span>{t.title}</span>
                        <span>{t.amount}</span>
                        <span
                          className={`${
                            t.type === "Income"
                              ? "text-green-600"
                              : "text-red-700"
                          }`}
                        >
                          {t.type}
                        </span>
                      </li>
                    ))}
                    <h1 className="text-center mt-5 text-slate-500">End....</h1>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
