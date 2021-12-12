
/*
    _list = {
        'uuid-1234-5678-01':{
            id: 123,
            description: qwerty,
            completionDate: 9876,
        },
        'uuid-1234-5678-02':{
            id: 123,
            description: qwerty,
            completionDate: 9876,
        }
    }
*/

const Todo = require('./todo');


class Todos {

    _list = {};

    get listArray() {

        const list = [];
        Object.keys( this._list ).forEach( key => {
            list.push( this._list[key] );
        })
        return list;

    }

    constructor() {
        this._list = {};
    }

    deleteTodo( id = '' ) {
        if ( this._list[id] ) {
            delete this._list[id];
        }
    }

    loadTodosFromArray( todos = [] ) {
        todos.map( todo => {
            this._list[todo.id] = todo;
        })
    }

    createTodo( description = '' ) {
        const todo = new Todo( description );
        this._list[todo.id] = todo;
    }

    completeList() {
        this.listArray.map( (todo, i) => {
            console.log( `${ (i + 1).toString().green }${ '.'.green } ${ todo.description } :: ${ todo.completionDate ? todo.completionDate.green : 'Pending'.red }` )
        });
    }

    listPendingCompletedTodos( completed = true ) {
        let array = this.listArray.filter( todo => todo.completionDate !== null )
        if ( !completed ) {
            array = this.listArray.filter( todo => todo.completionDate === null )
        }
        array.map( (todo, i) => {
            console.log( `${ (i + 1).toString().green }${ '.'.green } ${ todo.description } :: ${ todo.completionDate ? todo.completionDate.green : 'Pending'.red }` )
        })
    }

    toggleCompleted( ids = [] ) {

        ids.map( id => {
            const todo = this._list[id];
            if ( !todo.completionDate ) {
                todo.completionDate = new Date().toISOString();
            }
        });

        this.listArray.map( todo => {
            if ( !ids.includes( todo.id ) ) {
                this._list[todo.id].completionDate = null;
            }
        })

    }

}

module.exports = Todos;