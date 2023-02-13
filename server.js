// importing http module
const http = require('http'),
    
// url parses the typed url, fs returns the appropriate file as a response, importing fs and url modules below.
fs = require('fs'),
url = require('url');

http.createServer((request, response) => {
// request.url for user generated urls instead of static.
    let addr = request.url,
        
// q is where parsed url is stored
    q = url.parse(addr, true),
    filePath = '';
    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
    }

// filePath is /documentation.html
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
      }
      
 // telling server to add a header to the response (200) it sends back, 200 = ok
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });
    
// telling the server to listen for requests on port 8080
}).listen(8080);
console.log('Test server is running on Port 8080.');