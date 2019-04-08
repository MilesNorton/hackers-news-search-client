# Local Instructions

1. npm install
2. npm run start
3. Go to `localhost:3000`

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

# Automatic deployment with Travis to ECR

## Layout

Code Change --> Github Push --> Travis CI --> AWS ECR --> AWS Pipeline --> Push to Containers

### Travis CI

This step involves testing, building and then deploying the image/s to AWS ECR.

The entry point for this is in the .travis.yml file.

1. We install python and nodejs (through nvm).
2. We specify the env variables we need. Please note our AWS security keys are env files but are stored on Travis as it is hidden and encrypted.
   2.1. DOCKER_REPO --> this is created in AWS ECR, it is the repository name you chose.
   2.2. EB_REGION --> this is the region to deploy to. This will be changed in the future as we use more than 1 region.
3. Cache the node_modules so it builds faster, travis will update modules that have changed.
4. Run the test job first.
5. Run the Deploy to ECR job
   5.1. Run script to instal the awscli through python.
   5.2. add path variables
   5.3. Run docker-local-build-travis from the packages, this will give the image the repo name.
   5.4. Run deploy.sh --> look at this file for comments
