# MY NOTES ON DEPLOYMENT

### For production environment

```java
if(production environment){
app.use(express.static(path.join(\_\_dirname, '/frontend/build')))

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )

}
```

GO to frontend and run which is not required because the heroku app will do it by itself.

```bash
  npm run build
```

Install homebrew via

```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Install heroku CLI via

```bash
  brew tap heroku/brew &&brew install heroku
```

create a file name {Procfile} and type

```js
  web: node backend/server.js
```

Go to package.json and put this line:-

```json
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
```

Create app using

```bash
  heroku create <app-name>
```

Type this line in CMD to deploy

```bash
  heroku git:remote -a <app-name>
  git push heroku master
```

Put the environment variables to make the website running.
