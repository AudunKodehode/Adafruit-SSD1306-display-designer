const ipaddressInput = document.getElementById("ipaddressInput");
let ipAddress = "10.0.0.17";
const requestOptions = {
  method: "POST",
  mode: "no-cors",
};
let screenWidth = "128";
let screenHeight = "64";
let color = "1";
let textSize = "1";
let radius = "0";
let x0 = "0";
let y0 = "0";
let x1 = "0";
let y1 = "0";
let x2 = "0";
let y2 = "0";
let width = "0";
let height = "0";
let drawOrFill = "fill";
let commandNumber = 0;

const customCommandInput = document.getElementById("customCommandInput");
const customCommandSendButton = document.getElementById(
  "customCommandSendButton"
);
const blackRadio = document.getElementById("blackRadio");
const colorRadio = document.getElementById("colorRadio");
const drawRadio = document.getElementById("drawRadio");
const fillRadio = document.getElementById("fillRadio");
const textSizeSlider = document.getElementById("textSizeSlider");
const textSizeSpan = document.getElementById("textSizeSpan");
const ipaddressSpan = document.getElementById("ipaddressSpan");
const radiusInput = document.getElementById("radiusInput");
const screenWidthInput = document.getElementById("screenWidthInput");
const screenHeightInput = document.getElementById("screenHeightInput");
const x0Input = document.getElementById("x0Input");
const y0Input = document.getElementById("y0Input");
const x1Input = document.getElementById("x1Input");
const y1Input = document.getElementById("y1Input");
const x2Input = document.getElementById("x2Input");
const y2Input = document.getElementById("y2Input");
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heightInput");
const textInput = document.getElementById("textInput");
const ssd1306Code = document.getElementById("ssd1306Code");
const customCode = document.getElementById("customCode");
function screenWidthChange() {
  screenWidth = screenWidthInput.value.toString();
  x0Input.max = screenWidthInput.value - 1;
  x1Input.max = screenWidthInput.value - 1;
  x2Input.max = screenWidthInput.value - 1;
  if (x0 > screenWidthInput.value - 1) {
    x0 = screenWidthInput.value - 1;
    x0Input.value = x0;
  }
  if (x1 > screenWidthInput.value - 1) {
    x1 = screenWidthInput.value - 1;
    x1Input.value = x1;
  }
  if (x2 > screenWidthInput.value - 1) {
    x2 = screenWidthInput.value - 1;
    x2Input.value = x2;
  }
}
function screenHeightChange() {
  screenHeight = screenHeightInput.value.toString();
  y0Input.max = screenHeightInput.value - 1;
  y1Input.max = screenHeightInput.value - 1;
  y2Input.max = screenHeightInput.value - 1;
  if (y0 > screenHeightInput.value - 1) {
    y0 = screenHeightInput.value - 1;
    y0Input.value = y0;
  }
  if (y1 > screenHeightInput.value - 1) {
    y1 = screenHeightInput.value - 1;
    y1Input.value = y1;
  }
  if (y2 > screenHeightInput.value - 1) {
    y2 = screenHeightInput.value - 1;
    y2Input.value = y2;
  }
}
function radio(type) {
  if (type == "color") {
    blackRadio.checked = false;
    color = "1";
  } else if (type == "black") {
    colorRadio.checked = false;
    color = "0";
  }
  if (type == "draw") {
    fillRadio.checked = false;
    drawOrFill = "draw";
  } else if (type == "fill") {
    drawRadio.checked = false;
    drawOrFill = "fill";
  }
}

function radiusChange() {
  radius = radiusInput.value.toString();
}
function widthChange() {
  width = widthInput.value.toString();
}
function heightChange() {
  height = heightInput.value.toString();
}

function textSizeSliderChange() {
  textSizeSpan.textContent = "TextSize: " + textSizeSlider.value;
  textSize = textSizeSlider.value.toString();
}
function x0Change() {
  x0 = x0Input.value.toString();
}
function x1Change() {
  x1 = x1Input.value.toString();
}
function x2Change() {
  x2 = x2Input.value.toString();
}
function y0Change() {
  y0 = y0Input.value.toString();
}
function y1Change() {
  y1 = y1Input.value.toString();
}
function y2Change() {
  y2 = y2Input.value.toString();
}
let lastCommand = "";

customCommandInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    customCommandSendButton.click();

    lastCommand = customCommandInput.value;
    customCommandInput.value = "";
  }
  if (event.key === "ArrowUp") {
    customCommandInput.value = lastCommand;
  }
});

function addCustom(command) {
  const newCommand = document.createElement("p");
  customCode.appendChild(newCommand);
  newCommand.id = commandNumber;
  const deleteButton = document.createElement("button");
  deleteButton.style.width = "20px";
  deleteButton.style.height = "20px";
  deleteButton.style.marginRight = "5px";
  deleteButton.style.backgroundColor = "gray";
  deleteButton.style.borderRadius = "5px";
  deleteButton.addEventListener("mouseover", function () {
    deleteButton.style.backgroundColor = "red";
  });
  deleteButton.addEventListener("mouseout", function () {
    deleteButton.style.backgroundColor = "gray";
  });

  deleteButton.className = "deleteButton";
  deleteButton.onclick = function () {
    customCode.removeChild(newCommand);
  };
  newCommand.appendChild(deleteButton);
  let commandText = document.createTextNode(command + ";");
  newCommand.appendChild(commandText);
}

function command(command) {
  if (command == "cd") {
    command = "cd";
    addCustom(command);
  }
  if (command == "pixel") {
    command = "dp" + x0 + "," + y0 + "," + color;
    addCustom(command);
  }
  if (command == "line") {
    command = "dl" + x0 + "," + y0 + "," + x1 + "," + y1 + "," + color;
    addCustom(command);
  }
  if (command == "invert") {
    command = "id";
    addCustom(command);
  }

  if (command == "circle") {
    if (drawOrFill == "fill") {
      command = "fc";
    } else {
      command = "dc";
    }
    command += x0 + "," + y0 + "," + radius + "," + color;
    addCustom(command);
  }
  if (command == "rectangle") {
    if (drawOrFill == "fill") {
      command = "fr";
    } else {
      command = "dr";
    }
    command +=
      x0 + "," + y0 + "," + width + "," + height + "," + radius + "," + color;
    addCustom(command);
  }
  if (command == "triangle") {
    if (drawOrFill == "fill") {
      command = "ft";
    } else {
      command = "dt";
    }
    command +=
      x0 + "," + y0 + "," + x1 + "," + y1 + "," + x2 + "," + y2 + "," + color;
    addCustom(command);
  }
  if (command == "newLine") {
    command = "nl";
    addCustom(command);
  }
  if (command == "newtext") {
    command =
      "nt" + x0 + "," + y0 + "," + color + "," + textSize + textInput.value;
    addCustom(command);
  }
  if (command == "printText") {
    command =
      "pt" + x0 + "," + y0 + "," + color + "," + textSize + textInput.value;
    addCustom(command);
  }
  if (command == "continueText") {
    command = "ct" + textInput.value;
    addCustom(command);
  }

  const url = `http://${ipAddress}/command?command=${command}`;
  fetch(url, requestOptions)
    .then((response) => {
      if (response.ok) {
      }
    })
    .catch((error) => {});
}
function customCommand(command) {
  if ((command = "customCommand")) {
    command = customCommandInput.value;
    if (!command.includes(";")) {
      command += ";";
    }
    addCustom(command);
  }
  const url = `http://${ipAddress}/command?command=${command}`;
  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
      }
    })
    .catch((error) => {});
}

function setIP() {
  if (ipaddressInput.value != "") {
    ipAddress = ipaddressInput.value;
    ipaddressSpan.textContent = "Set IP: " + ipAddress;
  }
}
function clearAll() {
  customCode.textContent = "";
  ssd1306Code.textContent = "";
}
function clearCustom() {
  customCode.textContent = "";
}

function clearSSD() {
  ssd1306Code.textContent = "";
}

function copySSD() {
  var copyText = document.getElementsByClassName("ssd1306Code")[0];
  var range = document.createRange();
  range.selectNode(copyText);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();
}
function copyCustom() {
  var copyText = document.getElementsByClassName("customCode")[0];
  var range = document.createRange();
  range.selectNode(copyText);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();
}
