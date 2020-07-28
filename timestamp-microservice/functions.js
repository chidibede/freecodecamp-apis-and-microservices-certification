module.exports = function getUtcDate(dateObj) {
    let month_array = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let day_array = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
    let year = dateObj.getFullYear();
    let month = month_array[dateObj.getMonth()];
    let day = day_array[dateObj.getDay()];
    let hours = dateObj.getHours();
    let mins = dateObj.getMinutes();
    let seconds = dateObj.getSeconds();
    let date = dateObj.getDate();
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    let utc = `${day}, ${date} ${month} ${year} ${hours}:${mins}:${seconds} ${timeZone}`;
    return utc;
  };
  
 