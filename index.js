let IdCounter = 0;
const input = document.querySelector('input[type="Text"]');

userinput.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});

let addTask = () => {
  IdCounter++;

  let newValue = input.value

  list.innerHTML += `<div class="task-container" id="${IdCounter}">
    <label>
        <input type="checkbox">
        ${newValue}
    </label>
    <img src="./imagen/papelera-de-reciclaje.png" class="closeBtn">
</div>`;
input.value=''
updatestats()
};

list.addEventListener('click', (event)=>{
    if (event.srcElement.nodeName == 'INPUT'){
       console.log(event.target)
      //  event.srcElement.labels[0].childNodes[1].checked=true

        updatestats()
    } else if (event.srcElement.nodeName=='IMG'){
        deleteTask(event.srcElement.parentNode.id)
    } else if (event.srcElement.nodeName=='DIV'){
        const ele = event.srcElement
        //console.log(event)
        ele.classList.toggle('task-containerM')
        const ele2 = event.target.childNodes[1].childNodes[1].checked
        event.target.childNodes[1].childNodes[1].checked=true
        updatestats()
        //console.log(ele2)
        }
})

let updatestats= ()=>{
    let element = list.querySelectorAll('div')
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked')
    stats.innerHTML=`<p>Articulos Pendientes: ${element.length} Completados: ${checkbox.length}</p>`
}
let deleteTask = (id)=>{
    let taskToDelete= document.getElementById(id)
    list.removeChild(taskToDelete)
    updatestats()
}

let marcar = (id)=>{
    const $miCheckbox = document.getElementById(id)
    $miCheckbox.checked = true
}