# :computer: DEPORTURNOS

- **Trabajo Final de la Carrera Tecnicatura Universitaria en Desarrollo Web**

> Deporturnos es una plataforma de gestión de turnos para espacios deportivos. Está pensada para el alquiler de canchas de fútbol en sus diferentes modalidades (fútbol 5, fútbol 8 y fútbol 11), como así también de pádel.

> Permitirá a los diferentes Complejos crear una cuenta personal con la cual podrán administrar las canchas disponibles y el horario de los turnos en cada una de ellas, como así también los servicios adicionales que posean (parrilla, estacionamiento, buffet).

> A su vez, cada usuario que desee reservar un turno podrá usar una cuenta de Cliente que le permitirá seleccionar el espacio que se adapte a sus necesidades pudiendo comparar entre las distintas opciones disponibles en el momento.

> La plataforma pretende agilizar las transacciones de pago facilitando este proceso tanto al Cliente como al Complejo, evitando demoras en el transcurso de los turnos.

> El sistema proveerá estadísticas que permitan revisar visualmente aspectos importantes para los Complejos, como por ejemplo ganancias y demanda de turnos. También utilizará estos datos para agilizar la toma de turnos, recomendando al Cliente selecciones semejantes que haya hecho con anterioridad, recomendando complejos cercanos a su
ubicación o permitiéndoles observar el ranking de complejos más visitados.

## :office: Universidad Nacional del Comahue - Facultad de Informática

- **Carrera:** Tecnicatura Universitaria en Desarrollo Web
- **Materia:** Trabajo Final
- **Año:** 2024

## :muscle: Integrantes (Grupo X)

| Nombre                              |  Legajo    | Mail                                     | GitHub                                                      |
|:-----------------------------------:|:----------:|:----------------------------------------:|:-----------------------------------------------------------:|
| **Agüero Mendez, Guillermo Andres** | FAI-3844   | guillermo.aguero@est.fi.uncoma.edu.ar    | [guillermoagueronqn](https://github.com/guillermoagueronqn)|
| **Herrera, Julio Federico**         | FAI-4285   | julio.herrera@est.fi.uncoma.edu.ar       | [ELHACHESALTA](https://github.com/ELHACHESALTA)             |

## :wrench: Guía de instalación

1. Es necesario tener instalado [git](https://git-scm.com/download/win), [XAMPP](https://www.apachefriends.org/es/index.html), [Composer](https://getcomposer.org/) y [Node.js](https://nodejs.org/en)
2. Abrir el panel de XAMPP e iniciar el módulo Apache y MySQL, dándole al botón Start en ambos
3. Abrir una nueva terminal y clonar el repositorio ejecutando el comando: `git clone https://github.com/ELHACHESALTA/deporturnos.git`
4. Acceder a la carpeta del backend mediante el comando: `cd back_laravel`
5. Ejecutar el comando `composer install`, para instalar las dependencias necesarias de Composer
6. Crear una base de datos MySQL con nombre `back_laravel`
7. Ejecutar el comando `php artisan migrate:fresh --seed`, para crear las tablas necesarias para el proyecto en la base de datos
8. Ejecutar el comando `php artisan serve`, que inicia el servidor de desarrollo de Laravel
9. Abrir una nueva terminal y acceder a la carpeta del frontend mediante el comando: `cd front_react`
10. Ejecutar el comando `npm install`, para instalar las dependencias necesarias de Node.js
11. Ejecutar el comando `npm start`, que gestiona los script de Node.js, compilando el código e iniciando un servidor de desarrollo de React
12. Abrir el proyecto en un navegador desde la dirección [localhost:3000](http://localhost:3000/)
13. Se crean tres usuarios por defecto para facilitar el acceso y prueba de la aplicación:

        Usuario: admin@gmail.com
        Contraseña: Admin123

        Usuario: cliente@gmail.com
        Contraseña: Cliente123

        Usuario: gestor@gmail.com
        Contraseña: Gestor123