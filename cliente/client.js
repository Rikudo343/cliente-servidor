const readline = require('readline-sync')


let name = readline.question("Cual es tu nombre?> ")
let stdin = process.openStdin()

const net = require('net')
const options = {
    port: 4000,
    host: '127.0.0.1' 
}

const client = net.createConnection(options, () =>{

    
    console.log("Bienvenido al chat " + name)
    client.write("userName"+name)

    
    
    client.on('data', (data) => {//recibe el mensaje
        process.stdout.write("\n" + data)
        process.stdout.write("\nyo>")

        if(data == "nombre ya usado"){
            let name = readline.question("Cual es tu nombre?> ")
            client.write("userName"+name)
        }
    });
 
    stdin.addListener('data', (data) => {//mando el mensaje
        process.stdout.write("yo>")
        client.write(name + ">" + data)
    })
})


client.on('error', (error) =>{
    console.log(error.message)
})

client.on('end',()=>{
    console.log('ayoooooo usuario')
})