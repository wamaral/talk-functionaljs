class Validator {
  constructor() {
    this.url = "/service";
    this.validFirstname = false;
    this.validLastname = false;
    this.validEmail = false;
    this.emailExists = false;
    this.hasAmount = false;
  }

  get valid() {
    return this.validFirstname &&
      this.validLastname &&
      this.validEmail &&
      this.emailExists &&
      this.hasAmount;
  }

  validate(firstname, lastname, email, amount) {
    this.validFirstname = firstname !== "";
    this.validLastname = lastname !== "" && lastname !== firstname;
    this.validEmail = email && email.match(/\w+@\w+/);

    if (!this.validFirstname) {
      throw new Error("Primeiro nome inválido");
    }
    if (!this.validLastname) {
      throw new Error("Último nome inválido");
    }
    if (!this.validEmail) {
      throw new Error("Email inválido");
    }

    const emailExistsUrl = `${this.url}/true`;
    return $.get(emailExistsUrl)
      .then((data, textStatus, xhr) => {
        if (xhr.status !== 200) {
          throw new Error("Erro de conexão");
        }
        if (data && data.val && data.val === "true") {
          console.log("Email existe");
          this.emailExists = true;
          return true;
        }
        throw new Error("Email não existe");
      }).then(() => {
        const hasAmountUrl = `${this.url}/true?amount=${amount}`;
        return $.get(hasAmountUrl);
      }).then((data, textStatus, xhr) => {
        if (xhr.status !== 200) {
          throw new Error("Erro de conexão");
        }
        if (data && data.val && data.val === "true") {
          console.log("Possui saldo");
          this.hasAmount = true;
          return true;
        }
        throw new Error("Não possui saldo");
      }).catch((err) => { throw err; });
  }
}

(() => {
  const validator = new Validator();
  return validator.validate("foo", "bar", "foo@bar.com", 100)
    .then(() => console.log(`Validado com sucesso: ${validator.valid}`))
    .catch((err) => console.log(`A validação falhou: ${err}`));
});
