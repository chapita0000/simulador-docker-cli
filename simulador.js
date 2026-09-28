const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const images = {};
const containers = {};

console.log("===========================================");
console.log(" Simulador de Docker CLI (JavaScript/Node.js)");
console.log(" Escribe 'exit' o 'quit' para salir.");
console.log("===========================================\n");

function promptUser() {
    rl.question('docker-sim> ', (input) => {
        const cleanInput = input.trim();
        
        if (cleanInput === 'exit' || cleanInput === 'quit') {
            rl.close();
            return;
        }

        if (cleanInput.length > 0) {
            const parts = cleanInput.split(' ').filter(p => p.length > 0);
            
            if (parts[0] !== 'docker') {
                console.log("Error: Los comandos deben iniciar con 'docker'.");
            } else {
                const action = parts[1];
                
                switch (action) {
                    case 'pull': {
                        const img = parts[2];
                        if (!img) {
                            console.log("Error: Debe especificar una imagen. Ej: docker pull nginx");
                        } else {
                            const hash = Math.random().toString(36).substring(2, 10);
                            console.log(`Downloading... Digest: sha256:${hash} Status: Downloaded`);
                            images[img] = true;
                        }
                        break;
                    }

                    case 'run': {
                        let ports = "N/A";
                        let imagen = "";
                        const name = "container_" + Math.floor(Math.random() * 900 + 100);

                        for (let i = 2; i < parts.length; i++) {
                            if (parts[i] === '-p' && parts[i + 1]) {
                                ports = parts[i + 1];
                                i++;
                            } else if (parts[i] === '-v' && parts[i + 1]) {
                                i++;
                            } else if (!parts[i].startsWith('-')) {
                                imagen = parts[i];
                            }
                        }

                        if (!imagen) {
                            console.log("Error: Debe especificar la imagen a ejecutar.");
                        } else {
                            const id = Math.random().toString(36).substring(2, 8);
                            containers[id] = { id, image: imagen, status: 'Up', ports, name };
                            console.log(`Contenedor iniciado con ID: ${id}`);
                        }
                        break;
                    }

                    case 'ps': {
                        const showAll = parts[2] === '-a';
                        console.log(`${"CONTAINER ID".padEnd(12)} ${"IMAGE".padEnd(15)} ${"STATUS".padEnd(15)} ${"PORTS".padEnd(15)} ${"NAMES".padEnd(15)}`);
                        for (const id in containers) {
                            const c = containers[id];
                            if (!showAll && c.status !== 'Up') continue;
                            console.log(`${c.id.padEnd(12)} ${c.image.padEnd(15)} ${c.status.padEnd(15)} ${c.ports.padEnd(15)} ${c.name.padEnd(15)}`);
                        }
                        break;
                    }

                    case 'stop': {
                        const target = parts[2];
                        let found = false;
                        for (const id in containers) {
                            if (containers[id].id === target || containers[id].name === target) {
                                containers[id].status = 'Exited (0)';
                                console.log(`${containers[id].name} detenido.`);
                                found = true;
                                break;
                            }
                        }
                        if (!found) console.log(`Error: No existe el contenedor '${target}'.`);
                        break;
                    }

                    case 'rm': {
                        const target = parts[2];
                        let foundKey = null;
                        for (const id in containers) {
                            if (containers[id].id === target || containers[id].name === target) {
                                if (containers[id].status === 'Up') {
                                    console.log("Error: Debe detener el contenedor antes de eliminarlo (Estado: Up).");
                                    foundKey = 'ACTIVE';
                                    break;
                                } else {
                                    foundKey = id;
                                    break;
                                }
                            }
                        }
                        if (foundKey === null) {
                            console.log(`Error: No existe el contenedor '${target}'.`);
                        } else if (foundKey !== 'ACTIVE') {
                            delete containers[foundKey];
                            console.log(`Contenedor ${target} eliminado.`);
                        }
                        break;
                    }

                    case 'logs': {
                        const target = parts[2];
                        let found = false;
                        for (const id in containers) {
                            if (containers[id].id === target || containers[id].name === target) {
                                console.log(`[INFO] Server started on port ${containers[id].ports}... [GET] /index.html 200 OK`);
                                found = true;
                                break;
                            }
                        }
                        if (!found) console.log(`Error: No existe el contenedor '${target}'.`);
                        break;
                    }

                    default:
                        console.log("Comando no soportado en la simulación.");
                        break;
                }
            }
        }
        promptUser();
    });
}

promptUser();