FROM node:16-alpine
WORKDIR app
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .
EXPOSE 8080
CMD ["npm","run","start"]