let goal = 8;

const today = new Date().toDateString();
const lastDate = localStorage.getItem("lastDate");

if (lastDate !== today) {
    localStorage.setItem("current", 0);
    localStorage.setItem("lastDate", today);


const intervalButtons =  document.querySelectorAll(".interval-btn");

if (lastDate !== today) {
  localStorage.setItem("current", 0);
  localStorage.setItem("lastDate", today);
}

const savedCurrent = localStorage.getItem("current");
let current = savedCurrent ? Number(savedCurrent) : 0;

const currentEl = document.getElementById("current");
const goalEl = document.getElementById("goal");
const progressBar = document.getElementById("progressBar");
const drinkBtn = document.getElementById("drinkBtn");

goalEl.textContent = goal;
updateUI();


function updateUI(){
    currentEl.textContent = current;
    //calcula el porcentaje del progreso 
    const porcent = (current / goal) * 100;
    

}


/*
function updateUI() {
  currentEl.textContent = current;
  const percent = (current / goal) * 100;
  progressBar.style.width = percent + "%";
  progressBar.textContent = Math.round(percent) + "%";
}
*/


//si existe algo guardado usalo sino dejalo en 0
let current = savedCurrent ? Number(savedCurrent) : 0;





//CONTADOR DE TIEMPO REAL,DE PROXIMO RECORDATORIO
const countdownEl = document.getElementById("countdown");
let countdownInterval = null;
let remainingSeconds = 0;

//intervalos de tiempo botones
const intervalsButtons = document.querySelectorAll(".interval-btn");

function reminder() {
  alert("💧 Es hora de tomar agua");
}


//evita bugs y spam, multiples alerts
let reminderTimeout = null;
let reminderInterval = null;


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
    if (!minutes || isNaN(minutes)) return;

    clearTimeout(reminderTimeout);
    clearInterval(reminderInterval);
    clearInterval(countdownInterval);

    remainingSeconds = minutes * 60;
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    reminderTimeout = setTimeout(() => {
        reminder();
        remainingSeconds = minutes * 60;

        reminderInterval = setInterval(() => {
            reminder();
            remainingSeconds = minutes * 60;
        }, minutes * 60 * 1000);

    }, minutes * 60 * 1000);
}


function stopReminder(){
    clearTimeout(reminderTimeout);
    clearInterval(reminderInterval);
    clearInterval(countdownInterval);
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
function updateCountdown(){
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    countdownEl.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (remainingSeconds > 0) {
        remainingSeconds--;
    }
}






function startReminder(minutes){
    clearTimeout(reminderTimeout);
    clearInterval(reminderInterval);
    reminderTimeout = setTimeout(() => {
        reminder();

        //Después del primer aviso, ahora, repite el recordatorio cada X minutos.
    reminderInterval = setInterval(reminder, minutes * 60 * 1000);
    }, minutes * 60 * 1000);

}

intervalButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const minutes = Number(btn.dataset.minutes);
        startReminder(minutes);
    });
});

drinkBtn.addEventListener("click", () => {
    if(current < goal){
        current ++;
        localStorage.setItem("current",current);
        updateUI();
        if(current === goal){
            clearTimeout(reminderTimeout);
            clearInterval(reminderInterval);
        }
    }
})



