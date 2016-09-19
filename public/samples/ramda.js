const empty = R.equals("");
const reTest = R.curry((re, str) => re.test(str));
const isEmail = reTest(/\w+@\w+/);

const lower = (str) => str.toLocaleLowerCase();

const validate = (firstname, lastname, email, amount) => {
  const eqFirstname = R.compose(R.equals(lower(firstname)), lower);

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
