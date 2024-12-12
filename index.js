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

const funcionDelete = async ({ id }) => {
    try {
        const tareasArchivo = await fs.readFile('tareas.txt', 'utf-16le');
        const arrayTareas = JSON.parse(tareasArchivo);
        console.log(`Id de la tarea a eliminar: ${id}`);

        const nuevaTareas = arrayTareas.filter(tarea => tarea.id !== id);
        if(arrayTareas.length === nuevaTareas.length){
            console.log(`No se encontró ninguna tarea con el Id: ${id}`);
            return;
        }
        await fs.writeFile('tareas.txt'. JSON.stringify(nuevaTareas, null, 2));
        console.log("La tarea ha sido eliminada exitosamente");        
    } catch(error){
        console.error('Error al eliminar la tarea:', error.message);
    }
}

const args = yargs
    .command('create', 'Crear una nueva tarea', createConfig, (argv) => funcionCreate(argv))
    .command('read', 'Mostrar todas las tareas', {}, (argv) => funcionRead())
    .command('update', 'Actualizar o modificiar una tarea', UpdateConfig, (argv) => funcionUpdate(argv))
    .command('delete', 'Eliminar una tarea', deleteConfig, (argv) => funcionDelete(argv))
    .help()
    .argv