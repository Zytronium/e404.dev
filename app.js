const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Twig = require('twig');

const indexRouter = require('./routes/Yh8AFZa7');
const healthRouter = require('./routes/health');
const mapRouter = require('./routes/map');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Yh8AFZa7', indexRouter);
app.use('/health', healthRouter);
app.use('/map', mapRouter);

// catch 404 and render 404 page
app.use(async function(req, res, next) {
  try {
    const html = await new Promise((resolve, reject) => {
      Twig.renderFile(path.join(__dirname, 'views', 'e404.twig'), {
        settings: {
          views: path.join(__dirname, 'views')
        },
        title: 'Error 404'
      }, (err, html) => {
        if (err) reject(err);
        else resolve(html);
      });
    });
    res.status(404).send(html);
  } catch(e) {
    console.error('Render error:', e);
    res.status(404).send('<pre>' + e + '</pre>');
  }
}); // alright I give up. I'm commiting this broken fix attempt and abandoning this repo

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
