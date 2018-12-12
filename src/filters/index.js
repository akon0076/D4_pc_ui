exports.formatTime = (date) => {
  if(date != null){
    let formatDate = new Date(date);
    return translateTime(formatDate)
  }else{
    return ""
  }
}

exports.formatDateTime = (date) => {
  if(date != null){
    let formatDateTime = new Date(date);
    let hours = formatDateTime.getHours();
    let minutes = formatDateTime.getMinutes();
    let seconds = formatDateTime.getSeconds();
    let time = translateTime(formatDateTime);
    if(hours < 10){
      time += " 0" + hours + ":";
    }else{
      time += " " + hours + ":";
    }
    if(minutes < 10){
      time += "0" + minutes;
    }else{
      time += minutes ;
    }
    return time;
  }else{
    return ""
  }
}


exports.formatTimeStr = (date) => {
  if(date != null){
    let formatDateTime = new Date(date);
    let hours = formatDateTime.getHours();
    let minutes = formatDateTime.getMinutes();
    let time = "";
    if(hours < 10){
      time += "0" + hours + ":";
    }else{
      time += hours + ":";
    }
    if(minutes < 10){
      time += "0" + minutes;
    }else{
      time += minutes ;
    }
    return time;
  }else{
    return ""
  }
}

function translateTime(formatDate){
  let year = formatDate.getFullYear();
  let month = formatDate.getMonth() + 1;
  let day = formatDate.getDate();
  let time = year + "-";
  if(month < 10){
    time += "0" + month + "-";
  }else{
    time += month + "-";
  }
  if(day < 10){
    time += "0" + day;
  }else{
    time += day;
  }
  return time;
}
