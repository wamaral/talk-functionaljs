function Validator() {
  this.url = "http://localhost:3000/service/";
  this.validFirstname = false;
  this.validLastname = false;
  this.validEmail = false;
  this.emailExists = false;
  this.hasAmount = false;
}

var fn = Validator.prototype;

fn.isValid = function() {
  return this.validFirstname &&
    this.validLastname &&
    this.validEmail &&
    this.emailExists &&
    this.hasAmount;
}

fn.validate = function(firstname, lastname, email, amount) {
  var _this = this;
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

  var emailExistsUrl = this.url + "true";
  return $.get(emailExistsUrl)
    .then(function(data, textStatus, xhr) {
      if (xhr.status !== 200) {
        throw new Error("Erro de conexão");
      }
      if (data && data.val && data.val === "true") {
        console.log("Email existe");
        _this.emailExists = true;
        return true;
      }
      throw new Error("Email não existe");
    }).then(function() {
      var hasAmountUrl = _this.url + "true" + "?amount=" + amount;
      return $.get(hasAmountUrl);
    }).then(function(data, textStatus, xhr) {
      if (xhr.status !== 200) {
        throw new Error("Erro de conexão");
      }
      if (data && data.val && data.val === "true") {
        console.log("Possui saldo");
        _this.hasAmount = true;
        return true;
      }
      throw new Error("Não possui saldo");
    }).catch(function(err) {
      throw err;
    });
};

var validator = new Validator();
validator.validate("foo", "bar", "foo@bar.com", 100)
  .then(function (suc) {
    console.log("Validado com sucesso: " + validator.isValid());
  }).catch(function (err) {
    console.log("A validação falhou: " + err);
  });
