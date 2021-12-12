require('colors');
const { saveFile, readDB } = require('./helpers/saveFile');
const Todos = require('./models/todos');
const {
    inquirerMenu,
    pause,
    readInput,
    listDeleteTodos,
    confirm,
    displayChecklist,
} = require('./helpers/inquirer');


console.clear();

const main = async() => {

    let option = '';
    const todos = new Todos();

    const todosDB = readDB();
    
    if ( todosDB ) {
        todos.loadTodosFromArray( todosDB );
    }

    do {
        // Display Menu
        option = await inquirerMenu();
        
        switch ( option ) {
            case '1':
                const description = await readInput( 'Description: ' );
                console.log( 'Todo created!'.yellow );
                todos.createTodo( description );
                break;
            case '2':
                todos.completeList();
                break;
            case '3':
                todos.listPendingCompletedTodos( true );
                break;
            case '4':
                todos.listPendingCompletedTodos( false );
                break;
            case '5':
                const ids = await displayChecklist( todos.listArray );
                todos.toggleCompleted( ids );
                break;
            case '6':
                const id = await listDeleteTodos( todos.listArray );
                if ( id!== '0' ) {
                    const ok = await confirm('Do you want to delete the selected option?')
                    if ( ok ) {
                        todos.deleteTodo( id );
                        console.log( 'Todo deleted!'.yellow )
                    }
                }
                break;


        }

        saveFile( todos.listArray );

        await pause();

    } while ( option !== '0' )

}


main()