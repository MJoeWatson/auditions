var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
const cn = {
  host: 'dev-auditions.csfjyfsxxre8.eu-west-1.rds.amazonaws.com',
  port: 5432,
  database: 'auditions',
  user: 'master',
  password: 'M0torhead1234'
}
var db = pgp(cn);

// add query functions

module.exports = {
  //Users
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser,

  //Instruments
  getAllInstruments: getAllInstruments,
  getSingleInstrument: getSingleInstrument,
  createInstrument: createInstrument,
  updateInstrument: updateInstrument,
  removeInstrument: removeInstrument,

  //USER AND INSTRUMENT
  // getAllUsersWithInstr: getAllUsersWithInstr,
  // getAllInstrForUser: getAllInstrForUser,
  // getUsersWithSingleInstr: getUsersWithSingleInstr,
  // createInstrForUser: createInstrForUser,
  // updateInstrForUser: updateInstrForUser,
  // removeInstrForUser: removeInstrForUser

};

/*                     */
//        USERS
/*                     */

function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
  });
}

function getSingleUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.one('select * from users where user_id = $1', userID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createUser(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into users(name, age, sex)' +
      'values(${name}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateUser(req, res, next) {
  db.none('update users set name=$1, age=$2, sex=$3 where user_id=$4',
    [req.body.name, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeUser(req, res, next) {
  var userID = parseInt(req.params.id);
  db.result('delete from users where user_id = $1', userID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} user`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

/*                     */
//     INSTRUMENTS
/*                     */

function getAllInstruments(req, res, next) {
  db.any('select * from instruments')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL instruments'
        });
    })
    .catch(function (err) {
      return next(err);
  });
}

function getSingleInstrument(req, res, next) {
  var instrumentID = parseInt(req.params.id);
  db.one('select * from instruments where instrument_id = $1', instrumentID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE instrument'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createInstrument(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into instruments(name, age, sex)' +
      'values(${name}, ${age}, ${sex})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one instrument'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateInstrument(req, res, next) {
  db.none('update instruments set name=$1, age=$2, sex=$3 where instrument_id=$4',
    [req.body.name, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated instrument'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeInstrument(req, res, next) {
  var instrumentID = parseInt(req.params.id);
  db.result('delete from instruments where instrument_id = $1', instrumentID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} instrument`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

/*                     */
// USER + INSTRUMENTS
/*                     */

function getAllInstruments(req, res, next) {
  db.any('select * from userinstruments')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Users + their Instruments'
        });
    })
    .catch(function (err) {
      return next(err);
  });
}

function getUsersWithSingleInstr(req, res, next) {
  var instrumentID = parseInt(req.params.instrumentId);
  db.any('select * from userinstruments where instrument_id = $1', instrumentID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE Instrument with the respective Users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
