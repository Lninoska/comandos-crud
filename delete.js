const yargs = require('yargs');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { argv } = require('process');
const { lodash } = require('lodash')

const deleteConfig = {
    id: {
        describe:'El id o identificador de la tarea a eliminar',
        alias:'i',
        demandOption: true
    }
}


const funcionDelete = async ({ id }) => {
    try {
        const tareasArchivo = await fs.readFile('tareas.txt', 'utf-16le');
        const arrayTareas = JSON.parse(tareasArchivo);
        console.log(`Id de la tarea a eliminar: ${id}`);

        const eliminadas = _.remove(arrayTareas, (tarea) => tarea.id !== id);
        if(eliminadas.length === 0){
            console.log(`No se encontró ninguna tarea con el Id: ${id}`);
            return;
        }
        await fs.writeFile('tareas.txt'. JSON.stringify(nuevaTareas, null, 2));
        console.log("La tarea ha sido eliminada exitosamente");        
    } catch(error){
        console.error('Error al eliminar la tarea:', error.message);
    }
}

module.exports = { deleteConfig, funcionDelete }
