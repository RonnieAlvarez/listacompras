class productos {
  constructor(id, producto) {
    this.id = Date.now();
    this.producto = producto;
  }
}
const input = document.querySelector('input[type="Text"]');
let IdCounter = 0;
let listaproductos;
let tablaproductos;
let list = document.querySelector("#list");
document.addEventListener("DOMContentLoaded", () => {
  pintar();
});
let userinputhtml = document.getElementById("userinput")
userinputhtml.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value != "") {
    addTask();
  }
});
let addTask = () => {
  IdCounter++;
  let newValue = input.value;
  let lista = document.createElement("list");
  lista.innerHTML = `<div class="task-container"  id="${IdCounter}">
  <input type="checkbox" id="dchkbx">
  <label >
  ${newValue}
  </label>
  <img src="./img/delete-forever.png" class="closeBtn">
  </div>`;
  list.appendChild(lista);
  let otrovalor = list.innerHTML;
  let id = Date.now();
  let producto = otrovalor;
  let productoObj = new productos(id, producto);
  if (Array.isArray(listaproductos)) {
    listaproductos.push(productoObj);
  }
  input.value = "";
  updatestats();
  sincronizaStorage();
};

list.addEventListener("click", (event) => {
  event.stopPropagation();
  console.log(event.target.className)
  if (event.target.nodeName == "INPUT" && event.target.className !=='list-container') {
       event.target.parentNode.classList.toggle("task-containerM");
       updatestats();
  } else if (event.target.nodeName == "IMG") {
    deleteTask(event.target.parentNode.id);
  } else if (event.target.parentNode.nodeName == "DIV"  && event.target.className !=='list-container') {
    if (event.target.parentNode.childNodes[1].checked == false) {
      event.target.parentNode.childNodes[1].checked=true
      
      event.target.parentNode.classList.add("task-containerM");
    } else {
      event.target.parentNode.childNodes[1].checked=false
      event.target.parentNode.classList.remove("task-containerM");
    }
    updatestats();
  } else if (event.target.className =='task-container'){
    event.target.parentNode.classList.toggle("task-containerM");
    updatestats();
  }
});
function sincronizaStorage() {
  localStorage.setItem("listaproductos", JSON.stringify(listaproductos));
}
let updatestats = () => {
  let element = list.querySelectorAll("div");
  let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
  let Pendientes = element.length - checkbox.length;
  stats.innerHTML = `<p>Cant: ${element.length} Marc: ${checkbox.length} Pend: ${Pendientes}</p>`;
};
let deleteTask = (id) => {
  if (listaproductos.length == 1) {
    listaproductos.shift();
    tablaproductos.innerHTML = ""
  } else if (listaproductos.length > 1) {
    listaproductos.splice(id - 1, 1);
  }
  sincronizaStorage();
  pintar();
  updatestats();
};

function removetodo() {
  let element = document.getElementById("list");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  listaproductos=[]
  sincronizaStorage()
  updatestats();
}

function pintar() {
  let gettable = localStorage.getItem("listaproductos");
  listaproductos = gettable ? JSON.parse(gettable) : [];
  for (const key in listaproductos) {
    tablaproductos = document.getElementById("list");
    tablaproductos.innerHTML = listaproductos[key].producto;
  }
  updatestats();
}

function desmarcarchkbox(){
  const listaux = document.querySelectorAll("input[type=checkbox]");
  for (const checkbox of listaux) {
    checkbox.checked = false;
    checkbox.parentNode.remove("task-containerM");
  }
  pintar()
  updatestats()
}