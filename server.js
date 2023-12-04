const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();

const outputDirectory = "//veeam-proxy-tocumen/AttenzaGeneral/Pedido Tester";

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Asume que tus archivos estáticos (html, css, js) están en una carpeta llamada 'public'

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

  XLSX.writeFile(workbook, path.join(outputDirectory, `${formattedDate}-${user}-${marca}-${por}.xlsx`));
  res.send("Excel guardado en el servidor!");
  console.log(formattedDate + " - Pedido " + marca + " de " + user + " solicitado por " + por + " guardado en el servidor");
});

app.get("/LOGON1.HTML", (req, res) => {
  res.sendFile(path.join(__dirname, "public/LOGON1.HTML"));
});

app.listen(3000, () => console.log("Server is running on port 3000"));
