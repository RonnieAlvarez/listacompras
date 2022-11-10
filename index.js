class productos {
  constructor(id, producto) {
    this.id = Date.now();
    this.producto = producto;
  }
}
let IdCounter = 0;
const input = document.querySelector('input[type="Text"]');
let listaproductos = [];
document.addEventListener("DOMContentLoaded", () => {
  let gettable = localStorage.getItem("listaproductos");
  let listaproductos = gettable ? JSON.parse(gettable) : [];
  for (const key in listaproductos) {
    let tablaproductos = document.getElementById("list");
    tablaproductos.innerHTML = listaproductos[key].producto;
  }
  updatestats();
});
userinput.addEventListener("submit", (event) => {
  event.preventDefault();
  addTask();
});
let addTask = () => {
  IdCounter++;
  let newValue = input.value;
  list.innerHTML += `<div class="task-container" id="${IdCounter}">
  <label>
  <input type="checkbox">
  ${newValue}
  </label>
  <img src="./img/delete-forever.png" class="closeBtn">
  </div>`;
  let otrovalor = list.innerHTML;
  const productoObjs = {
    id: Date.now(),
    producto: newValue,
  };
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
  if (event.srcElement.nodeName == "INPUT") {
    const ele = event.srcElement;
    ele.classList.toggle("task-containerM");
    updatestats();
  } else if (event.srcElement.nodeName == "IMG") {
    deleteTask(event.srcElement.parentNode.id);
  } else if (event.srcElement.nodeName == "DIV") {
    const ele = event.srcElement;
    ele.classList.toggle("task-containerM");
    if (event.target.childNodes[1].childNodes[1].checked == false) {
      event.target.childNodes[1].childNodes[1].checked = true;
    } else {
      event.target.childNodes[1].childNodes[1].checked = false;
    }
    updatestats();
  }
});
function sincronizaStorage() {
  localStorage.setItem("listaproductos", JSON.stringify(listaproductos));
}
let updatestats = () => {
  let element = list.querySelectorAll("div");
  let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
  stats.innerHTML = `<p>Articulos Pendientes: ${element.length} Completados: ${checkbox.length}</p>`;
};
let deleteTask = (id) => {
  let taskToDelete = document.getElementById(id);
  list.removeChild(taskToDelete);
  updatestats();
};
