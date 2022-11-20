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
  const list = document.querySelectorAll("input[type=checkbox]");
  for (const checkbox of list) {
    checkbox.checked = false;
  }
  updatestats();
});
userinput.addEventListener("submit", (event) => {
  console.log('as');
  event.preventDefault();
  addTask();
});
let addTask = () => {
  IdCounter++;
  let newValue = input.value;
  list.innerHTML += `<div class="task-container"  id="${IdCounter}">
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
function hide(e) {
  e.currentTarget.style.visibility = "hidden";
  console.log(e.currentTarget);
  // When this function is used as an event handler: this === e.currentTarget
}

list.addEventListener("click", (event) => {
  if (event.srcElement.nodeName == "INPUT") {
    if (event.path[0].checked == false) {
      event.path[2].classList.remove("task-containerM");
    } else {
      event.path[2].classList.add("task-containerM");
    }
    updatestats();
  } else if (event.srcElement.nodeName == "IMG") {
    deleteTask(event.srcElement.parentNode.id);
  } else if (event.srcElement.nodeName == "DIV") {
    const ele = event.srcElement;
    ele.classList.toggle("task-containerM");
    if (event.target.childNodes[1].childNodes[1].checked == false) {
      event.target.childNodes[1].childNodes[1].checked = true;
      const ele = event.srcElement;
      ele.classList.add("task-containerM");
    } else {
      event.target.childNodes[1].childNodes[1].checked = false;
      const ele = event.srcElement;
      ele.classList.remove("task-containerM");
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
  let Pendientes = element.length - checkbox.length;
  stats.innerHTML = `<p>Articulos: ${element.length} Completados: ${checkbox.length} Pendientes ${Pendientes}</p>`;
};
let deleteTask = (id) => {
  let taskToDelete = document.getElementById(id);
  list.removeChild(taskToDelete);
  updatestats();
};
