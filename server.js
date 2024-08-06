const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const dbConnection = require('./config/coneccion');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const HOST = '192.168.20.29';




const usuario = require('./routes/usuario');
const turno = require('./routes/turno');
const area = require('./routes/area');
const agencia = require('./routes/agencia');


app.use('/api', usuario)
app.use('/api', turno)
app.use('/api', area)
app.use('/api', agencia)




app.get('/', (req, res) => {
    res.send('mi backend...');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send('Error en el servidor');
});

app.listen(PORT, HOST, () => {
    console.log(`Aplicación de Node.js iniciada en http://${HOST}:${PORT}`);
});