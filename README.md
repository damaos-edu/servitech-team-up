# SERVITECH-TEAM-UP

**Servitech-Team-Up** es una plataforma web que conecta expertos en informática con usuarios que necesitan asesoría técnica.

---

## 📂 Estructura del proyecto
SERVITECH-TEAM-UP/
│
├── index.html # Landing page pública
├── feed.html # Buscador de expertos con filtros y publicaciones 
├── expertos.html # Listado de perfiles de expertos
├── contacto.html # Formulario de contacto
├── mensajes.html # Bandeja de mensajes de usuario
├── calendario.html # Vista de calendario de asesorías
├── pasarela-pagos.html # Pasarela de pago simulada
├── login.html # Pantalla de inicio de sesión
├── registro.html # Registro de nuevos usuarios
├── recuperar-password.html# Recuperación de contraseña
├── confirmacion-asesoria.html # Confirmación de sesión agendada
├── privacidad.html # Política de privacidad
├── terminos.html # Términos de servicio
├── mapa-navegacion.md # Guía rápida de rutas URL
│
├── admin/ # Panel de administración
│ ├── admin.html # Dashboard general
│ ├── admin-categorias.html
│ ├── admin-configuracion.html
│ ├── admin-expertos.html
│ ├── admin-mensajes.html
│ ├── admin-publicaciones.html
│ └── admin-usuarios.html
│
├── assets/
│ ├── css/
│ │ ├── base.css # Variables globales y reset
│ │ ├── landing-page.css # Estilos de index.html
│ │ ├── feed.css # Estilos de feed.html
│ │ ├── experts.css # expertos.html
│ │ ├── contacto.css # contacto.html
│ │ ├── mensajes.css # mensajes.html
│ │ ├── calendario.css # calendario.html
│ │ ├── pasarela-pagos.css # pasarela-pagos.html
│ │ ├── auth.css # login, registro, recuperar-password
│ │ ├── components.css # header, footer, nav comunes
│ │ └── admin-*.css # Cada sección admin
│ │
│ ├── js/
│ │ ├── index.js # Lógica de landing
│ │ ├── feed.js # Filtros y lógica feed
│ │ ├── expertos.js # Perfil de expertos
│ │ ├── contacto.js
│ │ ├── mensajes.js
│ │ ├── calendario.js
│ │ ├── pasarela-pagos.js
│ │ ├── auth.js # login/registro/recuperar
│ │ ├── common.js/ # loaders de header, footer, navbar-admin
│ │ └── admin-*.js # Scripts de admin
│ │
│ └── img/ # Todos los logos e íconos
│
└── README.md # Este documento

---

## 🎯 Descripción rápida

- **Principal (index.html)**  
  Presenta la plataforma y CTA para registrarse o iniciar sesión.

- **Inicio (feed.html)**  
  Buscador de expertos por especialidad, precio, disponibilidad y valoración.

- **Expertos (experts.html)**  
  Muestra detalles de cada experto y botón de contacto.

- **Contacto, Mensajes, Calendario, Pasarela de Pago**  
  Funcionalidades de usuario: envío de mensajes, agendar sesión y simular pago.

- **Iniciar sesión / Registro / Recuperar contraseña**  
  Páginas de autentificación de usuario (simuladas en front-end).

- **Panel Admin (carpeta `admin/`)**  
  CRUD de:
  - Categorías  
  - Configuraciones  
  - Expertos  
  - Mensajes  
  - Publicaciones  
  - Usuarios  
  + Dashboard general

- **Componentes comunes**  
  - `header.html`, `footer.html`, `navbar-admin.html`  
  - Cargados dinámicamente vía JavaScript para evitar duplicar código.

---

## ⚙️ Cómo ejecutar

1. Clona este repositorio.
2. Abre cualquiera de los `.html` en tu navegador moderno.
3. No requiere servidor; funciona con archivos estáticos.

---

## 🔑 Credenciales de prueba
- Roles

Administrador:
- **Correo como administrador:** `admin@servitech.com`  
- **Contraseña:** `Admin123$`

Usuario:
- **Correo como usuario:** `usuario@ejemplo.com`  
- **Contraseña:** `Usuario123$`

> Estas credenciales son **solo** para demo en front-end. En un entorno real, usa un backend seguro.

---

## 💡 Notas importantes

- **Responsive**: Todo el CSS está preparado para móviles, tablets y desktop.  
- **Variables CSS**: Centralizadas en `base.css` para colores, fuentes y tamaños.  
- **Flexbox & Grid**: Se usan para layouts (sidebar + contenido, sticky footer).  
- **Modularidad**: Cada HTML tiene su propio CSS/JS, más componentes comunes.

---



