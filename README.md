# Socketlog

A simple React Native application built on Expo that helps backend developers to easily test server side socket.io implementations. 🚀

![](https://github.com/andreciornavei/images/blob/master/socketlog/socketlog_presentation.gif?raw=true)

## Overview

This project was created with the purpose to improve a way to test socket.io technology implemented on server side. So developers can easily authenticate to the server over jwt, get the returned token and pass it over socket handshake to keep socket.io secure and associated to the user. Exposing all the socket events on app screen as a log to test if events is triggering.

---
## Technologies

This project was developed with the following technologies:

- [React Native][rn] - As a development technology. 
- [Expo][expo] - As a building platform. 
- [socket.io][socketio] - As a websocket communication.

---

## How to use

Basically to use this project, your server must to implement some patterns and it need to be mapped on socketlog `.env` file:

1 - A `jwt` authentication over API HTTP Request that returns a `jwt token`.

2 - A `jwt` verification on server socket.io when receive a new connection. 
```js
  const jsonwebtoken = require('jsonwebtoken');
  const io = require('socket.io')(server);
  io.on('connect', async function (socket) {
    try {
      const { jwt } = socket.handshake.query
      const payload = await jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
      socket.join("socketlog")     
      io.to("socketlog").emit("socketlog", "Hello World")    
    } catch (error) {
      socket.disconnect()
    }
  });
```

3 - Configure socketlog `.env` file to fit your environment
```txt
SERVER_URL=http://localhost
SERVER_PORT=1337
API_AUTH_ENDPOINT=/auth/local
API_AUTH_USER_FIELD=identifier
API_AUTH_PASS_FIELD=password
API_RESPONSE_JWT_FIELD="jwt"
```

---

## That's all, folks

I hope this project help you to save some time of server socket.io tests.

---

## License

[![License: MIT](https://img.shields.io/badge/license-MIT-purple.svg)](LICENSE)

Copyright (c) 2020 André Ciornavei

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



[rn]: https://reactnative.dev/
[expo]: https://expo.io/
[socketio]: https://socket.io/
