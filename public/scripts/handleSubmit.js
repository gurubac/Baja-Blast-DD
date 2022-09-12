const baseURL = "https://bajablastlive.herokuapp.com";
async function yesSubmit(addressURL) {
  //console.log("yes button was clicked")
  let timestamp = moment(new Date()).format("h:mm:ss A - MMMM Do, YYYY");
  let status = "WORKING";
  let data = {
    timestamp: timestamp,
    status: status,
  };
  await fetch(`${baseURL}/${addressURL}/info`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      //console.log(json)
      window.location = window.location;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function noSubmit(addressURL) {
  //console.log("no button was clicked")
  let timestamp = moment(new Date()).format("h:mm:ss A - MMMM Do, YYYY");
  let status = "NOT WORKING";
  let data = {
    timestamp: timestamp,
    status: status,
  };
  await fetch(`${baseURL}/${addressURL}/info`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      //console.log(json)
      window.location = window.location;
    })
    .catch((err) => {
      console.log(err);
    });
}
