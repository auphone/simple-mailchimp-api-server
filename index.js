const rp = require('request-promise');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Change to your MailChimp config
const config = {
  dc: '<dc>',
  apiKey: '<your-api-key>',
  listId: '<your-list-id>'
};

// Express
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API
app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).send('Missing Parameter: email');
  }
  rp({
    method: 'POST',
    uri: `https://${config.dc}.api.mailchimp.com/3.0/lists/${
      config.listId
    }/members`,
    headers: {
      Authorization: `Basic ${new Buffer(`anystring:${config.apiKey}`).toString(
        'base64'
      )}`
    },
    body: {
      email_address: email,
      status: 'subscribed'
    },
    json: true
  })
    .then(result => {
      res.send('OK');
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(config.port || 3000, () => {
  console.log('server started');
});
