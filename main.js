//meta cuantos vasos (goal = meta)?
let goal = 8;
//current = progreso, empieza en cero por que todavia no tomas agua
let current = 0;

//capturamos el porcentaje del progreso 
const goalEl = document.getElementById('goal');
const currentEl = document.getElementById('current');
const progressBar = document.getElementById('progressBar');
const drinkBar = document.getElementById('drinkBtn');

goalEl.textContent = goal;

drinkBtn.addEventListener("click", () => {
    //evita que el contador supere la meta
    if(current < goal){
        current++;
        updateUI();
    }

});

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
    Notification.requestPermission
}

function remainder(){
    new Notification ("💧 Hidratate", {
        body: "Es momento de tomar awita"
    });
}
Notification.requestPermission();
setInterval(remainder, 1 * 60 * 1000);

 




