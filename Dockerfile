# Usa una imagen base de Node.js
FROM node:18

ENV NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/oberon360api/api/
ENV NEXT_PUBLIC_API_WEB_URL=http://localhost:3001/oberon360web/api/
ENV NEXT_PUBLIC_API_IC_URL=http://localhost:3003/oberon360ic/api/
ENV NODE_ENV=production
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyCY_qJm1wsuvs4UKuxU_cGKV0j2gHl0KeI
ENV NEXT_PUBLIC_JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIiwiYXZhdGFyIjpudWxsLCJyb2xlIjoiQWRtaW5pc3RyYWRvciIsImxpY2Vuc2VfaWQiOjEsImlhdCI6MTY5ODg1Njg1MSwiZXhwIjoxNjk4ODkyODUxfQ.n87SNBViKIe7bAMiANCZ_UyeukDWaJCl_Yv2MLGej1E
# Establece el directorio de trabajo
WORKDIR /usr/src/app

# imprime el directorio de trabajo
RUN pwd

# Copia los archivos del proyecto al contenedor
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias del proyecto
RUN npm install


# Copia el resto de los archivos al contenedor
COPY . .

# Compilar aplicación
RUN npm run build
EXPOSE 8000
# Inicia tu aplicación
CMD ["npm", "start", "-p", "8000"]