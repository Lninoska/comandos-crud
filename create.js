const yargs = require('yargs');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { argv } = require('process');

const createConfig = {
    titulo: {
        describe:'El nombre de la tarea a realizar',
        alias:'t',
        demandOption: true
    },
    contenido: {
        describe: 'Descripción de la tarea a realizar',
        alias:'c',
        demandOption: true
    }
}

const funcionCreate = async ({ titulo, contenido }) => {
    const id = uuidv4().slice(0, 8);
    const nuevaTarea = { id: id, titulo: titulo, contenido: contenido};

    try {
        const tareas = await fs.readFile('tareas.txt', 'utf-8');
        const arrayTareas = JSON.parse(tareas);

        arrayTareas.push(nuevaTarea);

        await fs.writeFile('tareas.txt', JSON.stringify(arrayTareas, null, 2));
        console.log('Nueva tarea agregada')
    } catch (error){
        console.error('Error:', error)
    }
} 

exports.module = { funcionCreate, createConfig }