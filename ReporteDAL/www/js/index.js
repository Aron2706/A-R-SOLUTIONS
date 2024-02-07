/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  document.getElementById("deviceready").classList.add("ready");
}

//Se importa configuración y nombre de HTML a redirigir
import config from "./config.js";
const html = config.html2;

//Función con la que se obtiene el usuario y contraseña y redirecciona a la página especificada e la configuración
function LOGI() {
  let usermin = document.getElementById("user").value;
  let user = usermin.toUpperCase();
  let pass = document.getElementById("pass").value;
  let url = html + "?user=" + user;

  if (
    (user == "GRD1" && pass == "1234") ||
    (user == "SAT2" && pass == "1234") ||
    (user == "SAT3" && pass == "1234") ||
    (user == "SAT4" && pass == "1234") ||
    (user == "GRT2" && pass == "1234") ||
    (user == "PLT2" && pass == "1234")
  ) {
    window.location = url;
  } else {
    alert("Usuario o contraseña son incorrectos");
  }
}

document
  .getElementById("loginform")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    LOGI();
  });
