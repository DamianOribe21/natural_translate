const express = require('express');
const routerApiV1 = require('./routes');
const cors = require('cors');

const path = require('path');
const frontPath = path.join(__dirname, '../frontend/dist');

const app = express();
const port = 3001;

app.use(express.json()).use(cors());
app.use("/", express.static(frontPath))

// app.get('/', (req, res) => {
//   res.send('Hola traductores desde express');
// });

app.use('/api', routerApiV1);

app.all('*', (req, res) => {
  res.status(404).json({
    error: `Ups '${req.url}' no existe`,
  });
});

app.listen(port, () => {
  console.log('Corriendo en el puerto ' + port);
});
