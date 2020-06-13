import express from "express";
import path from 'path';

const isProd = process.env.NODE_ENV === "production";

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
        // instruct the dev server to the home.html file to disk 
        // so that the route handler will be able to read it 
        return /.+\.css$/.test(filePath);
      }
    }
  )
  webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
}

const guestRoutes = require("./routes/guest");

/**
 * 
 *  global app variables 
 * 
 * */
const app = express();



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
  app.use(express.static(path.join(__dirname, '../images')));
  app.use(express.static(path.join(__dirname, '../icons')));

})(app)



const endPointsMW = (function (app) {
  app.use('/', guestRoutes)
})(app)


const connect = (async function (app) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`app is listening on port http://localhost:${PORT}`)
  })
})(app)
