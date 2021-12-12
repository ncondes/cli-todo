const { v4: uuidv4 } = require('uuid');


class Todo {

    id = '';
    description = '';
    completionDate = null;

    constructor( description ) {
        this.id = uuidv4();
        this.description = description;
        this.completionDate = null;
    }
}

module.exports = Todo;