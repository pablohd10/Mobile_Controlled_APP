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
    res.sendFile(path.join(__dirname, 'public', 'paginaPrincipal.html'));
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
});

