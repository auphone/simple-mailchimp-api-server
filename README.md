A simple API server for email subscription with MailChimp

## Installation

```sh
cd ./simple-mailchimp-api-server
npm i
node .
```

## Configuration
Change the MailChimp config inside index.js
``` js
const config = {
  dc: '<dc>',
  apiKey: '<your-api-key>',
  listId: '<your-list-id>'
};
``` 

## Basic Usage
### curl
``` sh
curl -d "email=xxx@example.com" -X POST localhost:3000/subscribe
```

### HTML + JS
``` html
<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
  <form onsubmit="subscribe()">
    <input id="sub-email" type="email" required>
    <button type="submit">Subscribe</button>
  </form>
  <script>
    function subcribe() {
      const email = document.getElementById('sub-email').value;
      const data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email })
      };
      fetch('http://localhost:3000/subscribe', data).then(() => {
        // Do Something here
      });
      return false;
    }
  </script>
</body>
</html>
```

## License
ISC

## Author
[github/auphone](https://github.com/auphone)
