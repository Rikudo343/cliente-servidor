const net = require('net');
let names = []//aqui almaceno los usuarios que se conecten

const server = net.createServer((socket) =>{
    console.log("han entrado a la conversacion")

    socket.on('data',(data)=>{

        let message = data.toString().trim()//quito los espacios
        console.log(message)
        

        if(message.startsWith("userName")){
            let userName = message.substring(8)//obtiene los datos del string despues del 8 digito
            console.log(userName)

            let flag = false

            names.forEach(name =>{
                if(name.userName === userName){
                    flag = true
                }
            })

            if(!flag){
                names.push({socket, userName})
                console.log(names.indexOf(userName))
                socket.write("nombre se ha registrado")
            }else{
                socket.write("el nombre esta ocupado")
                
            }
        }
        else{

            console.log('\nSe recibio el mensaje: ' + data)   
            names.forEach(client => {
                if (client.socket != socket) {
                    client.socket.write(data)
                    
                }
            });
        }  
    })

    socket.on('error',(error)=>{//por si falla algo 
        console.log('el error fue: '+ error.message)
    })
    
    socket.on('end',()=>{//se cierra la secion del usuario
        const endSesion = names.indexOf(socket);
        names.splice(endSesion,1)
        console.log('ha dejado el servidor')
    })
});
 

server.listen(4000, ()=>{
    console.log('el puerto esta listo', server.address().port)
}) 