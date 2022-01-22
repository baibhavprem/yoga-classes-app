const getDate = (offset = 0) => {
  let today = new Date();
  let newDate = new Date(today.setMonth(today.getMonth() + offset));
  
  return newDate;
}

// console.log(getDate());

module.exports = {
  getDate
};