# Mapa de Navegación - ServiTech

## 1. Estructura General

El sitio web de ServiTech se divide en dos áreas principales:

1. **Área Pública**: Accesible para todos los usuarios
2. **Área de Administración**: Restringida para administradores del sistema

## 2. Área Pública

### 2.1 Páginas Principales

```
index.html (Landing Page) 
├── login.html (Inicio de sesión)
│   └── recuperar-password.html (Recuperación de contraseña)
├── registro.html (Registro de usuario nuevo)
├── feed.html (Timeline/Dashboard del usuario)
├── expertos.html (Catálogo de expertos)
│   └── confirmacion-asesoria.html (Confirmación de asesoría)
├── calendario.html (Calendario de citas/eventos)
├── mensajes.html (Sistema de mensajería)
├── pasarela-pagos.html (Procesamiento de pagos)
├── perfil.html (Perfil de usuario)
└── contacto.html (Formulario de contacto)
```

### 2.2 Páginas Legales

```
├── terminos.html (Términos y condiciones)
└── privacidad.html (Política de privacidad)
```

## 3. Área de Administración

### 3.1 Panel Principal

```
admin/admin.html (Dashboard administrativo)
├── admin-expertos.html (Gestión de expertos)
├── admin-usuarios.html (Gestión de usuarios)
├── admin-categorias.html (Gestión de categorías)
├── admin-publicaciones.html (Gestión de publicaciones)
├── admin-mensajes.html (Gestión de mensajes)
└── admin-configuracion.html (Configuraciones del sistema)
```

## 4. Diagrama de Flujo Principal

```
                                 ┌───────────────────┐
                                 │    index.html     │ (Landing Page)
                                 └─────────┬─────────┘
           ┌───────────────────────────────┼───────────────────────────┐
           │                               │                           │
  ┌────────▼─────────┐          ┌─────────▼────────┐        ┌─────────▼────────┐
  │   expertos.html  │          │    login.html    │        │   registro.html  │
  └────────┬─────────┘          └────────┬─────────┘        └─────────┬────────┘
           │                             │                            │
  ┌────────▼─────────┐          ┌────────▼─────────┐        ┌─────────▼────────┐
  │confirmacion-     │          │recuperar-        │        │                  │
  │asesoria.html     │          │password.html     │        │                  │
  └──────────────────┘          └──────────────────┘        │                  │
                                         │                  │                  │
                                         └──────────────────┼──────────────────┘
                                                           │
                                                    ┌──────▼───────┐
                                                    │  feed.html   │ (Dashboard)
                                                    └──────┬───────┘
                  ┌────────────────────────────────────────┼────────────────────────┐
                  │                                        │                        │
         ┌────────▼─────────┐                     ┌────────▼──────────┐    ┌───────▼──────────┐
         │calendario.html   │                     │    perfil.html    │    │  mensajes.html   │
         └──────────────────┘                     └──────────────────┬┘    └──────────────────┘
                                                                    │
                                                          ┌─────────▼─────────┐
                                                          │pasarela-pagos.html│
                                                          └───────────────────┘
```

## 5. Diagrama de Flujo del Panel de Administración

```
                              ┌───────────────────┐
                              │   admin.html      │ (Dashboard Admin)
                              └──────┬────────────┘
      ┌────────────┬────────────────┬─────────────┬─────────────┬────────────┐
      │            │                │             │             │            │
┌─────▼──────┐┌────▼─────┐┌─────────▼────┐┌───────▼─────┐┌──────▼─────┐┌─────▼────────┐
│admin-      ││admin-    ││admin-        ││admin-       ││admin-      ││admin-        │
│usuarios.html││expertos.html││categorias.html││mensajes.html││publicaciones.html││configuracion.html│
└────────────┘└──────────┘└──────────────┘└─────────────┘└────────────┘└──────────────┘
```
