function DateConverter(date) {
    let today = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
  
    if (month < 10) {
      month = `0` + month;
    }
    if (day < 10) {
      day = `0` + day;
    }
  
    let finalDate =
    year + "-" + month + "-" + day + "T" + hour + ":" + min + ":" + sec + "Z";
    return finalDate;
  }
  
  export default DateConverter;
  