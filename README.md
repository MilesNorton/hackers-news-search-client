# Local Instructions

1. npm run start
2. Go to `localhost:3000`

# Local Docker Instructions

1. npm run docker-local
2. Go to `localhost:8080` or `<docker machines IP>:8080`

# Webpack issue with docker install

There is an issue with a dependency for the webpack package.
I have added this section in the docker file as a temp. fix:

```
# issue with webpack at the moment
RUN npm uninstall ajv
RUN npm install ajv@6.8.1
```

# Other Important Information

npm version - 6.7.0
node version - 8.9.4
docker version 18.03.0-ce, build 052e24302
