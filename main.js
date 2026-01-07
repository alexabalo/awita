let goal = 8;

const today = new Date().toDateString();
const lastDate = localStorage.getItem("lastDate");

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



function reminder() {
  alert("💧 Es hora de tomar agua");
}

//evita bugs y spam, multiples alerts
let reminderTimeout = null;
let reminderInterval = null;

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



