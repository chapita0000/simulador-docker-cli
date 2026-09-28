<?php
$images = [];
$containers = [];

echo "===========================================\n";
echo " Simulador de Docker CLI (PHP / XAMPP)\n";
echo " Escribe 'exit' o 'quit' para salir.\n";
echo "===========================================\n\n";

while (true) {
    $line = readline("docker-sim> ");
    if ($line === false) break;
    $input = trim($line);
    if ($input === "exit" || $input === "quit") break;
    if (empty($input)) continue;

    $parts = explode(" ", $input);
    if ($parts[0] !== "docker") {
        echo "Error: Los comandos deben iniciar con 'docker'.\n";
        continue;
    }

    $action = $parts[1] ?? '';

    switch ($action) {
        case 'pull':
            $img = $parts[2] ?? null;
            if (!$img) {
                echo "Error: Debe especificar una imagen. Ej: docker pull nginx\n";
                break;
            }
            echo "Downloading... Digest: sha256:" . md5($img) . " Status: Downloaded\n";
            $images[$img] = true;
            break;

        case 'run':
            $ports = "N/A";
            $imagen = "";
            $name = "container_" . rand(100, 999);

            for ($i = 2; $i < count($parts); $i++) {
                if ($parts[$i] === '-p' && isset($parts[$i+1])) {
                    $ports = $parts[$i+1];
                    $i++;
                } elseif ($parts[$i] === '-v' && isset($parts[$i+1])) {
                    $i++;
                } elseif (strpos($parts[$i], '-') !== 0) {
                    $imagen = $parts[$i];
                }
            }

            if (!$imagen) {
                echo "Error: Debe especificar la imagen a ejecutar.\n";
                break;
            }

            $id = substr(md5(uniqid()), 0, 6);
            $containers[$id] = [
                'id' => $id,
                'image' => $imagen,
                'status' => 'Up',
                'ports' => $ports,
                'name' => $name
            ];
            echo "Contenedor iniciado con ID: $id\n";
            break;

        case 'ps':
            $showAll = isset($parts[2]) && $parts[2] === '-a';
            printf("%-12s %-15s %-15s %-15s %-15s\n", "CONTAINER ID", "IMAGE", "STATUS", "PORTS", "NAMES");
            foreach ($containers as $c) {
                if (!$showAll && $c['status'] !== 'Up') {
                    continue;
                }
                printf("%-12s %-15s %-15s %-15s %-15s\n", $c['id'], $c['image'], $c['status'], $c['ports'], $c['name']);
            }
            break;

        case 'stop':
            $target = $parts[2] ?? null;
            $found = false;
            foreach ($containers as &$c) {
                if ($c['id'] === $target || $c['name'] === $target) {
                    $c['status'] = 'Exited (0)';
                    echo $c['name'] . " detenido.\n";
                    $found = true;
                    break;
                }
            }
            if (!$found) echo "Error: No existe el contenedor '$target'.\n";
            break;

        case 'rm':
            $target = $parts[2] ?? null;
            $foundKey = null;
            foreach ($containers as $id => $c) {
                if ($c['id'] === $target || $c['name'] === $target) {
                    if ($c['status'] === 'Up') {
                        echo "Error: Debe detener el contenedor antes de eliminarlo (Estado: Up).\n";
                        $foundKey = true;
                        break;
                    } else {
                        $foundKey = $id;
                        break;
                    }
                }
            }
            if ($foundKey === null) {
                echo "Error: No existe el contenedor '$target'.\n";
            } elseif ($foundKey !== true) {
                unset($containers[$foundKey]);
                echo "Contenedor $target eliminado.\n";
            }
            break;

        case 'logs':
            $target = $parts[2] ?? null;
            $found = false;
            foreach ($containers as $c) {
                if ($c['id'] === $target || $c['name'] === $target) {
                    echo "[INFO] Server started on port {$c['ports']}... [GET] /index.html 200 OK\n";
                    $found = true;
                    break;
                }
            }
            if (!$found) echo "Error: No existe el contenedor '$target'.\n";
            break;

        default:
            echo "Comando no soportado en la simulación.\n";
            break;
    }
}