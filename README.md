Sobre el proyecto:
DigiGames es un e-commerce destinado a la venta de productos de gaming.
Orientado principalmente a las keys o claves digitales, pero que también cuenta con productos físicos como consolas, periféricos y juegos físicos.

Dependencias adicionales:
.Tailwind: Agrege tailwind por que queria aprender a utilizarlo.
.react-router-dom
.react-alers: agrege esta libreria de alertas para abstraerme del proceso de crearla yo mismo, queria ahorrar tiempo para dedicarselo a las otras funcionalidades.

Algunas decisiones que tome:
-Cree el componente RoutesDef para aislar la definicion de las rutas y poder tenerlas en un componente separado.
-Cree el componente NotFound que muestra un cartelito 404, lo puse en un inicio para poder reconocer algún error con las rutas y para indicarle al usuario que la ruta solicitada no existe.
-Cree los componentes DesktopNavBar y MobileNavBar que dependiendo del ancho de la pantalla se renderiza uno o el otro. Con el objetivo de mejorar el aspecto visual de la versión mobile
-El componentes FocusImg permite agrandar la imagen del producto haciendo click en ella desde el detalle.
-En el itemDetail agregue un botón con un icono de back que permite volver al catálogo que se estaba visualizando previamente.
-Mi tienda cuenta con una pseudocategoria en el navbar que es la de ofertas, que muestra todos los productos que tengan true en la propiedad discount en el product.json
