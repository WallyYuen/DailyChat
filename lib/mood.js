export const moods = {
  default: "normal",
  happy: "happy",
  angry: "angry",
  indifferent: "indifferent",
};

export const getMoodColor = (mood) => {
  switch (mood) {
    case moods.happy: return "#33ff77";
    case moods.angry: return "#ff3377";
    case moods.indifferent: return "#7733ff";
    default:
      return "lightseagreen"
  };
};
