require('colors');


const displayMenu = () => {

    return new Promise( ( resolve, reject ) => {
        console.clear();
        console.log( '========================'.green );
        console.log( '    Select an option    '.green );
        console.log( '========================\n'.green );
    
        console.log(`${ '1.'.green } Create todo`);
        console.log(`${ '2.'.green } List todos`);
        console.log(`${ '3.'.green } List completed todos`);
        console.log(`${ '4.'.green } List pending todos`);
        console.log(`${ '5.'.green } Complete todo`);
        console.log(`${ '6.'.green } Delete todo`);
        console.log(`${ '0.'.green } Exit\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        })
    
        readline.question('Select an option: ', ( option ) => {
            readline.close();
            resolve( option );
        })
    });

}

const pause = () => {

    return new Promise( ( resolve, reject ) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        })
    
        readline.question(`\nPress ${'ENTER'.green} to continue\n`, ( option ) => {
            readline.close();
            resolve();
        })
    })
}


module.exports = {
    displayMenu,
    pause,
}