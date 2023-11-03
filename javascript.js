const ipaddressInput = document.getElementById("ipaddressInput");
let ipAddress = "10.0.0.17";
function command(command) {
    if (command === "cd") {
      fetch("http://"+ipAddress, {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // Handle a successful response here
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }
let data = {command: "cd"};

function setIP(){
    if (ipaddressInput.value != ""){
        ipAddress = ipaddressInput.value;
        document.getElementById("ipaddressSpan").textContent = "Set IP: " + ipAddress;
        console.log("IP set to: " + ipAddress);
    }
}



