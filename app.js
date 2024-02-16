const http = require("node:http");
let hitCount = 0;
let errorCount = 0;

const petForm = `
  <form action="/submitPets" method="GET">
    <p><input type="text" name="name" placeholder="What's your pet's name?"/></p>
    <p><input type="submit" value="Send to fire?!?" /></p>
  </form>
`

function respondWithError(response) {
  hitCount++;
  response.writeHead(450, {
    "Content-Type": "application/json",
    "racoon-invasion-status": "You can't tell me what to do MOM."
  });
  response.end(
    JSON.stringify({
      data: `${hitCount} goat dude${hitCount === 1 ? "" : "s"} ${hitCount === 1 ? "has" : "have"} been blocked!`,
    })
  );
  console.log("What is rage count?\n\t", hitCount);
}

function respondWithFrogs(response) {
  hitCount++;
  response.writeHead(418, {
    "Content-Type": "application/json",
    "racoon-invasion-status": "The frogs came over for tea, which isn't weird at all."
  });
  response.end(
    JSON.stringify({
      data: `${hitCount} goat${hitCount === 1 ? "" : "s"} ${hitCount === 1 ? "has" : "have"} hopped around this pond!`,
    })
  );
  console.log("What is ribbit count?\n\t", hitCount);
}

function respondWithHomePage(response) {
  hitCount++;
  response.writeHead(200, {
    "Content-Type": "text/html",
    "racoon-invasion-status": "the racoons have not yet invaded. we're safe.... for now."
  });
  response.end(`
    <!doctype html />
    <html>
      <head>
        <title> Hot Diggity </title>
      </head>
      <body style="font-family: 'Courier New', monospace; background-color: orchid">
        <br>
        <h1 style="font-size:46px"> Holy tamales Batman!! </h1>
        <p style="font-size:22px">
          <strong> There are tamales everywhere... but <em>why??</em></strong>
        </p>
        <p><strong>${hitCount} tamale${hitCount === 1 ? "" : "s"} ${hitCount === 1 ? "has" : "have"} been made here...</strong></p>
        <br>
        ${petForm}
      </body>
    </html>
    `);
  console.log("How many tamales?\n\t", hitCount);
}


const handleIncomingRequest = (request, response) => {
  console.log("what is request.url?\n\t", request.url);
  if (request.url === "/") {
    respondWithHomePage(response);
  } else if(request.url === "/frogs"){
    respondWithFrogs(response);
  } else if(request.url === "/booyah"){
    respondWithError(response);
  } else if(request.url.startsWith("/submitPets")){
    respondWithError(response);
  } else {
    errorCount++;
    response.writeHead(451, {
      "Content-Type": "application/json",
      "racoon-invasion-status": "THE RACOONS ARE INVADING!! WE'RE ALL DOOOOMED!!"
    });
    response.end(
      JSON.stringify({
        message: `${errorCount} goat${errorCount === 1 ? "" : "s"} ${errorCount === 1 ? "has" : "have"} broken the law! The Feds are on their way to your house right now!!! ):<<<<`,
        howIllegalIsThis: errorCount
      })
    );
  }
};
// Create a local server to receive data from
const server = http.createServer(handleIncomingRequest);
// Tell the server to listen on port 1414 for incoming requests
server.listen(1414);