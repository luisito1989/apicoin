const path = require('path');
const express = require('express');
const app = express();

const routes = require('./routes/index');
const bodyParser = require('body-parser');

// settings
app.set('port', process.env.PORT || 3000); // indicamos el puerto
app.set('views', path.join(__dirname, 'views')); // Indicamos la ubicación de una carpeta o archivo, en este caso views
app.set('view engine', 'ejs'); // indicamos el motor de plantillas, en este caso ejs

// middleware
app.use((req, res, next) => {
    next();
});

app.use(bodyParser.json()); // interpreta los datos recibidos por el navegador como un json
app.use(bodyParser.urlencoded({extended: false})); //Se configura en false ya que no se esperan imagenes o archivos complejos


// routes
app.use(routes);

// static files
app.use(express.static(path.join(__dirname, 'public')));//Acá van los archivos estaticos

// Start server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
  });
