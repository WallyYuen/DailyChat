export const moods = {
  default: "happy",
  confused: "confused",
  irritated: "annoyed",
  angry: "angry",
};

export const getMoodColor = (mood) => {
  switch (mood) {
    case moods.confused: return "#FFE699";
    case moods.irritated: return "#7733ff";
    case moods.angry: return "#ff3377";
    default:
      return "lightSeaGreen"
  };
};

export const getMoodKey = (mood) => {
  return Object.keys(moods).find(key => moods[key] === mood) ?? moods.default;
};
