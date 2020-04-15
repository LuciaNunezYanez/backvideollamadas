import video from './router/video';
import registropac from './router/registropac';
import consulta from './router/consulta';
import login from './router/login';
import Server from './server/server';
import bodyParser from 'body-parser';
var cors = require('cors');

const server = Server.instance;

// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
server.app.use(bodyParser.json({ limit: '50mb' }));


// CORS - Para permitir que se puedan llamar los servicios     
// server.app.use(cors ({origin: true, credentials: true})); // Se cambia por la siguiente configuración
// server.app.use(
//     cors({
//       origin: 'http://localhost:4200',
//       credentials: true,
//     }),
//   );
server.app.use(cors(), (req: any, res: any, next: any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    // Esta de prueba
    res.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    next();
});

server.app.use('/video', video);
server.app.use('/registropac', registropac);
server.app.use('/login', login);
server.app.use('/consulta', consulta);

server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});

