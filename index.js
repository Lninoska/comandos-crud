const yargs = require('yargs');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const { argv } = require('process');
const { lodash } = require('lodash')



const { createConfig, funcionCreate } = require('./create')
const { funcionUpdate, UpdateConfig } = require('./update')
const { funcionRead } = require('./read')
const { deleteConfig, funcionDelete } = require('./delete')




const args = yargs
    .command('create', 'Crear una nueva tarea', createConfig, (argv) => funcionCreate(argv))
    .command('read', 'Mostrar todas las tareas', {}, (argv) => funcionRead())
    .command('update', 'Actualizar o modificiar una tarea', UpdateConfig, (argv) => funcionUpdate(argv))
    .command('delete', 'Eliminar una tarea', deleteConfig, (argv) => funcionDelete(argv))
    .help()
    .argv