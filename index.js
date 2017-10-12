const PORT = process.env.PORT || 8080,
	CLOCKWORK_SMS_KEY = '08a14c0a82174c63451b296ade317da3764014fe';
	
var clockwork = require('clockwork'),
	sms = clockwork({key: CLOCKWORK_SMS_KEY}),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.send('Whoo! This is it in dbms2final!');
})

app.post('/send', function(req, mainRes) {
	var receiver = req.body.number;
	var message = req.body.message;

	sms.sendSms({ 
			To: receiver,
			Content: message
		}, function(err, res) {
			if (err) {
				console.log(`Oops! ${err}`);
				mainRes.send(`Oops! ${err}`);
			} else {
				console.log('Sent successfully \n', res.responses[0]);
				mainRes.send(`The message was successfully sent to ${receiver} \n with the message of ${message}`);
			}
		}
	);
});

app.listen(PORT, function() {
	console.log(`Listening on ${PORT}`);
});