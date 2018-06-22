const fs = require('fs');

function getValue(flag){
    const index = process.argv.indexOf(flag);
    return (index > -1) ? process.argv[index + 1] : null;
}

const command = process.argv[2];
const title = process.argv[3]; 
const content = process.argv[4]; 

switch(command){
    case 'list':
        list();
        break;
    case 'view':
        view(title, (error, note) => {
            if (error) return console.log(error.message);
            
            console.log(`# ${note.title} \r\n\r\n --- \r\n\r\n ${note.content}`);
        });
        break;
    case 'create':
        create(title, content, error => {
            if (error) return console.log(error.message);

            console.log(`Заметка создана`);
        });
        break;
    case 'remove':
        remove(title, content, (error) => {
            if (error) return console.log(error.message);

            console.log(`Заметка удалена`);
        });
        break;   
    default:
        console.log("Неизвестная команда");
}

function list(){
    fs.readFile("notes.json", (error, data) => {
        if (error) return console.log(error.message);

        const notes = JSON.parse(data);
        notes.forEach((note, index) => console.log(`${index + 1}. ${note.title}`));
    });
}

function view(title, done){
    fs.readFile("notes.json", (error, data) => {
        if (error) return done(error.message);

        const notes = JSON.parse(data);
        const note = notes.find((note)=> note.title === title);

        if (!note) return done(new Error("Заметка не найдена"));

        done(null, note);
    });
}

function create(title, content, done){
    fs.readFile("notes.json", (error, data) => {
        if (error) return done(error.message);

        const notes = JSON.parse(data);
        notes.push({ title, content });
        const json = JSON.stringify(notes);
        fs.writeFile("notes.json", json, error=>{
            if (error) return done(error.message);

            done();
        });
        
    });
}


function remove(title, done){
    fs.readFile("notes.json", (error, data) => {
        if (error) return done(error.message);

        let notes = JSON.parse(data);
        notes = notes.filter((note)=> note.title !== title);

        const json = JSON.stringify(notes);
        fs.writeFile("notes.json", json, error => {
            if (error) return done(error.message);

            done();
        });
        
    });
}