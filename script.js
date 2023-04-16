// Stop watch with Record

// Const Variables
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const miliSecond = document.getElementById("miliSecond");

const startWatch = document.getElementById("startWatch");
const pauseWatch = document.getElementById("pauseWatch");
const resetWatch = document.getElementById("resetWatch");
const recordTime = document.getElementById("recordTime");

const recordContainer = document.querySelector(".recordContainer");

// Script Help Variabls
let miliSecondsCount = 0;
let secondsCount = 0;
let minutesCount = 0;
let hoursCount = 0;
let timeInterval;

// Start the Timer
startWatch.addEventListener("click", () => {
    startWatch.disabled = true;
    startWatch.classList.add("disabled");

    pauseWatch.disabled = false;
    pauseWatch.classList.remove("disabled");

    recordTime.disabled = false;
    recordTime.classList.remove("disabled");

    startWatch.innerText = "Start";

    timeInterval = setInterval(() => {
        miliSecondsCount += 1;
        if (miliSecondsCount > 99) {
            miliSecondsCount = 0;
            secondsCount += 1;
        }

        if (secondsCount > 59) {
            minutesCount += 1;
            secondsCount = 0;
        }

        if (minutesCount > 59) {
            hoursCount += 1;
            minutesCount = 0;
        }

        miliSecond.innerText = miliSecondsCount.toString().length == 2 ? miliSecondsCount : "0" + miliSecondsCount;

        second.innerText = secondsCount.toString().length == 2 ? secondsCount : "0" + secondsCount;

        minute.innerText = minutesCount.toString().length == 2 ? minutesCount : "0" + minutesCount;

        hour.innerText = hoursCount.toString().length == 2 ? hoursCount : "0" + hoursCount
    }, 10);
})

// Pause the Timer
pauseWatch.addEventListener("click", () => {
    clearInterval(timeInterval);
    startWatch.innerText = "Resume";

    pauseWatch.disabled = true;
    pauseWatch.classList.add("disabled");

    startWatch.disabled = false;
    startWatch.classList.remove("disabled");

    resetWatch.disabled = false;
    resetWatch.classList.remove("disabled");
});

// Reset the Timer
resetWatch.addEventListener("click", () => {

    miliSecondsCount = 0;
    secondsCount = 0;
    minutesCount = 0;
    hoursCount = 0;

    miliSecond.innerText = "00";
    second.innerText = "00";
    minute.innerText = "00";
    hour.innerText = "00";
    recordContainer.innerHTML = "";
    document.querySelector(".container").style.marginTop = "0";

    startWatch.innerText = "Start"

    resetWatch.disabled = true;
    resetWatch.classList.add("disabled");

    pauseWatch.disabled = true;
    pauseWatch.classList.add("disabled");

    recordTime.disabled = true;
    recordTime.classList.add("disabled");
})

// Record time
recordTime.addEventListener("click", () => {
    if (window.screen.width > 450){
        document.querySelector(".container").style.marginTop = "50px";
    }

    recordContainer.innerHTML += `<div class="record">
    <p class="recordedTime">${hour.innerText} : ${minute.innerText} : ${second.innerText} : ${miliSecond.innerText}</p>
    <button class="deleteRecord" onclick="removeRecord(this)">Delete</button>
</div> `
})

function removeRecord(element){
    recordContainer.removeChild(element.parentElement);

    if (document.querySelectorAll(".record").length === 0){
        document.querySelector(".container").style.marginTop = "0";
    }
}
