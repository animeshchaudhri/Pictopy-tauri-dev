import React from "react";
import { lineWobble } from "ldrs";

lineWobble.register();

// Default values shown

export const LoadingScreen: React.FC = () => (
  <div>
    <l-line-wobble
      size="80"
      stroke="5"
      bg-opacity="0.1"
      speed="1.75"
      color="black"
    ></l-line-wobble>
  </div>
);
