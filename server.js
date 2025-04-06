const fs = require('fs');
const https = require('https');
const cors = require('cors');
const stripe = require("stripe")("your-secret-key"); // Замените "your-secret-key" на ваш секретный ключ из панели Stripe
const express = require('express');
const app = express();
const port = 443;

const options = {
  key: fs.readFileSync("./tls/server.key"), // Приватный ключ
  cert: fs.readFileSync("./tls/server.cert"), // Сертификат
  secureOptions: require('crypto').constants.SSL_OP_NO_TLSv1 | require('crypto').constants.SSL_OP_NO_TLSv1_1 // Отключить старые версии TLS
};


const payRoutes = require('./src/pay/pay_routes');

app.use(express.json());
app.use(cors({
  origin: 'https://localhost:8080'
}));

app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.use('/handle_payment', payRoutes);

app.get("/error",  (req, res) => {
  console.log("error");
})

app.get('/', async (req, res) =>   {
  console.log(req.body)
  res.status(200).json("Connected");
})

app.post('/', async (req, res) =>   {
  console.log(req.body)
  console.log(`Protocol: ${req.protocol}`);
  res.status(200).json("Connected");
})


https.createServer(options, app).listen(port, () => {
  console.log('HTTPS-сервер запущен на порту ' + port);
});