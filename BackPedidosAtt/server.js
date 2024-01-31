const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const https = require("https");

const app = express();

const HTTP_SERVER_PORT = 3000;
const HTTPS_SERVER_PORT = 3001;
const PedidosTestersDir = "//veeam-proxy-tocumen/AttenzaGeneral/Pedido Tester";
const ReportesDalDir = "//veeam-proxy-tocumen/AttenzaGeneral/Reportes Daños DAL";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Asume que tus archivos estáticos (html, css, js) están en una carpeta llamada 'public'

// Leer la clave y el certificado
const key = fs.readFileSync(path.resolve(__dirname, "key.pem"));
const cert = fs.readFileSync(path.resolve(__dirname, "cert.pem"));

app.post("/save-excel", (req, res) => {
  const data = req.body.data;
  const user = req.body.user;
  const marca = req.body.marca;
  const por = req.body.por;
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Obtener la fecha actual y formatearla como una cadena
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  XLSX.writeFile(workbook, path.join(PedidosTestersDir, `${formattedDate}-${user}-${marca}-${por}.xlsx`));
  res.send("Excel guardado en el servidor!");
  console.log(formattedDate + " - Pedido " + marca + " de " + user + " solicitado por " + por + " guardado en el servidor");
});

app.post("/save-excel-danos", (req, res) => {
  try {
    console.log(req.body);
    const data = req.body.data;
    const Tienda = req.body.Tienda;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte " + Tienda);

    // Obtener la fecha actual y formatearla como una cadena
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    XLSX.writeFile(workbook, path.join(ReportesDalDir, `${formattedDate}-${Tienda}.xlsx`));
    res.send("Reporte enviado correctamente!");
    console.log(formattedDate + " - Reporte de daños de " + Tienda + " guardado en el servidor");
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error al procesar la solicitud');
  }
});


app.get("/LOGON1.HTML", (req, res) => {
  res.sendFile(path.join(__dirname, "public/LOGON1.HTML"));
});

app.listen(HTTP_SERVER_PORT, () => console.log("Servidor HTTP ejecutandose en puerto " + HTTP_SERVER_PORT));

// Crear el servidor HTTPS
const server = https.createServer({ key, cert }, app);

// Escuchar en el puerto 8443
server.listen(HTTPS_SERVER_PORT, () => console.log("Servidor HTTPS ejecutandose en el puerto " + HTTPS_SERVER_PORT));

//Ejecutar el comando node server.js en la terminal para iniciar el servidor