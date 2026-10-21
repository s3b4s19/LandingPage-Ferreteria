# Ferretería Central — Landing page corporativa

Landing page responsive para una ferretería industrial. Presenta promociones de temporada, catálogo de productos, servicios corporativos y canales de atención para cotizaciones.

Proyecto de portafolio. La marca, los productos, los precios y los datos de contacto son ficticios.

## Características

- Diseño mobile-first con HTML5 semántico y CSS3 nativo.
- Metodología BEM y custom properties para la identidad visual.
- Carrusel de promociones con controles accesibles y navegación por teclado.
- Catálogo de productos con tarjetas, precios y llamados a cotizar.
- Sección de servicios corporativos y franja de contacto.
- Menú móvil, navegación por anclas y animaciones de entrada.
- Enlaces de correo y teléfono listos para personalizar.

## Stack

- HTML5 semántico.
- CSS3 nativo, mobile-first y BEM.
- JavaScript vanilla sin dependencias.
- Imágenes de Unsplash como recursos de presentación.

## Estructura

```
.
├── index.html
├── css
│   └── style.css
├── js
│   └── main.js
└── README.md
```

## Ejecución local

No requiere instalación de dependencias. Puedes abrir `index.html` directamente o servirlo con cualquier servidor estático:

```bash
python -m http.server 3000
```

Luego abre `http://localhost:3000`.

## Cotizaciones

Los botones de cotización llevan a la sección de contacto. No hay un formulario conectado a un backend ni se envían datos. Para un flujo real hay que definir el endpoint, la validación del servidor, el límite de envíos y el tratamiento de datos personales.

## Seguridad y privacidad

- No contiene credenciales, tokens ni claves de API.
- No incluye backend ni base de datos.
- Los datos de contacto, productos y precios son ficticios.
- Las imágenes externas se cargan por HTTPS.
- Si se conecta una cotización real, se debe validar y limitar en el servidor.

## Licencia

Copyright (c) 2026 Sebastián Sánchez. Todos los derechos reservados.

Repositorio publicado con fines de portafolio y demostración. Para usos comerciales o colaboraciones, contactar al autor.
