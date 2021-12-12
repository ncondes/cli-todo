const inquirer = require('inquirer');
require('colors');


const questions = [
    {
        type: 'list',
        name: 'option',
        message: `( press ${ 'ctrl'.yellow } + ${ 'c'.yellow } to exit at any time )\nWhat do you want to do?`,
        choices: [
            {
                value: `1`,
                name: `${ '1.'.green } Create todo`,
            },
            {
                value: `2`,
                name: `${ '2.'.green } List todo`,
            },
            {
                value: `3`,
                name: `${ '3.'.green } List completed todos`,
            },
            {
                value: `4`,
                name: `${ '4.'.green } List uncompleted todos`,
            },
            {
                value: `5`,
                name: `${ '5.'.green } Complete todo`,
            },
            {
                value: `6`,
                name: `${ '6.'.green } Delete todo`,
            },
            {
                value: `0`,
                name: `${ '7.'.green } Exit`,
            },
        ]
    }
]


const inquirerMenu = async() => {
    console.clear();
    console.log( '========================'.green );
    console.log( '    Select an option    '.white );
    console.log( '========================\n'.green );
    const { option } = await inquirer.prompt( questions );
    return option;
}

const pause = async() => {
    return await inquirer.prompt([{
        type: 'input',
        name: 'enter',
        message: `Press ${ 'ENTER'.green } to continue`,
    }])
}

const readInput = async( message ) => {
    const question = [{
        type: 'input',
        name: 'description',
        message,
        validate( value ) {
            if ( value.length === 0 ) {
                return 'Please enter a value';
            }
            return true;
        }
    }];
    const { description } = await inquirer.prompt( question );
    return description;
}


const listDeleteTodos = async( todos = [] ) => {
    
    const choices = todos.map( (todo, i) => {
        const index = `${ i + 1 }.`.green;
        return {
            value: todo.id,
            name: `${ index } ${ todo.description }`,
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    })

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Select the todo to delete',
        choices,
    }]

    const { id } = await inquirer.prompt( questions );
    return id;

}

const confirm = async( message ) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message,
    }];
    const { ok } = await inquirer.prompt( question );
    return ok;
}

const displayChecklist = async( todos = [] ) => {
    
    const choices = todos.map( (todo, i) => {
        const index = `${ i + 1 }.`.green;
        return {
            value: todo.id,
            name: `${ index } ${ todo.description }`,
            checked: ( todo.completionDate ) ? true : false
        }
    });

    const question = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Select the todos',
        choices,
    }]

    const { ids } = await inquirer.prompt( question );
    return ids;

}

module.exports = { 
    inquirerMenu,
    pause,
    readInput,
    listDeleteTodos,
    confirm,
    displayChecklist,
}