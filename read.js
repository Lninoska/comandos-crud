const yargs = require('yargs');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { argv } = require('process');

const funcionRead = async () => {
    const tareasArchivo = await fs.readFile('tareas,txt', 'utf-8');
    const arrayTareas = JSON.parse (tareasArchivo);
    let contador = 0;

    for (tareas of arrayTareas){
        const { titulo, contenido, id } = tareas;
        contador++
        console.log(`Tarea número ${contador}`);
        console.log(` - Titulo: ${titulo}`);
        console.log(` - Contenido ${contenido}`);
        console.log(` - Id:  ${id}`);
    }
}

module.exports = { funcionRead }