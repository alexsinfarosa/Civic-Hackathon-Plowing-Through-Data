import type { LineLayer } from "react-map-gl";
// import colors from "tailwindcss/colors";

const case1 = ["==", ["get", "value"], "M"];
const case2 = [
  "all",
  [">=", ["get", "value"], 0],
  ["<=", ["get", "value"], 12],
];
const case3 = [
  "all",
  [">=", ["get", "value"], 13],
  ["<=", ["get", "value"], 24],
];
const case4 = [">", ["get", "value"], 24];

export const dataLayer: LineLayer = {
  id: "data",
  type: "line",
  paint: {
    "line-color": [
      "case",
      case1,
      // colors.slate[300],
      "#cbd5e1",
      case2,
      // colors.green[500],
      "#22c55e",
      case3,
      // colors.amber[500],
      "#f59e0b",
      case4,
      // colors.red[500],
      "#ef4444",
      // colors.white,
      "#ffffff",
    ],
    "line-width": 1.2,
    "line-opacity": 1,
  },
};
