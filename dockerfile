# Use a imagem base do Node.js
FROM node:20 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código do projeto
COPY . .

# Construa o projeto para produção
RUN npm run build

CMD ["npm", "start"]