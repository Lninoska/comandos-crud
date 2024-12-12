const yargs = require('yargs');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { argv } = require('process');

const UpdateConfig = {
    titulo: {
        describe:'Nuevo nombre de la tarea a realizar',
        alias:'t',
        demandOption: true
    },
    contenido: {
        describe: 'Nueva descripción de la tarea a realizar',
        alias:'c',
        demandOption: true
    }, 
    id: {
        describe: 'El id de la tarea a actualizar o modificar',
        alias:'i',
        demandOption:true
    }
}

const deleteConfig = {
    id: {
        describe:'El id o identificador de la tarea a eliminar',
        alias:'i',
        demandOption: true
    }
}

const funcionUpdate = async ({ id, titulo, contenido }) => {
    try {
        const tareasArchivo = await fs.readFile('tareas.txt', 'utf-8');

        if(!tareasArchivo) {
            console.error('Error: El archivo tareas.txt está vacío');
            return;
        }

        const arrayTareas = JSON.parse(tareasArchivo);

        const tareasIndex = arrayTareas.findIndex((tarea) => tarea.id === id);

        if(tareasIndex === -1) {
            console.error(`Error: No se encontró ninguna tarea con el Id: ${id}`);
            return;
        }

        const tareaActual = arrayTareas[tareasIndex];

        const tituloNuevo = titulo || tareaActual.titulo;
        const contenidoNuevo = contenido || tareaActual.contenido;

        arrayTareas[tareaIndex] = {
            ...tareaActual,
            titulo: tituloNuevo,
            contenido: contenidoNuevo,
        };

        await fs.writeFile('tareas.txt', JSON.stringify(arrayTareas, null, 2));
    } catch (error){
        console.error('Error al actualizar la tarea:', error.message);
    }
}

exports.module = { funcionUpdate, UpdateConfig }