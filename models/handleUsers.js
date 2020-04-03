'use strict';
const mon = require('./mongooseWrap');
const bcrypt = require('bcryptjs'); // added for hashing
const User = require('./User');
const saltTurns = 10;
const dbServer = 'localhost';
const dbname = 'todousers';

exports.getUsers = async function(query, sort) {
    try {
        let cs = await mon.retrieve(dbServer, dbname, User, query, sort);
        return cs;
    } catch (e) {
        console.error(e);
    }
};

exports.upsertUser = async function(req) {
    let check = { userID: req.body.userID };
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userID: req.body.userID,
        password: await bcrypt.hash(req.body.password, saltTurns)
    });
    try {
        let cs = await mon.upsert(dbServer, dbname, User, user, check);
    } catch (e) {
        console.error(e);
    }
};

exports.approveUser = async function(req) {
    let check = { userID: req.body.userID };
    let user = new User({
        isApproved: req.body.approve
    });
    try {
        let cs = await mon.upsert(dbServer, dbname, User, user, check);
        console.log(cs);
        console.log(user);
    } catch (e) {
        console.error(e);
    }
};

exports.deleteUser = async function(user) {
    try {
        let cs = await mon.remove(dbServer, dbname, User, user);
        console.log(cs);
        console.log(user);
        return cs;
    } catch (e) {
        console.log(e);
    }
};

exports.verifyUser = async function(req) {
    let check = { userID: req.body.userID };
    let u = await this.getUsers(check);
    let success = await bcrypt.compare(req.body.password, u[0].password);
    if (success && isApproved) {
        req.session.authenticated = true; // set session vars
        req.session.user = u[0].userID; // set session vars
    } else {
        req.session = undefined;
    }
    return success;
};
