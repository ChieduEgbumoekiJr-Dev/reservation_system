import React from "react";

const Loading = () => {
  return (
    <main>
      <div className="flex justify-center">
        <div className="p-3 w-full mt-10 flex  justify-center">
          <div className="animate-pulse bg-slate-200 w-full h-96 m-3 rounded overflow-hidden border cursor-pointer"></div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
