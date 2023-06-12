# nagwa-task

# Live Preview: https://placeofspeech.fly.dev/

a web game called "Guess the place of speech" where you get 10 random words and you have to guess it's place of speech.

**-Responive**

**-Auto deploy with Fly.io**

Done for Nagwa company as a interview task.

# Run Locally (dev)

Client
```
cd ClientApp
npm run dev
```

Server
```
cd server
npm run dev
```

then visit http://localhost:5173/

# Run with docker

```
docker build --no-cache --pull --rm -f "dockerfile" -t nagwatask:latest "."
```

Then make a container with the image with port 8080 open
then visit http://localhost:8080/
