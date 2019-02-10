FROM node:10.15.1-alpine
# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# install and cache app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@0.9.5 -g --silent

# issue with webpack at the moment
RUN npm uninstall ajv
RUN npm install ajv@6.8.1
# add app
ADD . /usr/src/app
# start app
CMD ["npm", "start"]