function LOGI() {
  let usermin = document.getElementById("user").value;
  let user = usermin.toUpperCase();
  let pass = document.getElementById("pass").value;

  if (user == "GRD1" && pass == "1234") {
    window.location = "LOGON1.HTML?user=" + user;
  } else if (user == "SAT2" && pass == "1234") {
    window.location = "LOGON1.HTML?user=" + user;
  } else if (user == "SAT3" && pass == "1234") {
    window.location = "LOGON1.HTML?user=" + user;
  } else if (user == "SAT4" && pass == "1234") {
    window.location = "LOGON1.HTML?user=" + user;
  } else if (user == "GRT2" && pass == "1234") {
    window.location = "LOGON1.HTML?user=" + user;
  } else if (user == "PLT2" && pass == "1234") {
    window.location = "LOGON1.HTML?user=" + user;
  } else {
    alert("Usuario o contraseña son incorrectos");
  }
}

let rowData = [];

window.onload = function () {
  addRow();
};

function addRow() {
  const tableBody = document.querySelector("#dynamicTable tbody");
  const newRow = tableBody.insertRow();

  const nameCell = newRow.insertCell(0);
  const emailCell = newRow.insertCell(1);

  nameCell.innerHTML =
    '<input autofocus type="text" placeholder="Referencia" class="name-input input-test">';
  emailCell.innerHTML =
    '<input type="number" min="0" placeholder="Cantidad" class="email-input input-test">';
  nameCell.querySelector(".name-input").focus();

  rowData.push({ Descripcion: "", Cantidad: "" });
  const buttons = document.querySelectorAll(".button");
  const addButton = buttons[0]; // Índice 0 para el primer botón
  addButton.scrollIntoView({ behavior: "smooth", block: "end" });
}

function generateExcel() {
  let params = new URLSearchParams(window.location.search);
  let user = params.get("user");
  const tableRows = document.querySelectorAll("#dynamicTable tbody tr");

  tableRows.forEach((row, index) => {
    const nameInput = row.querySelector(".name-input");
    const emailInput = row.querySelector(".email-input");

    rowData[index].Descripcion = nameInput.value;
    rowData[index].Cantidad = emailInput.value;
  });

  // Crear una hoja de cálculo
  const ws = XLSX.utils.json_to_sheet(rowData);

  // Crear un libro de Excel
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Guardar el archivo Excel y crear un enlace para la descarga
  XLSX.writeFile(wb, user + ".xlsx");
}
