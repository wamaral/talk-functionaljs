const empty = (str) => str === "";
const isEmail = (email) => email.match(/\w+@\w+/);
const namesDiffer = (firstname, lastname) => firstname !== lastname;

const validate = (firstname, lastname, email, amount) => {
  if (empty(firstname)) {
    throw new Error("Primeiro nome inválido");
  }
  if (empty(lastname) || !namesDiffer(firstname, lastname)) {
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
