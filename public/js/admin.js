'use strict';
import { $ } from './modules/nQuery.js';
import { Ajax } from './modules/Ajax.js';

const getUsers = function(ev) {
    //continents
    let req = Object.create(Ajax);
    req.init();
    req.getFile('/users/admin/:user', showUsers);
};
//Show users
const showUsers = function(e) {
    console.log(e.target.getResponseHeader('Content-Type'));
    let element = $('users');
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    let users = JSON.parse(e.target.responseText);
    let tabel = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    let p = document.createTextNode('User ID');
    th.appendChild(p);
    tr.appendChild(th);

    let th1 = document.createElement('th');
    let p1 = document.createTextNode('Firstname');
    th1.appendChild(p1);
    tr.appendChild(th1);

    let th2 = document.createElement('th');
    let p2 = document.createTextNode('Lastname');
    th2.appendChild(p2);
    tr.appendChild(th2);

    let th3 = document.createElement('th');
    let p3 = document.createTextNode('Edit');
    th3.appendChild(p3);
    tr.appendChild(th3);

    let th4 = document.createElement('th');
    let p4 = document.createTextNode('Delete');
    th4.appendChild(p4);
    tr.appendChild(th4);

    tabel.appendChild(tr);

    users.forEach(function(user) {
        let tr1 = document.createElement('tr');

        let td1 = document.createElement('td');
        let id = document.createTextNode(user.userID);
        td1.appendChild(id);
        tr1.appendChild(td1);

        let td2 = document.createElement('td');
        let fn = document.createTextNode(user.firstName);
        td2.appendChild(fn);
        tr1.appendChild(td2);

        let td3 = document.createElement('td');
        let ln = document.createTextNode(user.lastName);
        td3.appendChild(ln);
        tr1.appendChild(td3);

        let td4 = document.createElement('td');
        let btn = document.createElement('button');
        btn.setAttribute('class', 'fa fa-user-edit');
        // let edit = document.createTextNode('Edit');
        td4.appendChild(btn);
        // btn.appendChild(edit);
        tr1.appendChild(td4);

        let td5 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/users/admin/:user');

        let input = document.createElement('input');
        input.setAttribute('value', user.userID);
        input.setAttribute('name', 'slet');
        input.setAttribute('type', 'hidden');

        let delB = document.createElement('button');
        // let deltext = document.createTextNode(' Delete');
        delB.setAttribute('class', 'fa fa-user-times');

        form.appendChild(input);
        form.appendChild(delB);
        // delB.appendChild(deltext);
        td5.appendChild(form);
        tr1.appendChild(td5);
        tabel.appendChild(tr1);
    });

    $('users').appendChild(tabel);
};

function showstarter() {
    getUsers();
}

window.addEventListener('load', showstarter); // kick off JS
