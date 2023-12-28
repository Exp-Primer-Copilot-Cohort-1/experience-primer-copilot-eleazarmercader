// create web server
// 1. load modules
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// 2. create server
const server = http.createServer(function(request, response){
  const parsedUrl = url.parse(request.url);
  const resource = parsedUrl.pathname;
  const query = parsedUrl.query;
  const method = request.method;
  console.log("resource=", resource);
  console.log("method=", method);
  console.log("query=", query);

  if (method === 'GET'){
    if (resource === '/'){
      fs.readFile('./index.html', 'utf-8', function(error, data){
        if (error){
          response.writeHead(500, {'Content-Type':'text/html'});
          response.end('500 Internal Server Error : ' + error);
        } else {
          response.writeHead(200, {'Content-Type':'text/html'});
          response.end(data);
        }
      });
    } else if (resource === '/comments'){
      fs.readFile('./comments.json', 'utf-8', function(error, data){
        if (error){
          response.writeHead(500, {'Content-Type':'text/html'});
          response.end('500 Internal Server Error : ' + error);
        } else {
          response.writeHead(200, {'Content-Type':'application/json'});
          response.end(data);
        }
      });
    } else {
      response.writeHead(404, {'Content-Type':'text/html'});
      response.end('404 Page Not Found');
    }
  } else if (method === 'POST'){
    if (resource === '/comments'){
      let body = "";
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        let comment = qs.parse(body);
        console.log("comment=", comment);
        response.writeHead(200, {'Content-Type':'text/html'});
        response.end(JSON.stringify(comment));
      });
    } else {
      response.writeHead(404, {'Content-Type':'text/html'});
      response.end('404 Page Not Found');
    }
  } else {
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end('404 Page Not Found');
  }
});

// 3. execute server
server.listen(8080, function(){
  console.log('Server is running...');
});