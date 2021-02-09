const dateElement = document.querySelector(".date"),
  time = document.querySelector(".time");

const toDoubleDigit = (num) =>
  num.toLocaleString("en-US", { minimumIntegerDigits: 2 });

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  time.innerHTML = `${toDoubleDigit(hours)}: ${toDoubleDigit(
    minutes
  )}: ${toDoubleDigit(seconds)}`;
}

function getDate() {
  const date = new Date();
  const options = { weekday: "long", month: "short", day: "numeric" };
  dateElement.innerHTML = date.toLocaleDateString("en-US", options);
}
function init() {
  getTime();
  setInterval(getTime, 1000);
  getDate();
}

init();
