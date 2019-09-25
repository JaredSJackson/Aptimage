const http = require('http');
const axios = require('axios');
const hostname = '127.0.0.1';
const port = 9966;
var Peer = require('simple-peer');
var twilio = require('twilio');
var cassandraMAP = require("cassandra-map");//for single quote JSON 
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var accountSid = 'AC26f89f8666bcdd8aa2a2296438806527';
var authToken = 'a9bb800ed4a93dfc0aa7f519eeb57e1c';
var client = require('twilio')(accountSid, authToken);

const server = http.createServer((req, res) => {
	var ice;
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');

	client.tokens.create({ ttl: 3600 }).then(token => {
		ice = token.iceServers;

		// ice = ("\""+(JSON.stringify(ice)).replace(/\"/g, "\""+"@\"")+"\"");
		ice = (JSON.stringify(ice));
		console.log("\nICE:\n" + ice);

		let xhr = new XMLHttpRequest();

		//not being used
		// function processrequest() {
		// 	console.log("\ninside process request\n");
		// 	if (xhr.readyState == 4 && xhr.status == 200) {
		// 		var response = JSON.parse(xhr.responseText);
		// 		res.end(response);
		// 	}

		// };
		// xhr.onreadystatechange = processrequest();

		let apiCall = JSON.stringify({
			VerificationCode: 1338,
			HostSDP: ice,
			RemoteSDP: "anything"
		});
		console.log("\nAPI CALL: \n")
		console.log((apiCall + "\n"));

		//xhr doesnt work
		xhr.open('post', 'https://aptimage.net/API/PostConnectionInfo.aspx');
		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xhr.send(apiCall);

		//xhr.addEventListener("readystatechange", processRequest, false);
		console.log("After send\n");

		// Send a POST request
		//things are being sent but it isn't being accepted?
		//maybe CORS issue? prob not
		//migt need to change IIS settings?
		//axios not working
		axios.post('https://aptimage.net/API/PostConnectionInfo.aspx',
			{
				VerificationCode: 1337,
				HostSDP: ice,
				RemoteSDP: 'anything'
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

	});
	// client.messages.create({
	// body: 'Hello from Node',
	// to: '+17867022444',  // Text this number
	// from: '+15203176334' // From a valid Twilio number
	// })
	// .then((message) => console.log(message.sid));
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});





// .then((message) => console.log(message.sid));
//   function after(){
//     document.getElementById('yourId').value = 'after'  
//     peer.on('signal', function (data) {
//       document.getElementById('yourId').value = JSON.stringify(data)
//     })
//     alert("done")
//     peer.on('data', function (data) {
//       document.getElementById('messages').textContent += data + '\n'
//     })
//   }
//   document.getElementById('connect').addEventListener('click', function () {
//     var otherId = JSON.parse(document.getElementById('otherId').value)
//     peer.signal(otherId)
//     alert("otherId:" + otherId)
//     after()
//   })

//   document.getElementById('send').addEventListener('click', function () {
//     var yourMessage = document.getElementById('yourMessage').value
//     peer.send(yourMessage)
//   })

//   if(location.hash == '#init'){
//     document.getElementById('yourId').value = 'if'
//     peer.on('signal', function (data) {
//       document.getElementById('yourId').value = JSON.stringify(data)
//     })
//   }



