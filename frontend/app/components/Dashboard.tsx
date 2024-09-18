export const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2 ">
           <div className="flex justify-center items-center h-32 w-full rounded-lg bg-neutral-800 animate-pulse"> hello World</div>
           <div className="flex justify-center items-center h-32 w-full rounded-lg bg-neutral-800 "> hello World</div>
           <div className="flex justify-center items-center h-32 w-full rounded-lg bg-neutral-800 "> hello World</div>
        </div>
              {/* ------------------------------------------------ */}
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second" + i}
              className="h-full w-full rounded-lg bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};