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
    let deadline = document.createTextNode(todo.deadline);
    td4.appendChild(deadline);
    tr1.appendChild(td4);

    //delete
    let td5 = document.createElement("td");
    let form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "/users/toDos/:todo");

    let input = document.createElement("input");
    input.setAttribute("value", todo.title);
    input.setAttribute("name", "slet");
    input.setAttribute("type", "hidden");

    let delB = document.createElement("button");
    let deltext = document.createTextNode("Delete");
    delB.setAttribute("class", "del");
    form.appendChild(input);
    form.appendChild(delB);
    delB.appendChild(deltext);
    td5.appendChild(form);
    tr1.appendChild(td5);

    //edit
    let td6 = document.createElement("td");
    let form2 = document.createElement("form");
    form2.setAttribute("method", "POST");
    form2.setAttribute("action", "/users/toDos/:todo");

    let input1 = document.createElement("input");
    input1.setAttribute("value", todo.title);
    input1.setAttribute("name", "slet");
    input1.setAttribute("type", "hidden");

    let editBtn = document.createElement("button");
    let edit = document.createTextNode("Edit");
    editBtn.setAttribute("class", "edit");
    form2.appendChild(input1);
    form2.appendChild(editBtn);
    editBtn.appendChild(edit);
    td6.appendChild(form2);
    tr1.appendChild(td6);

    //done
    let td7 = document.createElement("td");
    let form3 = document.createElement("form");
    form3.setAttribute("method", "POST");
    form3.setAttribute("action", "/users/toDos/:todo");

    let input2 = document.createElement("input");
    input2.setAttribute("value", todo.title);
    input2.setAttribute("name", "slet");
    input2.setAttribute("type", "hidden");

    let doneBtn = document.createElement("button");
    let done = document.createTextNode("Done");
    doneBtn.setAttribute("class", "edit");
    form3.appendChild(input2);
    form3.appendChild(doneBtn);
    doneBtn.appendChild(done);
    td7.appendChild(form3);
    tr1.appendChild(td7);

    tabel.appendChild(tr1);
  });

  $("addTask").appendChild(tabel);
};

function showstarter() {
  getToDos();
}

window.addEventListener("load", showstarter);
