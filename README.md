frontend/README.md

# Frontend - Angular

Este es el frontend de la aplicación de gestión de tareas, desarrollado con **Angular**.

---

## Requisitos

- Node.js (versión 16 o superior)
- Angular CLI (`npm install -g @angular/cli`)

---

## Configuración

1. Ve al directorio del frontend:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura el archivo `environment.ts` para apuntar al backend local o en la nube:

```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000'
};
```

4. Levanta la aplicación:

```bash
ng serve
```

La aplicación estará disponible en: http://localhost:4200

---

## Producción

1. Ajusta `environment.prod.ts`:

```ts
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://ryjmczy9qy.us-east-1.awsapprunner.com'
};
```

2. Genera el build:

```bash
ng build --prod
```

3. Sube el contenido de la carpeta `dist/` a tu bucket S3 o el servicio de tu elección.

---

## Tecnologías

- Angular
- TypeScript
- HTML + SCSS
- Comunicación con API REST (FastAPI)
