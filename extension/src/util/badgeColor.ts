export const badgeColor = (amt: number) => {
  //yes yes i know
  if (amt >= 6) {
    return "#ef4444";
  } else if (amt >= 5) {
    return "#f97316";
  } else if (amt >= 4) {
    return "#f59e0b";
  } else if (amt >= 3) {
    return "#eab308";
  } else if (amt >= 2) {
    return "#84cc16";
  } else {
    return "#22c55e";
  }
};
