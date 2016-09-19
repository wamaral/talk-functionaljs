const isEmail = R.test(/\w+@\w+/);

const validate = (firstname, lastname, email, amount) => {
  const eqFirstname = R.compose(R.equals(R.toLower(firstname)), R.toLower);

  if (R.isEmpty(firstname)) {
    throw new Error("Primeiro nome inválido");
  }
  if (R.isEmpty(lastname) || eqFirstname(lastname)) {
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
