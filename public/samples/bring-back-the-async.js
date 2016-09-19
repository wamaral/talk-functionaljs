const url = "/service";
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

  const emailExistsUrl = `${url}/true`;
  return $.get(emailExistsUrl)
    .then((data, textStatus, xhr) => {
      if (xhr.status !== 200) {
        throw new Error("Erro de conexão");
      }
      if (data && data.val && data.val === "true") {
        console.log("Email existe");
        return true;
      }
      throw new Error("Email não existe");
    }).then(() => {
      const hasAmountUrl = `${url}/true?amount=${amount}`;
      return $.get(hasAmountUrl);
    }).then((data, textStatus, xhr) => {
      if (xhr.status !== 200) {
        throw new Error("Erro de conexão");
      }
      if (data && data.val && data.val === "true") {
        console.log("Possui saldo");
        return true;
      }
      throw new Error("Não possui saldo");
    }).catch((err) => { throw err; });
};

(() =>
 validate("foo", "bar", "foo@bar.com", 100)
 .then((suc) => console.log(`Validado com sucesso: ${suc}`))
 .catch((err) => console.log(`A validação falhou: ${err}`))
);
