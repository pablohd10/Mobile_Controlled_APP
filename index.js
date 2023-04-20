const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');

// Ajustes
app.set('port', process.env.PORT || 3000);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'iniciarSesion.html'));
});

app.get('/mando', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mando.html'));
});

app.get('/paginaPrincipal', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'paginaPrincipal.html'));
});

// Iniciar el servidor
const server = app.listen(app.get('port'), () => {
    console.log('Servidor abierto en puerto', app.get('port'));
});

// Socket IO
const SocketIO = require('socket.io');
const io = SocketIO(server);

// WebSockets 
io.on('connection', (socket) => {
    console.log('new connection', socket.id);
});


io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    // Señal para cambiar de pelicula
    socket.on('cambiarPelicula', (id) => {

        io.emit('cambioPelicula', id);

    });

    // Señal para subir el volumen
    socket.on('subirVol', () => {

        io.emit('subiendoVol');

    });

    // Señal para bajar el volumen
    socket.on('bajarVol', () => {

        io.emit('bajandoVol');

    });

    // Señal para alternar play/pause
    socket.on('a_server_play_pause', () => {

        io.emit('a_reproductor_play_pause');

    });

    // Señal que envia el movimiento del puntero
    socket.on('a_server_envio_posicion', (posicion) => {

        io.emit('a_reproductor_envio_posicion', posicion);

    });

    // Señal para alternar play/pause
    socket.on('a_server_click', () => {

        io.emit('a_reproductor_click');

    });
    
    // Señal para salir de la reproduccion de video
    socket.on('a_server_salir', () => {

        io.emit('a_reproductor_salir');

    });

    // Señal para reproducir desde la barra de búsqueda
    socket.on('a_server_reproducir_bus', (id) => {

        io.emit('a_reproductor_reproducir_bus', id);

    });

    
    // Señal para actualizar la cola cuando se añada un elemento nuevo
    socket.on('a_server_act_cola', (id) => {

        io.emit('a_archivo_act_cola', id);

    });

    // Señal para actualizar la cola cuando se elimine un elemento
    socket.on('a_server_borrar_cola', () => {

        io.emit('a_archivo_borrar_cola');

    });

    // Señal para cambiar el valor del control parental de activo a inactivo y viceversa
    socket.on('a_server_cambio_parental', (valor) => {

        io.emit('a_archivo_cambio_parental', valor);

    });

    // Señal para desplazar la pantalla principal hacia abajo
    socket.on('a_server_bajar_pantalla', () => {

        io.emit('a_reproductor_bajar_pantalla');

    });

    // Señal para desplazar la pantalla principal hacia arriba
    socket.on('a_server_subir_pantalla', () => {

        io.emit('a_reproductor_subir_pantalla');

    });

});

