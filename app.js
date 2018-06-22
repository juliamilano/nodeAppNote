// function getValue(flag){
//     const index = process.argv.indexOf(flag);
//     return (index > -1) ? process.argv[index + 1] : null;
// }

// const message = getValue('-m') || "привет";

// console.log(`${message}`);

// const stdin= process.stdin;
// const stdout =  process.stdout;

// stdin.on('data', data => stdout.write(data));

const stdin= process.stdin;
const stdout =  process.stdout;

stdout.write("Привет как тебя зовут?\n");
stdin.on('data', input => {
    const name = input.toString().trim();
    const reversedName = name.split('').reverse().join('');
    stdout.write(`\n${name}, твое имя наоборот ${reversedName}`);
    process.exit();
});