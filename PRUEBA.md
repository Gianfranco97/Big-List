### Hola, muy buenos días.

Les cuento un poco de mi retrospectiva y  mi experiencia al realizar la prueba. Así les digo un poco como fue y aprovecho a disculparme de antemano por alguna cosa que todavía no está como me gustaría.

El camino que tomé fue el de recurrir a ant design como librería base de componentes visuales, less como preprocesador de css (inicialmente lo hice con sass, pero como ant para cambiar los colores se necesita hacerlo con less lo cambie para tenerlo todo unificado), eslint con la configuración de airbnb, use “json-server” para crear un mini backend para que el código fuera lo más parecido posible a un funcionamiento en un entorno real, y me tomé la libertad de agregar extra a la prueba un módulo de login. 

En cuanto al tema de las pruebas automáticas, use cypress para testear la web y jest para las pruebas unitarias. Son pruebas muy sencillas que lo único que hacen es en el caso de cypress es darle una vuelta por toda la app probando más o menos todo y en el jest son pruebas que lo único hacen es ver que no este roto componente. Se podría decir que esta parte fue la de **mayor dificultad** para mí, estoy muy oxidado en el testing, hace muchisimo que no lo tocaba. Es un mundo lindo que desde hace tiempo quería retomar. Me encantaría tener muchos más tests y que estén mucho mejores, me hace falta más lectura y práctica.

### Para correr el proyecto: 

> **Lo primero que hay que hacer** antes de ejecutar el proyecto o los test End-to-end es montar el fake-server en una consola aparte:  `yarn fake-server`

#### Para ejecutar el localhost: 
- `yarn start
`

#### Tests Unitarios: 
- `yarn test`

#### Tests End-to-end: 

> Para ejecutar estos tests primero en necesario tener corriendo en otras consolas el fake-server y el localhost  en el puerto 3000

Existen dos maneras de ejecución:
- `yarn test:cypress`
- `yarn test:cypress:open`

Que tengan un buen comienzo de semana 👋