

//meta cuantos vasos (goal = meta)?
let goal = 8;

//reset diario
const today = new Date().toDateString();
const lastDate = localStorage.getItem("lastDate");
if (lastDate !== today) {
    localStorage.setItem("current", 0);
    localStorage.setItem("lastDate", today);
}
let nextReminderTime = null;


//se pregunta si hay algo guardado
const savedCurrent = localStorage.getItem("current");

//si existe algo guardado usalo sino dejalo en 0
let current = savedCurrent ? Number(savedCurrent) : 0;

//capturamos el porcentaje del progreso 
const goalEl = document.getElementById('goal');
const currentEl = document.getElementById('current');
const progressBar = document.getElementById('progressBar');
const drinkBtn = document.getElementById('drinkBtn');

//CONTADOR DE TIEMPO REAL,DE PROXIMO RECORDATORIO
const countdownEl = document.getElementById("countdown");
let countdownInterval = null;
let remainingSeconds = 0;

//intervalos de tiempo botones
const intervalsButtons = document.querySelectorAll(".interval-btn");

goalEl.textContent = goal;

updateUI();

drinkBtn.addEventListener("click", () => {
    if (current < goal) {
        current++;
        localStorage.setItem("current", current);
        updateUI();

        remainingSeconds = 0;
        updateCountdown();


        if (current === goal) {
            stopReminder();
        }
    }
});


function updateUI() {
    //Muestra en pantalla cuántos vasos llevás.
    currentEl.textContent = current;
    //calcula el porcentaje
    const percent = (current / goal) * 100;
    //cambia el ancho de la barra de progreso
    progressBar.style.width = percent + "%";
    //muestra el porcentaje adentro de la barra
    progressBar.textContent = Math.round(percent) + "%";
}

if ("Notification" in window) {
    Notification.requestPermission();
}

function reminder() {
    if (Notification.permission === "granted") {
        new Notification("💧 Hidratate", {
            body: "Es momento de tomar agua"
        });
    }
}


let reminderTimeout = null;
let reminderInterval = null;

function startReminder(minutes){
    if(!minutes || isNaN(minutes)) return;

     clearTimeout(reminderTimeout);
     clearInterval(reminderInterval);
     clearInterval(countdownInterval);

     nextReminderTime = Data.now() + minutes * 60 * 1000;
     localStorage.setItem("nextReminderTime", nextReminderTime);

     startCountdown();

     reminderTimeout = setTimeout(() => {
        reminder();

        nextReminderTime = Date.now() +  minutes * 60 * 1000;
        localStorage.setItem("nextReminderTime", nextReminderTime);

        reminderInterval = setInterval(() => {
            reminder();

            nextReminderTime = Date.now() + minutes * 60 * 1000;
            localStorage.setItem("nextReminderTime", nextReminderTime);

        }, minutes * 60 * 1000);
     }, minutes * 60 * 1000);
   
}


function stopReminder(){
    clearTimeout(reminderTimeout);
    clearInterval(reminderInterval);
    clearInterval(countdownInterval);

    localStorage.removeItem("nextReminderTime");
    countdownEl.textContent = "✔️ Meta alcanzada";
}



function setActiveButton(minutes) {
    intervalsButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline-primary");

        if (Number(btn.dataset.minutes) === minutes) {
            btn.classList.remove("btn-outline-primary");
            btn.classList.add("btn-primary");
        }
    });
}

intervalsButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const minutes = Number(btn.dataset.minutes);
        localStorage.setItem("interval", minutes);
        setActiveButton(minutes);
        startReminder(minutes);
    })
})

const savedInterval = Number(localStorage.getItem("interval")) || 30;
setActiveButton(savedInterval);



//funcion actualizar contador
 function startCountdown(){
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const remaining = nextReminderTime - Date.now();

        if(remaining <= 0){
            countdownEl.textContent = "00:00";
            clearInterval(countdownInterval);
            return;
        }

        const totalSeconds = Math.floor(remaining / 1000);
        const min = String(Math.floor(totalSeconds / 60)).padStart(1, "0");
        const sec = String(totalSeconds % 60).padStart(2, "0");

        countdownEl.textContent = `${min}:${sec}`;
    }, 1000);

 }

 const savedNextTime = localStorage.getItem("nextReminderTime");
 if(savedNextTime){
    nextReminderTime = Number(savedNextTime);

    if(nextReminderTime > Date.now()){
        startCountdown();
    }else{
        countdownEl.textContent = "00:00";
        localStorage.removeItem("nextReminderTime");
    }
 }





