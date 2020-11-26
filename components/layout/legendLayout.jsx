import React from "react";
import { moods, getMoodColor } from "lib/mood";

import layout from "components/layout/legendLayout.module.scss";

const LegendLayout = () => {
  console.log("foo");
  return (
    <div className={layout.container}>
      <div className={layout.header}>Legend</div>
      {Object.values(moods).map((mood) => (
        <div key={mood} className={layout.row}>
          <div className={layout.dot} style={{ background: getMoodColor(mood) }} />
          <span className={layout.mood}>{mood}</span>
        </div>
      ))}
    </div>
  );
};

export default LegendLayout;