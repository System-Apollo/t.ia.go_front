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

# Use uma imagem base leve do Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
