# Simulador Docker CLI (PHP)

Simulador interactivo de consola para terminal que replica las funcionalidades y el ciclo de vida básico de los contenedores de Docker en PHP.

---

## 👤 Autor

- **Estudiante / Desarrollador:** Cristofer Mendoza.

---

## Promts

- **Prompt 1** (Estructura Base y Bucle CLI)"Actúa como desarrollador senior. Escribe un script en PHP que mantenga un bucle interactivo de consola simulando 'docker'. Necesito una estructura de datos que almacene los contenedores creados con ID de 6 caracteres, Nombre, Imagen y Estado ('Up' o 'Exited'). Implementa los comandos 'run' y 'ps'."   
- **Prompt 2** (Gestión de Ciclo de Vida y Validaciones)"Agrega a la estructura previa en PHP los comandos 'stop', 'rm' (validando que arroje un mensaje de error si se intenta eliminar un contenedor activo en estado 'Up') y el comando 'logs'."

--

## 🚀 Instrucciones de Ejecución

1. Abrir la terminal de PowerShell en la raíz del proyecto (`C:\xampp\htdocs\simulador-docker-cli`).
2. Ejecutar la simulación utilizando el intérprete de PHP de XAMPP:
   ```powershell
   C:\xampp\php\php.exe simulador.php
