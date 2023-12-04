const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();

const outputDirectory = '//veeam-proxy-tocumen/AttenzaGeneral/Pedido Tester';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Asume que tus archivos estáticos (html, css, js) están en una carpeta llamada 'public'

app.post('/save-excel', (req, res) => {
    const data = req.body.data;
    const user = req.body.user;
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, path.join(outputDirectory,`${user}.xlsx`));
    res.send('Excel guardado en el servidor!');
});

app.get('/LOGON1.HTML', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/LOGON1.HTML'));
});

app.listen(3000, () => console.log('Server is running on port 3000'));