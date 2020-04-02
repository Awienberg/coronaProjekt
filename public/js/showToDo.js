"use strict";
import { $ } from "./modules/nQuery.js";
import { Ajax } from "./modules/Ajax.js";

const getToDos = function(ev) {
  //continents
  let req = Object.create(Ajax);
  req.init();
  req.getFile("/users/toDos/:todo", showToDo);
};
//Show users
const showToDo = function(e) {
  console.log(e.target.getResponseHeader("Content-Type"));
  let element = $("addTask");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  let todos = JSON.parse(e.target.responseText);
  let tabel = document.createElement("table");
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let p = document.createTextNode("Title");
  th.appendChild(p);
  tr.appendChild(th);

  let th1 = document.createElement("th");
  let p1 = document.createTextNode("todo");
  th1.appendChild(p1);
  tr.appendChild(th1);

  let th2 = document.createElement("th");
  let p2 = document.createTextNode("Created");
  th2.appendChild(p2);
  tr.appendChild(th2);

  let th3 = document.createElement("th");
  let p3 = document.createTextNode("Deadline");
  th3.appendChild(p3);
  tr.appendChild(th3);

  tabel.appendChild(tr);

  todos.forEach(function(todo) {
    let tr1 = document.createElement("tr");

    let td1 = document.createElement("td");
    let id = document.createTextNode(todo.title);
    td1.appendChild(id);
    tr1.appendChild(td1);

    let td2 = document.createElement("td");
    let td = document.createTextNode(todo.todo);
    td2.appendChild(td);
    tr1.appendChild(td2);

    let td3 = document.createElement("td");
    let cr = document.createTextNode(todo.created);
    td3.appendChild(cr);
    tr1.appendChild(td3);

    let td4 = document.createElement("td");
    let deadline = document.createElement(todo.deadline);
    td4.appendChild(deadline);
    tr1.appendChild(td4);
    tabel.appendChild(tr1);
  });

  $("addTask").appendChild(tabel);
};

function showstarter() {
  getToDos();
}

window.addEventListener("load", showstarter);
