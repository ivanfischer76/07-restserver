

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // path - rutas
        this.paths = {
            auth:        '/api/auth',
            buscar:      '/api/buscar',
            categorias:  '/api/categorias',
            productos:   '/api/productos',
            uploads:     '/api/uploads',
            usuarios:    '/api/usuarios'
        }

        // conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();


        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());

        // directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
    }
    

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}

module.exports = Server;