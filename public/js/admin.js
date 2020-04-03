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
    let p3 = document.createTextNode('Has Access');
    th3.appendChild(p3);
    tr.appendChild(th3);

    let th4 = document.createElement('th');
    let p4 = document.createTextNode('Set Access Rights');
    th4.appendChild(p4);
    tr.appendChild(th4);

    let th5 = document.createElement('th');
    let p5 = document.createTextNode('Delete User');
    th5.appendChild(p5);
    tr.appendChild(th5);

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
        let iA = document.createTextNode(user.isApproved);
        td4.appendChild(iA);
        tr1.appendChild(td4);

        let td5 = document.createElement('td');
        let form = document.createElement('form');
        form.setAttribute('method', 'POST');
        form.setAttribute('action', '/users/admin/isApproved');

        let input1 = document.createElement('input');
        input1.setAttribute('value', user.userID);
        input1.setAttribute('name', 'userID');
        input1.setAttribute('type', 'text');

        let input2 = document.createElement('input');
        input2.setAttribute('value', user.isApproved);
        input2.setAttribute('name', 'userID');
        input2.setAttribute('type', 'text');

        let appB = document.createElement('button');
        // let deltext = document.createTextNode(' Delete');
        appB.setAttribute('class', 'fa fa-user-check');

        form.appendChild(input1);
        form.appendChild(input2);
        form.appendChild(appB);
        // delB.appendChild(deltext);
        td5.appendChild(form);
        tr1.appendChild(td5);
        tabel.appendChild(tr1);

        let td6 = document.createElement('td');
        let form2 = document.createElement('form');
        form2.setAttribute('method', 'POST');
        form2.setAttribute('action', '/users/admin/user');

        let input3 = document.createElement('input');
        input3.setAttribute('value', user.userID);
        input3.setAttribute('name', 'slet');
        input3.setAttribute('type', 'hidden');

        let delB = document.createElement('button');
        // let deltext = document.createTextNode(' Delete');
        delB.setAttribute('class', 'fa fa-user-times');

        form2.appendChild(input3);
        form2.appendChild(delB);
        // delB.appendChild(deltext);
        td6.appendChild(form2);
        tr1.appendChild(td6);
        tabel.appendChild(tr1);
    });

    $('users').appendChild(tabel);
};

function showstarter() {
    getUsers();
}

window.addEventListener('load', showstarter); // kick off JS
