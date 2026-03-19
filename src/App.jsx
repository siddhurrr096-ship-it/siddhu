import { useState } from 'react';
import './App.css';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome to Siddhu!</h1>
        <p className="text-xl text-gray-300 mb-8">Your React + Vite + Tailwind CSS site</p>
        <button onClick={() => setCount(count + 1)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition">
          Count: {count}
        </button>
        <p className="text-gray-400 mt-8">GitHub Pages is now working! 🎉</p>
      </div>
    </div>
  );
}