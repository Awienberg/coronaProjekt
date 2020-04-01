"use strict";
const mon = require("./mongooseWrap");
const ToDos = require("./ToDos");
const dbServer = "localhost";
const dbname = "Todos";

exports.getToDos = async function (query, sort) {
    try {
        let cs = await mon.retrieve(dbServer, dbname, ToDos, query, sort);
        return cs;
    } catch (e) {
        console.error(e);
    }
};

exports.upsertToDos = async function (req) {
    let check = { title: req.body.title };
    let todo = new ToDos({
        title: req.body.title,
        todo: req.body.todo,
        created: req.body.created,
        deadline: req.body.deadline,
    });
    try {
        let cs = await mon.upsert(dbServer, dbname, ToDos, todo, check);
    } catch(e) {
        console.error(e);
    }
};

exports.deleteToDos = async function (name) {
    try {
        let cs = await mon.remove(dbServer, dbname, ToDos, name);
        return cs;
    } catch (e) {
        console.log(e);
    }
}
