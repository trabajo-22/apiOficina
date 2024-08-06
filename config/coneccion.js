// const Connection = require('tedious').Connection;


// var config = {
//     server: "DESKTOP-MK7C0BH",
//     authentication: {
//         type: "default",
//         options: {
//             userName: "turno",
//             password: "turno12345"
//         }
//     },
//     options: {
//         port: 1433,
//         database: "turno",
//         trustServerCertificate: true,
//         encrypt: false

//     }
// }


// const connection = new Connection(config);

// connection.connect();


// connection.on('connect', (err) => {
//     if (err) {
//         console.log("error al conectarse a la base de datos");
//         throw err;
//     }
//     executeStatement();
// });


// function executeStatement() {
//     console.log('Base de datos conectada')
// }


// module.exports = connection;