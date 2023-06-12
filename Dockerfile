FROM node:lts
EXPOSE 8080

WORKDIR /root
COPY ./ ./

WORKDIR /root/ClientApp
RUN npm install
RUN rm -rf .env
RUN npm run build

WORKDIR /root/Server
RUN npm install
CMD npm start
