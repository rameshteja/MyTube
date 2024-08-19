export const API_KEY = 'AIzaSyBkIMa-rIAFRYZa0yI1nk1Wcxf1-D0ZI8Y';
//AIzaSyBIOydVqL3-NdQXLXQ0RCNphJ8yzABLSXs'
export const value_converter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value/1000000)+"M";
  } else if (value >= 1000) {
    return Math.floor(value/1000)+"K";
  } else {
    return value;
  }
}