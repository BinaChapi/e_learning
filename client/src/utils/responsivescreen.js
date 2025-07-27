// responsiveUtils.js
const wp = (percentage) => {
    // Get the current window width
    const width = window.innerWidth;
    return (percentage * width) / 100;
  };
  
  const hp = (percentage) => {
    // Get the current window height
    const height = window.innerHeight;
    return (percentage * height) / 100;
  };
  
  export { wp, hp };
  