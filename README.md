# KLIA Landing Page

Landing page estática para el producto KLIA, desarrollada con Astro y configurada con Resend para la gestión de emails.

## 🚀 Características

- ✅ Diseño responsive con Tailwind CSS
- ✅ Navegación sticky con menú móvil
- ✅ Sección hero con logo y título prominente
- ✅ Información del producto con tarjetas destacadas
- ✅ Popup modal con formulario de contacto
- ✅ Integración con Resend para envío de emails
- ✅ Footer con información de contacto y enlaces
- ✅ Animaciones y transiciones suaves
- ✅ SEO optimizado

## 🛠️ Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` y configura las variables:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```env
# Resend API Key - Obtén una clave en https://resend.com/api-keys
RESEND_API_KEY=re_tu_clave_api_aqui

# Configuración de email
FROM_EMAIL=noreply@tudominio.com
TO_EMAIL=contact@tudominio.com
```

### 3. Configurar Resend

#### Para desarrollo (opción fácil):

Usa el dominio por defecto de Resend que no requiere verificación:

```env
FROM_EMAIL=onboarding@resend.dev
TO_EMAIL=tu-email@gmail.com
```

#### Para producción:

1. Crea una cuenta en [Resend](https://resend.com)
2. Ve a [Resend Domains](https://resend.com/domains) y añade tu dominio
3. Verifica tu dominio siguiendo las instrucciones de DNS
4. Genera una API key en [Resend API Keys](https://resend.com/api-keys)
5. Agrega la API key al archivo `.env`

```env
FROM_EMAIL=noreply@tudominio.com
TO_EMAIL=contact@tudominio.com
```

## 🚨 Solución de problemas

### Error: "domain is not verified"

Si recibes este error:

```
{
  error: {
    statusCode: 403,
    message: 'The klia.com domain is not verified. Please, add and verify your domain on https://resend.com/domains'
  }
}
```

**Solución para desarrollo:**
Usa el dominio por defecto de Resend en tu `.env`:

```env
FROM_EMAIL=onboarding@resend.dev
```

**Solución para producción:**

1. Ve a [Resend Domains](https://resend.com/domains)
2. Añade tu dominio
3. Configura los registros DNS requeridos
4. Espera a que se verifique (puede tomar hasta 48h)

### Otros errores comunes

- **API Key inválida**: Verifica que tu `RESEND_API_KEY` sea correcta
- **Email no válido**: Asegúrate de que el email destino sea válido
- **Rate limiting**: Resend tiene límites de envío en el plan gratuito

## 🚀 Desarrollo

### Modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

### Build para producción

```bash
npm run build
```

### Preview del build

```bash
npm run preview
```

## 📁 Estructura del proyecto

```
/
├── public/
│   ├── images/
│   │   └── klia-logo.svg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navigation.astro
│   │   ├── Hero.astro
│   │   ├── ProductInfo.astro
│   │   ├── ContactPopup.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   └── api/
│   │       └── contact.ts
│   └── env.d.ts
├── .env.example
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🎨 Personalización

### Colores

Los colores principales se pueden modificar en `tailwind.config.mjs`:

```js
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### Contenido

- **Hero**: Modifica `src/components/Hero.astro`
- **Información del producto**: Edita `src/components/ProductInfo.astro`
- **Footer**: Actualiza `src/components/Footer.astro`

### Logo

Reemplaza `public/images/klia-logo.svg` con tu propio logo.

## 📧 Configuración de emails

El formulario de contacto envía emails usando Resend. Los campos incluidos son:

- Nombre (obligatorio)
- Email (obligatorio)
- Empresa (opcional)
- Teléfono (opcional)
- Mensaje (obligatorio)
- Aceptación de privacidad (obligatorio)

### Template de email

El template del email se puede personalizar en `src/pages/api/contact.ts` en la variable `emailHtml`.

## 🔧 Tecnologías utilizadas

- **Astro** - Framework web estático
- **Tailwind CSS** - Framework de CSS
- **TypeScript** - Tipado estático
- **Resend** - Servicio de envío de emails

## 📝 Licencia

MIT License. Ver archivo LICENSE para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda, contacta con nosotros:

- Email: contact@klia.com
- Teléfono: +34 123 456 789
