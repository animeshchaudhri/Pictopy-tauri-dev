import React from "react";

function Album() {
  return (
    <>
      <div className="dark:bg-background dark:text-foreground max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </div>
    </>
  );
}

export default Album;
