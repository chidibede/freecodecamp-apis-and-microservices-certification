var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// --> 7)  Mount the Logger middleware here

// --> 11)  Mount the body-parser middleware  here

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */

// app.get('/', (req, res) => {
//   res.send('Hello Express')
// })

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use((req, res, next) => {
  const method = req.method;
  const ip = req.ip;
  const urlpath = req.path;
  console.log(`${method} ${urlpath} - ${ip}`);
  next();
});

/** 3) Serve an HTML file */
const absolutePath = __dirname + "/views/index.html";
// console.log(absolutePath)
app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
const path = __dirname + "/public";
app.use(express.static(path));

/** 5) serve JSON on a specific route */
const jsonData = {
  message: "Hello json"
};
// app.get('/json', (req, res) => {
//   res.json(jsonData)
// })

/** 6) Use the .env file to configure the app */
const jsonDataUpper = {
  message: "HELLO JSON"
};
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json(jsonDataUpper);
  } else {
    res.json(jsonData);
  }
});

/** 8) Chaining middleware. A Time server */
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    console.log(req.time);
    next();
  },
  (req, res) => {
    res.json({
      time: req.time
    });
  }
);

/** 9)  Get input from client - Route parameters */
const route = "/:word/echo";
app.get(route, (req, res) => {
  res.json({
    echo: req.params["word"]
  });
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({ extended: false }));

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app
  .route("/name")
  .get((req, res) => {
    const firstName = req.query["first"];
    const lastName = req.query["last"];
    res.json({
      name: `${firstName} ${lastName}`
    });
  })
  .post((req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    res.json({
      name: `${firstName} ${lastName}`
    });
  });



/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
