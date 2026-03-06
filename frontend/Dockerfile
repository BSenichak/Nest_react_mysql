FROM node:22-alpine as dev

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

EXPOSE 5173


FROM node:22-alpine as prod

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

CMD ["npm", "run", "build"]
