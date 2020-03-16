function DateFormatter(date) {
  let year = date._i[0];
  let month = date._i[1];
  let day = date._i[2];
  let hour = date._i[3];
  let min = date._i[4];
  let sec = date._i[5];

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

export default DateFormatter;
