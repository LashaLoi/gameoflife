"use client";

import { useGame } from "./useGame";

export default function Home() {
  const { board, onCellClick, isStopped, setIsStopped } = useGame();

  return (
    <main className="h-screen">
      <button onClick={() => setIsStopped((state) => !state)}>
        {isStopped ? "Start" : "Stop"}
      </button>
      <div className="flex flex-col items-center mt-10">
        {board.map((row, y) => (
          <div key={y} className="flex h-[40px] w-[800px]">
            {row.map((col, x) => {
              const cellType = col === 0 ? "bg-none" : "bg-yellow-100";

              return (
                <div
                  onClick={() =>
                    onCellClick({
                      cellType: col,
                      coordinates: [x, y],
                    })
                  }
                  key={x}
                  className={`border-2 h-[40px] w-[40px] ${cellType}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}
