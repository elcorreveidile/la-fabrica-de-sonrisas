# La Fábrica de Sonrisas — Demo Web

Demo de propuesta comercial para clínica dental en Granada. Desarrollado por **Por 2 Duros**.

> ⚠️ **Este sitio es una demo no oficial.** `noindex, nofollow` activo en todas las páginas. Ver banner en el pie de página.

---

## Stack

- **Next.js 16 (App Router)** + TypeScript + Tailwind CSS v4
- **Supabase** — base de datos de tratamientos, leads y autenticación admin
- **Vercel** — despliegue

---

## Instalación local

```bash
git clone https://github.com/elcorreveidile/la-fabrica-de-sonrisas.git
cd la-fabrica-de-sonrisas
npm install
cp .env.local.example .env.local
# Edita .env.local con tus credenciales de Supabase
npm run dev
```

---

## Variables de entorno

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
SUPABASE_SERVICE_ROLE_KEY=tu-clave-service-role

NEXT_PUBLIC_WHATSAPP_NUMBER=34958000000
NEXT_PUBLIC_SITE_URL=https://fabricadesonrisas-demo.vercel.app
```

---

## Semilla de base de datos (Supabase)

1. Ve a **Supabase Dashboard → SQL Editor**
2. Ejecuta el contenido de `supabase/seed.sql`
3. El seed crea las tablas, las políticas RLS y siembra ~18 tratamientos en 7 categorías + el wizard completo del presupuestador

---

## Usuario admin demo

| Campo | Valor |
|-------|-------|
| Email | `admin@fabricasonrisas.es` |
| Contraseña | `FabricaDemo2024` |

Crea este usuario en **Supabase Dashboard → Authentication → Users → Invite user**.

---

## Estructura de páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home — hero, accesos rápidos, testimonios, filosofía, mapa |
| `/tratamientos` | Catálogo filtrable por categoría |
| `/tratamientos/[slug]` | Ficha de cada tratamiento con FAQ |
| `/presupuestador` | Wizard interactivo (funcionalidad estrella) |
| `/equipo` | Dra. Hunayda + equipo + filosofía |
| `/cita` | Formulario de solicitud de cita |
| `/contacto` | Datos + mapa + formulario |
| `/legal/*` | Privacidad, aviso legal, cookies |
| `/admin` | Panel privado (Supabase Auth) |

---

## ✅ Checklist de paso a producción

Antes de lanzar la web real de la clínica:

- [ ] Quitar `noindex, nofollow` de `src/app/layout.tsx` y `robots.txt`
- [ ] Eliminar el banner de demo (`DemoBanner.tsx`)
- [ ] Sustituir el teléfono placeholder (`958 XXX XXX`) por el real
- [ ] Verificar horario de apertura
- [ ] Reemplazar fotos de stock por fotografías reales de la clínica
- [ ] Actualizar número de WhatsApp en variable de entorno
- [ ] Revisar y validar legalmente los textos de privacidad, aviso legal y cookies
- [ ] Configurar dominio propio en Vercel
- [ ] Cambiar credenciales de admin demo
- [ ] Revisar si los precios deben marcarse como `es_precio_real = true`
- [ ] Activar protección de las políticas RLS en Supabase (ya está configurada)
- [ ] Añadir Google Analytics o Plausible (si la clínica lo desea)

---

## Funcionalidades previstas para v2 (upsell)

- 📅 Calendario de reservas online con confirmación automática por email
- 🌐 Versión en inglés (hay muchos residentes internacionales en el Realejo)
- 💳 Pago y señal de cita online
- 📲 Notificaciones WhatsApp Business API

---

## Notas legales de la demo

- Ninguna fotografía, logotipo ni texto ha sido reproducido de la web actual de la clínica
- Los precios son orientativos de mercado (`es_precio_real = false`) y se muestran siempre con esa etiqueta
- El formulario guarda leads en tabla `demo = true`, purgable en cualquier momento
- El nombre "La Fábrica de Sonrisas" y la dirección son datos públicos verificables

---

*Demo desarrollada por [Por 2 Duros](https://por2duros.com)*
