# Mapa de Navegación - ServiTech

Este documento presenta el mapa de navegación completo del proyecto ServiTech, mostrando las diferentes secciones y cómo se interrelacionan entre sí.

## 1. Estructura General

El proyecto ServiTech se divide en dos grandes secciones:

1. **Área Pública**: Accesible para todos los usuarios
2. **Área de Administración**: Restringida para administradores del sistema

## 2. Área Pública

### 2.1 Páginas Principales

```
index.html (Landing Page) 
├── feed.html (Inicio - Dashboard usuario)
├── expertos.html (Catálogo de expertos)
├── contacto.html (Formulario de contacto)
├── login.html (Inicio de sesión)
└── registro.html (Registro de usuario nuevo)
```

### 2.2 Páginas Legales y de Soporte

```
├── terminos.html (Términos y condiciones)
├── privacidad.html (Política de privacidad)
├── cookies.html (Política de cookies)
├── faq.html (Preguntas frecuentes)
├── guias.html (Guías de uso)
└── testimonios.html (Testimonios de usuarios)
```

### 2.3 Páginas Corporativas

```
├── nosotros.html (Sobre nosotros)
├── empleo.html (Oportunidades de trabajo)
└── blog.html (Blog corporativo)
```

### 2.4 Flujo de Recuperación de Contraseña

```
login.html
└── recuperar-password.html
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

### 3.2 Configuraciones del Sistema

```
admin-configuracion.html
├── General
├── Apariencia
├── Correo Electrónico
├── Integraciones
└── Seguridad
```

## 4. Diagrama de Flujo Principal

```
                         ┌───────────────────┐
                         │      index.html   │ (Landing Page)
                         └────────┬──────────┘
         ┌────────────────────────┼──────────────────────┐
         │                        │                      │
┌────────▼─────────┐     ┌────────▼─────────┐    ┌──────▼──────────┐
│   expertos.html  │     │     feed.html    │    │   registro.html │
└──────────────────┘     │  (Dashboard)     │    │                 │
                         └────────┬─────────┘    └────────┬────────┘
                                  │                       │
                                  │                       │
                         ┌────────▼─────────┐    ┌────────▼────────┐
                         │  contacto.html   │    │    login.html   │
                         └──────────────────┘    └────────┬────────┘
                                                          │
                                                ┌─────────▼────────────┐
                                                │recuperar-password.html│
                                                └──────────────────────┘
```

## 5. Diagrama de Flujo del Panel de Administración

```
                         ┌───────────────────┐
                         │    admin.html     │ (Dashboard Admin)
                         └────────┬──────────┘
         ┌────────────────────────┼───────────────────────┐
         │                        │                       │
┌────────▼─────────┐     ┌────────▼─────────┐    ┌───────▼───────────┐
│admin-expertos.html│    │admin-usuarios.html│   │admin-categorias.html│
└──────────────────┘     └──────────────────┘    └──────────────────┘
         │                        │                       │
         │                        │                       │
┌────────▼─────────┐     ┌────────▼─────────┐    ┌───────▼───────────┐
│admin-mensajes.html│    │admin-publicaciones│   │admin-configuracion│
└──────────────────┘     └──────────────────┘    └──────────────────┘
```

## 6. Acceso y Permisos

| Tipo de Usuario | Área Pública | Panel Admin | Gestión Expertos | Gestión Usuarios | Configuración |
|-----------------|--------------|-------------|------------------|------------------|---------------|
| Visitante       | ✓            | ✘           | ✘                | ✘                | ✘             |
| Usuario         | ✓            | ✘           | ✘                | ✘                | ✘             |
| Experto         | ✓            | ✘           | ✘                | ✘                | ✘             |
| Administrador   | ✓            | ✓           | ✓                | ✓                | ✓             |

## 7. Enlaces en Footer (Comunes en todas las páginas)

### 7.1 Empresa
- Sobre nosotros (nosotros.html)
- Carreras (empleo.html)
- Blog (blog.html)

### 7.2 Recursos
- Centro de ayuda (faq.html)
- Guías (guias.html)
- Testimonios (testimonios.html)

### 7.3 Legal
- Términos de servicio (terminos.html)
- Política de privacidad (privacidad.html)
- Cookies (cookies.html)

---

*Fecha de actualización: Mayo 4, 2025*