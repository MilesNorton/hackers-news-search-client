FROM node:10.15.1-alpine
# set working directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/src
WORKDIR /usr/src/app

# Copy files in that are needed to build our source code
COPY tsconfig.json .
COPY package.json .
COPY src ./src/

# first install node dependencies, including dev dependencies
RUN npm install --production=false --silent
# build our code, this creates our traspiled javascript in the dist folder

# issue with webpack at the moment
# RUN npm uninstall ajv
# RUN npm install ajv@6.8.1
# RUN npm install react-scripts@0.9.5 -g --silent

RUN npm run build

# remove unneeded files
RUN npm run rimraf src tsconfig.json node_modules
# get just our dependencies needed in production
RUN npm install --production --silent
RUN rm package-lock.json && rm package.json

# issue with webpack at the moment
# RUN npm uninstall ajv
# RUN npm install ajv@6.8.1
# RUN npm install react-scripts@0.9.5 -g --silent

FROM node:10.15.1-alpine
# set working directory
WORKDIR /usr/app
# copy in our node_modules and our transpiled javascript
COPY --from=0 /usr/src/app/ .
# start app
CMD ["node", "./dist/index.js"]

# add `/usr/src/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
# ADD package.json /usr/src/app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@0.9.5 -g --silent

# issue with webpack at the moment
# RUN npm uninstall ajv
# RUN npm install ajv@6.8.1
# add app
# ADD . /usr/src/app
# start app
# CMD ["npm", "start"]