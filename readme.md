# Server Node + Express

- Servidor: HTTPServer Node
- Librería Express -> app

- Express Middleware

  - Cors
  - Multer
  - (Express.json)

  - app.get() .post() .patch() .delete()

  - middleware de errores (Error, Req, Resp, Next)

Todos los middleware funciones callback
Hasta 4 parámetros: (Error, Req, Resp, Next)

## Arquitectura

- servidor (infraestructura de red)
- aplicación

- router // router de cada feature
- controller + interceptors
- repository -> data

  - SQL DB
  - NoSQL DB
  - File System

- error handler
