const fs = require('fs');

const file = `./db/data.json`;

const saveFile = ( data ) => {
    fs.writeFileSync( file, JSON.stringify( data ) );
}

const readDB = () => {
    if ( !fs.existsSync( file ) ) {
        return null;
    }
    const info = fs.readFileSync( file, { enconding: 'utf-8' });
    const data = JSON.parse( info );
    return data;
}


module.exports = {
    saveFile,
    readDB,
}