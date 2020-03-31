"use strict";
const mon = require("./mongooseWrap");
//const mongoose = require('mongoose')                      //DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
//mongoose.set('useCreateIndex', true);
const bcrypt = require('bcryptjs');                         // added for hashing
const User = require("./User");
const saltTurns = 10;
const dbServer = "localhost";
const dbname = "todousers";

exports.getUsers = async function (query, sort) {
    try {
        let cs = await mon.retrieve(dbServer, dbname, User, query, sort);
        return cs;
    } catch (e) {
        console.error(e);
    }
};

exports.upsertUser = async function (req) {
    let check = { userID: req.body.userID };
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userID: req.body.userID,
        password: await bcrypt.hash(req.body.password, saltTurns)
    });
    try {
        let cs = await mon.upsert(dbServer, dbname, User, user, check);
    } catch(e) {
        console.error(e);
    }
};

exports.verifyUser = async function (req) {
    let check = { userID: req.body.userID };
    let u = await this.getUsers(check);
    let success = await bcrypt.compare(req.body.password, u[0].password);
    if (success) {
        req.session.authenticated = true;       // set session vars
        req.session.user = u[0].userID;      // set session vars
    } else {
        req.session = undefined;
    }
    return success;
};