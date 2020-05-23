import express from "express";
import path from 'path';
import session from 'express-session';
import multipartExtract from './middleware/multipartExtract';
import User from './models/User';
let setLocals = require('./middleware/setLocals');

const isProd = process.env.NODE_ENV === "production";

console.log(`process.env: ${JSON.stringify({
  DB_URI: process.env.DB_URI,
  BUCKET_NAME: process.env.BUCKET_NAME
})}`);

const isAdmin = require('./middleware/is-auth').isAdmin;
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const mongoConnect = require('./util/database').mongoConnect;
const MONGODB_URI = require('./util/database').dbURI;
const bodyParser = require('body-parser');
const flash = require('connect-flash');

let webpackDevMiddleware;
let webpackHotMiddleware;
if (!isProd) {
  console.log(`Execution mode: development`);
  const webpack = require("webpack")

  const config = require("../config/webpack.dev.js");
  const compiler = webpack(config);
  webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    {
      writeToDisk: (filePath) => {
        // instruct the dev server to the home.html file to disk 
        // so that the route handler will be able to read it 
        return /.+\.css$/.test(filePath);
      }
    }
  )
  webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
}

const guestRoutes = require("./routes/guest");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");


/**
 * 
 *  global app variables 
 * 
 * */
const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

/**
 * data middleware
 */
const dataMW = (function (app) {
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(
    bodyParser.json()
  )

})(app)

/**
 * multipart middleware
 */

app.post('*', multipartExtract)



/**
 * 
 * Session middleware
 * 
 */

const sessionMW = (function (app) {
  //Define session middleware
  app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
})(app)




/**
 * Webpack middleware
 */
if (!isProd) {
  const webpackMW = (function (app) {
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);
  })(app)
}

/**
 * 
 * General Middleware
 * 
 */

const generalMW = (function (app) {
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, "../src/views"))

  app.use(express.static(path.join(__dirname, '../dist')));
})(app)




/**
 * flash Middleware
 * 
 */
const flasHMW = (app => {
  app.use(flash());
})(app)


/**
 * 
 * csrf Middleware
 * 
 */
const csrfMW = (function (app) {

  app.use(csrfProtection);
})(app)



const userMW = (function (app) {
  app.use(async (req, res, next) => {
    if (req.session.user) {
      try {
        let user = await User.findById(req.session.user._id);
        if (user) {
          req.user = user;
          res.locals.isLoggedIn = !!req.user
          res.locals.isAdmin = req.user.admin;
          res.locals.user = user.email
        }
      } catch (err) {
        throw new Error(err);
      }
    }
    next();
  });
})(app)

const localsMW = (function (app) {
  app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  })
})(app)

const endPointsMW = (function (app) {
  app.use('/', guestRoutes)
  app.use('/admin', isAdmin, adminRoutes)
  app.use('/auth', authRoutes)
})(app)


const connect = (async function (app) {
  await mongoConnect();
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`app is listening on port http://localhost:${PORT}`)
  })
})(app)
