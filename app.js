// selecting DOM element
const timeunit = document.querySelectorAll("#timeunit .timer");
const action = document.querySelectorAll("#action .btn");
const main = document.querySelector("main");

// intialize interval
let interval = null;

// boolean variable for keypress events
let pressed = false;
// initialize time properties
let milisecs = 0;
let hrs = 0;
let min = 0;
let secs = 0;

// uptate time function
function timer() {
  //format our time
  milisecs += 10;
  if (milisecs == 1000) {
    milisecs = 0;
    secs++;
  }
  if (secs == 60) {
    secs = 0;
    min++;
  }
  if (min == 60) {
    min = 0;
    hrs++;
  }
  // adding 0 in front of time properties when single digit.
  let h = hrs < 10 ? "0" + hrs : hrs;
  let m = min < 10 ? "0" + min : min;
  let s = secs < 10 ? "0" + secs : secs;
  let ms = milisecs / 10;
  ms = ms < 10 ? "0" + ms : ms;

  //updating time on the webpage
  timeunit[0].innerHTML = h;
  timeunit[1].innerHTML = m;
  timeunit[2].innerHTML = s;
  timeunit[3].innerHTML = ms;
}

// start button function
function start() {
  if (interval) {
    return;
  }
  // adding and removing css style classes
  main.classList.add("button-85");
  main.classList.remove("stop");

  //setting up time interval function
  interval = setInterval(timer, 10);

  pressed = true;
}

// stop button function
function stop() {
  //pausing interval function
  clearInterval(interval);
  interval = null;

  // adding and removing css style classes
  main.classList.remove("button-85");
  main.classList.add("stop");

  pressed = false;
}

// reset button function
function reset() {
  //stopping interval function
  stop();

  // adding and removing css style classes
  main.classList.remove("button-85");
  main.classList.remove("stop");

  //setting time properties to 0
  milisecs = 0;
  hrs = 0;
  min = 0;
  secs = 0;
  timeunit[0].innerHTML = "00";
  timeunit[1].innerHTML = "00";
  timeunit[2].innerHTML = "00";
  timeunit[3].innerHTML = "00";
}

// start button
action[0].onclick = () => {
  start();
};
//stop button
action[1].onclick = () => {
  if (interval != null) {
    stop();
  }
};
// reset button
action[2].onclick = () => {
  reset();
};

// functions and event handlers for keypress events

// space key toogle function
function spaceKeyPressed() {
  pressed ? action[1].click() : action[0].click();
}
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  if (event.code == "Space") {
    spaceKeyPressed();
  }
  console.log(event.code);
});
// r key press for reset eventListner
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  if (event.code == "KeyR") {
    action[2].click();
  }
});
