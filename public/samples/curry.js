const curry = (f) => (x) => (y) => f(x, y);

const eq = curry((x, y) => x === y);
const empty = (str) => str === "";
const isEmail = (email) => email.match(/\w+@\w+/);

const validate = (firstname, lastname, email, amount) => {
  const eqFirstname = eq(firstname);

  if (empty(firstname)) {
    throw new Error("Primeiro nome inválido");
  }
  if (empty(lastname) || eqFirstname(lastname)) {
    throw new Error("Último nome inválido");
  }
  if (!isEmail(email)) {
    throw new Error("Email inválido");
  }

  return true;
};

(() =>
  validate("foo", "bar", "foo@bar.com", 100)
);
