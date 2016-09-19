const url = "/service";

const validate = (firstname, lastname, email, amount) => {
  const validFirstname = firstname !== "";
  const validLastname = lastname !== "" && lastname !== firstname;
  const validEmail = email && email.match(/\w+@\w+/);

  if (!validFirstname) {
    throw new Error("Primeiro nome inválido");
  }
  if (!validLastname) {
    throw new Error("Último nome inválido");
  }
  if (!validEmail) {
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
