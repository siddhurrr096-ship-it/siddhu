
import { useState, useEffect } from "react";

export default function App() {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expense_app"));
    if (data) {
      setGroupName(data.groupName || "");
      setMembers(data.members || []);
      setExpenses(data.expenses || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "expense_app",
      JSON.stringify({ groupName, members, expenses })
    );
  }, [groupName, members, expenses]);

  const addMember = () => {
    if (!memberName || members.includes(memberName)) return;
    setMembers([...members, memberName]);
    setMemberName("");
  };

  const addExpense = () => {
    if (!expenseTitle || !amount || !paidBy) return;
    const perPerson = amount / members.length;

    setExpenses([
      ...expenses,
      { expenseTitle, amount: Number(amount), paidBy, perPerson },
    ]);

    setExpenseTitle("");
    setAmount("");
    setPaidBy("");
  };

  const calculateBalances = () => {
    const balance = {};
    members.forEach((m) => (balance[m] = 0));

    expenses.forEach((e) => {
      members.forEach((m) => {
        if (m === e.paidBy) {
          balance[m] += e.amount - e.perPerson;
        } else {
          balance[m] -= e.perPerson;
        }
      });
    });

    return balance;
  };

  const balances = calculateBalances();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-3xl text-white">
        <h1 className="text-4xl font-bold text-center mb-8 tracking-wide">
          💰 Smart Expense Splitter
        </h1>

        <input
          className="w-full p-3 mb-6 rounded-full bg-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          placeholder="Enter Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <div className="mb-6">
          <h2 className="font-semibold mb-3 text-lg">👥 Members</h2>
          <div className="flex gap-3">
            <input
              className="flex-1 p-3 rounded-full bg-white/30 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              placeholder="Member name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <button
              onClick={addMember}
              className="bg-pink-500 hover:bg-pink-600 px-6 rounded-full transition duration-300 shadow-lg"
            >
              Add
            </button>
          </div>

          <div className="flex gap-3 mt-4 flex-wrap">
            {members.map((m, i) => (
              <span
                key={i}
                className="bg-white/30 px-4 py-1 rounded-full backdrop-blur-md"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {members.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold mb-3 text-lg">🧾 Add Expense</h2>

            <input
              className="w-full p-3 rounded-full bg-white/30 mb-3 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              placeholder="Expense title"
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
            />

            <input
              type="number"
              className="w-full p-3 rounded-full bg-white/30 mb-3 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              className="w-full p-3 rounded-full bg-white/30 mb-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
            >
              <option value="" className="text-black">Paid By</option>
              {members.map((m, i) => (
                <option key={i} value={m} className="text-black">
                  {m}
                </option>
              ))}
            </select>

            <button
              onClick={addExpense}
              className="w-full bg-green-400 hover:bg-green-500 py-3 rounded-full transition duration-300 shadow-lg text-black font-semibold"
            >
              ➕ Add Expense
            </button>
          </div>
        )}

        {expenses.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold mb-3 text-lg">📋 Expenses</h2>
            {expenses.map((e, i) => (
              <div
                key={i}
                className="bg-white/20 p-3 rounded-xl mb-3 flex justify-between items-center backdrop-blur-md"
              >
                <span>
                  {e.expenseTitle} (₹{e.amount})
                </span>
                <span className="text-sm opacity-80">
                  Paid by {e.paidBy}
                </span>
              </div>
            ))}
          </div>
        )}

        {members.length > 0 && (
          <div>
            <h2 className="font-semibold mb-3 text-lg">📊 Balance Summary</h2>
            {Object.keys(balances).map((m, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-white/30"
              >
                <span>{m}</span>
                <span
                  className={
                    balances[m] >= 0
                      ? "text-green-300 font-semibold"
                      : "text-red-300 font-semibold"
                  }
                >
                  ₹{balances[m].toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
