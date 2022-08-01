const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
let alarmTime, isAlarmSet = false;
ringtone = new Audio("alarm_clock.mp3");

//dropdown List Element for Hour, Minute, AM/PM
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}"> ${ampm} </option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//get Hour, Minute, Second & Am/PM
setInterval(() => {
  const time = document.querySelector("h1");
  let dd = new Date();
  let hour = dd.getHours();
  let minute = dd.getMinutes();
  let second = dd.getSeconds();
  let daynight = "AM";
  if (hour > 12) {
    hour = hour - 12;
    daynight = "PM";
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  if (hour == 0) {
    hour = "12";
  }

  time.textContent = hour + " : " + minute + " : " + second + " " + daynight;

  //alarm ringtone
  if (alarmTime == `${hour}:${minute} ${daynight}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

function setAlarm() {
  if (isAlarmSet == true) {
    //if alarmSet is true
    alarmTime = ""; //clear alarmTime
    ringtone.pause(); //pause the ringtone
    content.classList.remove("disable"); //alarm option show
    setAlarmBtn.innerText = "Set Alarm"; //show set alarm
    return (isAlarmSet = false);
  }
  let currentTime = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  //if doesn't set alarm the we get alert msg
  if (
    currentTime.includes("Hour") ||
    currentTime.includes("Minute") ||
    currentTime.includes("AM/PM")
  ) {
    return alert("Please, Select a Valid time to Set Alarm..!");
  }

  isAlarmSet = true;
  alarmTime = currentTime;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";s
}
setAlarmBtn.addEventListener("click", setAlarm);
