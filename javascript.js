const ipaddressInput = document.getElementById("ipaddressInput");
let ipAddress = "10.0.0.17";
function command(command){
    if (command == "cd"){

        fetch("10.0.0.17/command?command=cd", {
            method: "POST",
            body: JSON.stringify(data)
          });
    }
}
let data = {command: "cd"};

function setIP(){
    if (ipaddressInput.value != ""){
        ipAddress = ipaddressInput.value;
        console.log("IP set to: " + ipAddress);
    }
}



