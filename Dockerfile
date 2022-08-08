FROM node
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN npm install;
RUN npm install -g ts-node-dev;

COPY . ./
ENV PORT 4000
EXPOSE $PORT
CMD [ "npm", "run", "dev" ]