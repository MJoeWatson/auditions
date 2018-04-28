var promise = require('bluebird');
var util = require('util')
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
const db = pgp(cn);

module.exports = {
  //Users
  getSingleUserByEmail: getSingleUserByEmail,
  getSingleUserById: getSingleUserById,
  createUser: createUser

};

function getSingleUserByEmail(email, done) {
  return db.task('getInsertUserIdByEmail', function *(t) {
    const userId = yield t.oneOrNone('SELECT id FROM users WHERE email = $1', [email], u => u && u.id);
    return yield done(null, userId || null );
  });
}

function getSingleUserById(id, done) {
  return db.task('getInsertUserIdById', function *(t) {
    const userId = yield t.oneOrNone('SELECT id FROM Users WHERE id = $1', [id],  u => u && u.id);
    console.log(userId);
    return yield done(null, userId || null );
  });
}

function createUser(profile, done) {
  return db.task('createUser', function *(t) {
    const userId = yield t.one('INSERT INTO Users(firstname, lastname, age, gender, email) VALUES($1, $2, $3, $4, $5) RETURNING id',
                      [profile.name.givenName, profile.name.familyName, 21, profile.gender, profile.email], u => u && u.id);
    console.log("USER ID create User:   " + userId);
    return yield done(null, userId || null );
  });
}
