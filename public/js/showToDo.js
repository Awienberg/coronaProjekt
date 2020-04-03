'use strict';
import { $ } from './modules/nQuery.js';
import { Ajax } from './modules/Ajax.js';

const getToDos = function(ev) {
    //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile('/users/toDos/:todo', showToDo);
};

const addToDo = function(ev) {
    let createTodo = document.createElement('form');
    createTodo.setAttribute('id', 'createTodo');
    createTodo.setAttribute('action', '/users/toDos/');
    createTodo.setAttribute('method', 'POST');

    let titleLabel = document.createElement('label');
    let title = document.createTextNode('Title');
    let titleinput = document.createElement('input');
    titleinput.setAttribute('id', 'title');
    titleinput.setAttribute('type', 'text');
    titleinput.setAttribute('name', 'title');

    let todoLabel = document.createElement('label');
    let todo = document.createTextNode('To do');
    let todoinput = document.createElement('textarea');
    todoinput.setAttribute('id', 'todo');
    todoinput.setAttribute('type', 'text');
    todoinput.setAttribute('rows', '4');
    todoinput.setAttribute('cols', '50');
    todoinput.setAttribute('name', 'todo');

    let deadlineLabel = document.createElement('label');
    let deadline = document.createTextNode('Deadline');
    let deadlineinput = document.createElement('input');
    deadlineinput.setAttribute('id', 'deadline');
    deadlineinput.setAttribute('type', 'date');
    deadlineinput.setAttribute('name', 'deadline');

    let submitinput = document.createElement('input');
    submitinput.setAttribute('type', 'submit');
    submitinput.setAttribute('name', 'submit');
    submitinput.setAttribute('value', 'Add your Todo');

    createTodo.appendChild(titleLabel);
    titleLabel.appendChild(title);
    createTodo.appendChild(titleinput);
    createTodo.appendChild(todoLabel);
    todoLabel.appendChild(todo);
    createTodo.appendChild(todoinput);
    createTodo.appendChild(deadlineLabel);
    deadlineLabel.appendChild(deadline);
    createTodo.appendChild(deadlineinput);
    createTodo.appendChild(submitinput);

    $('updateCreate').appendChild(createTodo);
};
//Show users
var todo;
var todos;
const showToDo = function(e) {
    console.log(e.target.getResponseHeader('Content-Type'));
    let element = $('addTask');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    todos = JSON.parse(e.target.responseText);
    let tabel = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    let p = document.createTextNode('Title');
    th.appendChild(p);
    tr.appendChild(th);

    let th1 = document.createElement('th');
    let p1 = document.createTextNode('todo');
    th1.appendChild(p1);
    tr.appendChild(th1);

    let th2 = document.createElement('th');
    let p2 = document.createTextNode('Created');
    th2.appendChild(p2);
    tr.appendChild(th2);

    let th3 = document.createElement('th');
    let p3 = document.createTextNode('Deadline');
    th3.appendChild(p3);
    tr.appendChild(th3);

    let th4 = document.createElement('th');
    let p4 = document.createTextNode('Delete');
    th4.appendChild(p4);
    tr.appendChild(th4);

    let th5 = document.createElement('th');
    let p5 = document.createTextNode('Edit');
    th5.appendChild(p5);
    tr.appendChild(th5);

    let th6 = document.createElement('th');
    let p6 = document.createTextNode('Done');
    th6.appendChild(p6);
    tr.appendChild(th6);

    let th7 = document.createElement('th');
    let p7 = document.createTextNode('isDone');
    th7.appendChild(p7);
    tr.appendChild(th7);

    tabel.appendChild(tr);

    todos.forEach(function(todo, i) {
        let tr1 = document.createElement('tr');

        let td1 = document.createElement('td');
        let id = document.createTextNode(todo.title);
        td1.appendChild(id);
        tr1.appendChild(td1);

        let td2 = document.createElement('td');
        let td = document.createTextNode(todo.todo);
        td2.appendChild(td);
        tr1.appendChild(td2);

        let td3 = document.createElement('td');
        let cr = document.createTextNode(todo.created);
        td3.appendChild(cr);
        tr1.appendChild(td3);

        let td4 = document.createElement('td');
        let deadline = document.createTextNode(todo.deadline);
        td4.appendChild(deadline);
        tr1.appendChild(td4);

        //delete
        let td5 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/users/toDos/todo');

        let input = document.createElement('input');
        input.setAttribute('value', todo.title);
        input.setAttribute('name', 'delete');
        input.setAttribute('type', 'hidden');

        let delB = document.createElement('button');
        // let deltext = document.createTextNode('Delete');
        delB.setAttribute('class', 'fa fa-user-times');
        form.appendChild(input);
        form.appendChild(delB);
        // delB.appendChild(deltext);
        td5.appendChild(form);
        tr1.appendChild(td5);

        //edit
        let td6 = document.createElement('td');

        let editBtn = document.createElement('button');
        editBtn.setAttribute('id', 'a_' + i);
        // let edit = document.createTextNode('Edit');
        editBtn.setAttribute('class', 'fa fa-user-edit');
        editBtn.addEventListener('click', getValuesToForm);
        // editBtn.appendChild(edit);
        td6.appendChild(editBtn);
        tr1.appendChild(td6);

        //done
        let td7 = document.createElement('td');
        let form3 = document.createElement('form');
        form3.setAttribute('method', 'POST');
        form3.setAttribute('action', '/users/toDos/done');

        let input2 = document.createElement('input');
        input2.setAttribute('value', todo.title);
        input2.setAttribute('name', 'title');
        input2.setAttribute('type', 'hidden');

        let input3 = document.createElement('input');
        input3.setAttribute('value', todo.isDone ? false : true);
        input3.setAttribute('name', 'done');
        input3.setAttribute('type', 'hidden');

        let doneBtn = document.createElement('button');
        // let done = document.createTextNode('Done');
        doneBtn.setAttribute('class', 'fa fa-user-check');
        form3.appendChild(input2);
        form3.appendChild(input3);
        form3.appendChild(doneBtn);
        // doneBtn.appendChild(done);
        td7.appendChild(form3);
        tr1.appendChild(td7);

        //isDone true/false
        let td8 = document.createElement('td');
        let iD = document.createTextNode(todo.isDone);
        td8.appendChild(iD);
        tr1.appendChild(td8);

        tabel.appendChild(tr1);
    });

    $('addTask').appendChild(tabel);
};

function showstarter() {
    getToDos();
    addToDo();
}

window.addEventListener('load', showstarter);

function getValuesToForm(e) {
    let j = e.target.id;
    console.log(j);
    j = j.substr(2);
    console.log(j);
    let updateValue = $('title');
    todo = todos[j];
    updateValue.setAttribute('value', todo.title);
    updateValue = $('todo');
    todo = todos[j];
    $('todo').innerHTML = todo.todo;
    updateValue = $('deadline');
    todo = todos[j];
    updateValue.setAttribute('value', todo.deadline);
    console.log(updateValue);
}
