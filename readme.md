# Simulador Docker CLI (PHP)

Simulador interactivo de consola para terminal que replica las funcionalidades y el ciclo de vida básico de los contenedores de Docker en PHP.

---

## 👤 Autor

- **Estudiante / Desarrollador:** Cristofer Mendoza.

---

## Promts

- **Prompt 1** (Estructura Base y Bucle CLI)"Actúa como desarrollador senior. Escribe un script en PHP que mantenga un bucle interactivo de consola simulando 'docker'. Necesito una estructura de datos que almacene los contenedores creados con ID de 6 caracteres, Nombre, Imagen y Estado ('Up' o 'Exited'). Implementa los comandos 'run' y 'ps'."   
- **Prompt 2** (Gestión de Ciclo de Vida y Validaciones)"Agrega a la estructura previa en PHP los comandos 'stop', 'rm' (validando que arroje un mensaje de error si se intenta eliminar un contenedor activo en estado 'Up') y el comando 'logs'."

---

## 🚀 Instrucciones de Ejecución

1. Abrir la terminal de PowerShell en la raíz del proyecto (`C:\xampp\htdocs\simulador-docker-cli`).
2. Ejecutar la simulación utilizando el intérprete de PHP de XAMPP:
   ```powershell
   C:\xampp\php\php.exe simulador.php

##  Flujo de Trabajo y Comandos del Simulador (`docker-sim`)

### 1. Descargar una imagen (`docker pull`)
```bash
docker-sim> docker pull nginx
```
* **Qué hace:** Procesa la orden de descarga y la almacena en la estructura de imágenes disponibles.
* **Resultado:** Imprime en pantalla la descarga por capas con un Hash SHA-256 simulado.

---

### 2. Ejecutar un contenedor (`docker run`)
```bash
docker-sim> docker run -p 8080:80 nginx
```
* **Qué hace:** Instancia un contenedor con el mapeo de puertos y la imagen especificada.
* **Resultado:** Genera un `CONTAINER ID` único de 6 caracteres (ejemplo: `a1b2c3`) en estado `Up`.

---

### 3. Listar contenedores activos (`docker ps`)
```bash
docker-sim> docker ps
```
* **Qué hace:** Filtra la memoria local buscando los servicios en ejecución.
* **Resultado:** Imprime la tabla con el ID, la imagen, el estado `Up`, los puertos mapeados y el nombre asignado.

---

### 4. Consultar registros del servidor (`docker logs`)
```bash
docker-sim> docker logs [ID_O_NOMBRE]
```
* **Qué hace:** Busca el contenedor por su ID o Nombre y recupera la traza de actividad.
* **Resultado:** Muestra eventos simulados del servidor (ejemplo: `[INFO] Server started on port...`).

---

### 5. Validar regla de protección al borrar (`docker rm`)
```bash
docker-sim> docker rm [ID_O_NOMBRE]
```
* **Qué hace:** Intenta eliminar el contenedor comprobando previamente su estado actual.
* **Resultado:** Arroja el mensaje de error: `Error: Debe detener el contenedor antes de eliminarlo (Estado: Up)`.

---

### 6. Detener el contenedor (`docker stop`)
```bash
docker-sim> docker stop [ID_O_NOMBRE]
```
* **Qué hace:** Procesa la solicitud de apagado del servicio seleccionado.
* **Resultado:** Cambia la propiedad de estado a `Exited (0)` y confirma la detención en consola.

---

### 7. Consultar contenedores detenidos (`docker ps -a`)
```bash
docker-sim> docker ps -a
```
* **Qué hace:** Despliega todos los registros ignorando el filtro de contenedores activos.
* **Resultado:** Muestra la lista completa incluyendo los contenedores con estado `Exited (0)`.

---

### 8. Eliminar el contenedor detenido (`docker rm`)
```bash
docker-sim> docker rm [ID_O_NOMBRE]
```
* **Qué hace:** Remueve definitivamente el contenedor detenido de la memoria.
* **Resultado:** Elimina el registro de la memoria e informa que fue removido con éxito.

---

### 9. Salir del simulador (`exit`)
```bash
docker-sim> exit
```
* **Qué hace:** Rompe el bucle interactivo del script.
* **Resultado:** Cierra la simulación y regresa al prompt estándar de la consola (ej. PowerShell).
