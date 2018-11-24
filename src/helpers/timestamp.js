const currentTime = () => {
  const dt = new Date();
  const utcDate = dt.toLocaleString();
  return utcDate;
};

export default { currentTime };
