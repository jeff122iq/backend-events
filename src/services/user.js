

function register (req, res) {
  console.log(123)
  res.status(201).send({add: 'fee'});
}

module.exports = {
  register
};