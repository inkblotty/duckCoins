function padTime(num) {
  if (num.toString().length < 2) {
    num = "0" + num.toString();
  }
  return num;
}

exports.dateTimeFormat = function(dateObj) {
  return `${dateObj.getFullYear()}-${padTime(dateObj.getMonth()+1)}-${padTime(dateObj.getDate())} ${padTime(dateObj.getHours())}:${padTime(dateObj.getMinutes())}:${padTime(dateObj.getSeconds())}`;
}

exports.dateFormatHuman = function(dateObj) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()} at ${dateObj.getHours()}:${padTime(dateObj.getSeconds())}`;
}