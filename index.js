const koa = require("koa");
const serve = require("koa-static");
const route = require("koa-route");

const service = function *(val = true) {
  const delay = this.request.query.delay ? parseInt(this.request.query.delay, 10) :
        Math.floor(Math.random() * 1000) + 500;

  const now = new Date().getTime();
  while (new Date().getTime() < now + delay) { void 0; }

  this.body = {
    val,
    delay,
  };
};

const app = koa();

app.use(route.get("/service/:val", service));
app.use(serve("./public"));

app.listen(3000);
console.log("Listening on port 3000");
