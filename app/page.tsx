"use client";

import { motion } from "framer-motion";

import { useGame } from "../game/useGame";
import { useState } from "react";

export default function Home() {
  const [cols, setCols] = useState(20);
  const [rows, setRows] = useState(10);

  const [{ board, isStopped, time }, handlers] = useGame(cols, rows);

  return (
    <main className="h-screen">
      <div className="text-5xl font-extrabold text-center mt-20 text-red-500">
        GAME OF LIFE
      </div>
      <div className="flex gap-4 justify-center items-center my-10">
        <div className="w-[40px] flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-red-500 transition-all"
            onClick={() => handlers.setIsStopped((state) => !state)}
          >
            {isStopped ? "START" : "STOP"}
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hover:text-red-500 transition-all disabled:text-gray-400"
          onClick={handlers.reset}
          disabled={!isStopped}
        >
          RESET
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hover:text-red-500 transition-all disabled:text-gray-400"
          onClick={handlers.generateRandomBoard}
          disabled={!isStopped}
        >
          RANDOM
        </motion.button>

        <div className="flex gap-2">
          <input
            className="text-red-400 transition-all"
            value={time}
            onChange={({ target }) => {
              handlers.setTime(target.valueAsNumber);
            }}
            type="range"
            min={1}
            max={2000}
            disabled={!isStopped}
          />
          <div className="w-[40px] flex items-center justify-center">
            {time}
          </div>
        </div>
        <label className="flex gap-1 items-center">
          C
          <input
            type="number"
            value={cols}
            onChange={(event) => setCols(event.target.valueAsNumber)}
            className="w-[50px] border-2 border-red-400 rounded-lg px-1 disabled:border-gray-400"
            disabled={!isStopped}
          />
        </label>
        <label className="flex gap-1 items-center">
          R
          <input
            type="number"
            value={rows}
            onChange={(event) => setRows(event.target.valueAsNumber)}
            className="w-[50px] border-2 border-red-400 rounded-lg px-1 disabled:border-gray-400"
            disabled={!isStopped}
          />
        </label>
      </div>

      <div className="flex flex-col items-center">
        {board.map((row, y) => (
          <div key={y} className="flex">
            {row.map((col, x) => (
              <motion.div
                onClick={() =>
                  handlers.onCellClick({
                    cellType: col,
                    coordinates: [x, y],
                  })
                }
                key={x}
                className={`h-[40px] w-[40px] ${
                  col === 0 ? "bg-none" : "bg-red-400"
                } ${isStopped ? "border-2" : ""}`}
                animate={col === 0 ? { scale: 0.9 } : undefined}
                transition={{
                  duration: time / 1000,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
