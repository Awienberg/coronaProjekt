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
  let p = document.createTextNode("Task");
  th.appendChild(p);
  tr.appendChild(th);

  let th1 = document.createElement("th");
  let p1 = document.createTextNode("Title");
  th1.appendChild(p1);
  tr.appendChild(th1);

  let th2 = document.createElement("th");
  let p2 = document.createTextNode("Todo");
  th2.appendChild(p2);
  tr.appendChild(th2);

  let th3 = document.createElement("th");
  let p3 = document.createTextNode("created");
  th3.appendChild(p3);
  tr.appendChild(th3);

  let th4 = document.createElement("th");
  let p4 = document.createTextNode("deadline");
  th4.appendChild(p4);
  tr.appendChild(th4);

  tabel.appendChild(tr);

  todos.forEach(function(todo) {
    let tr1 = document.createElement("tr");

    let td1 = document.createElement("td");
    let id = document.createTextNode(todo.title);
    td1.appendChild(id);
    tr1.appendChild(td1);

    let td2 = document.createElement("td");
    let fn = document.createTextNode(todo.todo);
    td2.appendChild(fn);
    tr1.appendChild(td2);

    let td3 = document.createElement("td");
    let ln = document.createTextNode(todo.created);
    td3.appendChild(ln);
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
