var clockwork = require('clockwork'),
	sms = clockwork({key: '99a44fac5d40c67baadc979e36e6aafafc11b2cc'}),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(3000, function() {
	console.log('Listening on port 3000');
});