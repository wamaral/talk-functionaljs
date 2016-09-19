const validFirstname = (firstname) => firstname !== "";
const validLastname = (firstname, lastname) => lastname !== "" && lastname !== firstname;
const validEmail = (email) => email && email.match(/\w+@\w+/);

const validate = (firstname, lastname, email, amount) => {
  if (!validFirstname(firstname)) {
    throw new Error("Primeiro nome inválido");
  }
  if (!validLastname(firstname, lastname)) {
    throw new Error("Último nome inválido");
  }
  if (!validEmail(email)) {
    throw new Error("Email inválido");
  }

  return true;
};

(() =>
  validate("foo", "bar", "foo@bar.com", 100)
    .then((suc) => console.log(`Validado com sucesso: ${suc}`))
    .catch((err) => console.log(`A validação falhou: ${err}`))
);
