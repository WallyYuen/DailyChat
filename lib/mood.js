export const moods = {
  default: "normal",
  happy: "happy",
  angry: "angry",
  indifferent: "indifferent",
};

export const getMoodColor = (mood) => {
  switch(mood) {
    case moods.happy: return "#64D186";
    case moods.angry: return "#F56476";
    case moods.indifferent: return "#FDFAE3";
    default:
      return "#5D5D5D"
  };
};
