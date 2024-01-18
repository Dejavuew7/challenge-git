const http = require('http')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === '/') return respondHello(req, res)
  else if (req.url === '/base64/encode') return handleBase64Encode(req, res)
  else if (req.url === '/base64/decode') return handleBase64Decode(req, res)

  res.end()
})

function respondHello(req, res) {
  res.end(JSON.stringify({ msg: 'hello' }))
}

function handleBase64Encode(req, res) {
  let inputData = '';

  req.on('data', chunk => {
    inputData += chunk;
  });

  req.on('end', () => {
    const encodedData = Buffer.from(inputData).toString('base64');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ encodedData }));
  });
}

function handleBase64Decode(req, res) {
  const queryParams = new URLSearchParams(req.url.split('?')[1]);
  const encodedData = queryParams.get('data');

  const decodedData = Buffer.from(encodedData, 'base64').toString();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ decodedData }));
}

server.listen(PORT)
console.log(`Server listening on port ${PORT}`)