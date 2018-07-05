export const prettyDate = date =>
  `${new Date(date).toLocaleString(
    "en-us",
    { month: "long" }
  )} ${new Date(date).getUTCDate()}, ${new Date(date).getFullYear()}`;
