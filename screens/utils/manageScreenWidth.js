const screenWidth = (width, screenSize, bigValue, smallValue) => {
  if (width > screenSize) {
    return bigValue;
  }
  return smallValue;
  // const bigScreenValue = width > 375 ? 30 : 25;
};

export default screenWidth;
