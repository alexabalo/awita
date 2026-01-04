

//meta cuantos vasos (goal = meta)?
let goal = 8;

//reset diario
const today = new Date().toDateString();
const lastDate = localStorage.getItem("lastDate");
if(lastDate !== today){
    localStorage.setItem("current", 0);
    localStorage.setItem("lastDate", today);
}


//se pregunta si hay algo guardado
const savedCurrent = localStorage.getItem("current");

//si existe algo guardado usalo sino dejalo en 0
let current = savedCurrent ? Number(savedCurrent) : 0; 

//capturamos el porcentaje del progreso 
const goalEl = document.getElementById('goal');
const currentEl = document.getElementById('current');
const progressBar = document.getElementById('progressBar');
const drinkBtn = document.getElementById('drinkBtn');

//intervalos de tiempo botones
const intervalsButtons = document.querySelectorAll("interval.btn");

goalEl.textContent = goal;

 updateUI();

drinkBtn.addEventListener("click", () => {
    if(current < goal){
        current++;
        localStorage.setItem("current", current);
        updateUI();
    }
})

function updateUI(){
    //Muestra en pantalla cuántos vasos llevás.
    currentEl.textContent = current;
    //calcula el porcentaje
    const percent = (current / goal) * 100;
    //cambia el ancho de la barra de progreso
    progressBar.style.width = percent + "%";
    //muestra el porcentaje adentro de la barra
    progressBar.textContent = Math.round(percent) + "%";
}

if("Notification" in window){
    Notification.requestPermission().then(permission => {
        if(permission === "granted"){
            setInterval(remainder, 50 * 60 * 1000);
        }
    })
}

function remainder(){
    if(Notification.permission === "granted"){
        new Notification("💧 Hidratate", {
            body: "Es momento de tomar awita"
        });
    }
}

//funcion buttons intervals
function setActiveButton(minutes){
    intervalsButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-primary");

        if(Number(btn.dateset.minutes) === minutes){
            btn.classList.remove("btn-outline-primary");
            btn.classList.add("btn-primary")
        }
    })

}




 

   



