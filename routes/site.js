module.exports = {
  toAccount: toAccount
}

function toAccount(req, res, next) {
  res.render('account', { user: req.user });
}
