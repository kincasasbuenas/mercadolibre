# MeLi - Test
Desarrollo de prueba fullstack React - Node

## Tecnologías
Frontend:
- ReactJS (v18.2.0)
- Sass
- HTML

Backend:
- NodeJS (v16.14.0)
- ExpressJS

### Instalación y despliegue
Backend:
```
cd backend
npm install
npm start
```
Frontend:
```
cd frontend
npm install
npm start
```
##### Nota
El servidor corre por defecto en `localhost:3003`, en modo "dev" (desarrollo) y espera que el cliente corra en `localhost:3000`, que a su vez es la IP y puerto usados por el cliente por defecto.

Si el puerto esta siendo usado entonces es necesario hacer cambios para ejecutar los proyectos deben hacerse sobre el archivo ".env" para el (backend).

**Importante:** si se cambia la IP y puerto del servidor es necesario modificar manualmente la constante usada por el cliente (en el frontend)  para conectarse correctamente. Esto se hace modificando la constante `const API_MELI = "http://localhost:3003";` en el archivo "frontend/src/services/index.js".

---
Developer: Kevin Casasbuenas.
