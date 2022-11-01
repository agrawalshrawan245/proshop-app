# MY BACKEND NOTES

How to start

```bash
	express
	npm init
	-D nodemon concurrently
	for npm start -> scripct == start:"node backend/server"
```

Put these in package.json file

```json
	"server": "nodemon backend/server",
	"client": "npm start --prefix frontend",
	"dev": "concurrently \"npm run server\" \"npm run client\""
```

for env variables install --> npm i dotenv
put .env file and in backend write

```java
	const dotenv = require('dotenv')
	dotenv.config()
```

acces .env var using

```json
	const PORT = process.env.PORT || 5000 //example
```

Convert common js syntax to es module steps -> under name in package.json put (lec 16)

```json
	"type":"module",
	// ***Put .js with js files(products.js) while import
	// and also change the export syntax in that file.
```

Now to connect to the database use

```
	npm i mongoose
```

Use bcrypt js to encrypt passwords.

```
	npm i bcryptjs
```

to handle async use

```
	npm i express-async-handler
```

For image upload install multer

```
	npm i multer
```
