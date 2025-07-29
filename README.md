# Task Management Frontend – Angular (S3 Static Hosting)

Este es el frontend de la aplicación de gestión de tareas construido con Angular y desplegado como sitio estático en AWS S3.

## Sitio en vivo

http://test-dish-fe.s3-website-us-east-1.amazonaws.com/

## Funcionalidades

- Inicio de sesión y registro
- Crear, editar, eliminar y listar tareas
- Autenticación con token
- Consumo del API Gateway
- Diseño responsive

## Tecnologías

- Angular 17+
- Standalone Components
- AWS S3 Static Hosting
- AWS API Gateway

## Conexión a API

En el archivo `environment.prod.ts`, configura:

```ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://g6wpg9ox8i.execute-api.us-east-1.amazonaws.com/dev'
};
