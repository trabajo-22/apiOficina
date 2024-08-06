const db = require('../config/coneccion');
const configsql = require("./../config/sqlserver");

const sql = require("mssql");


const { Request, TYPES } = require('tedious');

const Usuario = {};







Usuario.getAll = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuario';
        const result = [];


        const request = new Request(query, (err, rowCount) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return reject(err);
            }
            resolve(result);
        });

        request.on('row', columns => {
            const item = {};
            columns.forEach(column => {
                item[column.metadata.colName] = column.value;
            });
            result.push(item);
        });

        request.on('error', err => {
            console.error('Error durante la ejecución de la consulta:', err);
            reject(err);
        });

        db.execSql(request);
    });
};










Usuario.getCedula = async(ucedula) => {

    try {
        const sqlQuery = 'SELECT COUNT(*) AS count FROM usuario WHERE ucedula = @ucedula';
        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('ucedula', sql.VarChar(10), ucedula)
            .query(sqlQuery);
        let count = result.recordset[0].count;
        await cnn.close();
        return count;
    } catch (error) {
        throw error;
    }


    // var dataResult = [];
    // try {
    //     const sqlQuery = 'SELECT COUNT(*) AS count FROM usuario WHERE ucedula = @ucedula';
    //     let cnn = await sql.connect(configsql)
    //     let result = await cnn.request()
    //         .input('ucedula', sql.VarChar(15), ucedula)
    //         .query(sqlQuery)
    //     dataResult = result.recordset
    //     await cnn.close()

    //     return dataResult
    // } catch (error) {
    //     throw error;
    // }
}



Usuario.OnUser = async(cedula) => {
    try {
        const sqlQuery = 'SELECT * FROM usuario WHERE ucedula = @ucedula';

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('ucedula', sql.VarChar, cedula)
            .query(sqlQuery);

        let usuarios = result.recordset[0];
        await cnn.close();

        return usuarios;

    } catch (error) {
        throw error;
    }
}



Usuario.listaUsuario = async() => {
    try {
        const sqlQuery = 'SELECT * FROM usuario';

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .query(sqlQuery);

        let usuarios = result.recordset;
        await cnn.close();

        return usuarios;

    } catch (error) {
        throw error;
    }
}





/*
const GetTipoCuentasPorCliente = async (req = request, res = response) => {
    const identificacion = req.user;
    var dataResult = [];

    console.log(identificacion)

    let sqlQuery = ` SELECT
                        TipoCuenta.codigo, 
                        TipoCuenta.nombre,
                        CuentaMaestro.secuencial
                    FROM Clientes.Cliente
                    INNER JOIN CaptacionesVista.CuentaCliente ON CuentaCliente.secuencialCliente = Cliente.secuencial
                    INNER JOIN CaptacionesVista.CuentaMaestro ON CuentaMaestro.secuencial = CuentaCliente.secuencialCuenta
                    INNER JOIN CaptacionesVista.TipoCuenta ON TipoCuenta.codigo = CuentaMaestro.codigoTipoCuenta
                    INNER JOIN Personas.Persona ON Persona.secuencial = Cliente.secuencialPersona
                    WHERE TipoCuenta.estaActivo = 1 and Persona.identificacion = @identificacion and CuentaMaestro.codigoEstado = 'A' `

    let cnn = await sql.connect(configsql)
    let result = await cnn.request()
        .input('identificacion', sql.VarChar(15), identificacion)
        .query(sqlQuery)

    dataResult = result.recordset
    await cnn.close()

    res.status(200).json({ "response": dataResult });
}
*/



Usuario.create = async(ucedula, unombres, uapellidos, ucorreo) => {
    try {
        const query = `
           INSERT INTO usuario (ucedula, unombres, uapellidos, ucorreo) 
            OUTPUT inserted.ucedula, inserted.unombres, inserted.uapellidos, inserted.ucorreo 
            VALUES (@ucedula, @unombres, @uapellidos, @ucorreo)`;

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('ucedula', sql.Int, ucedula)
            .input('unombres', sql.NVarChar, unombres)
            .input('uapellidos', sql.NVarChar, uapellidos)
            .input('ucorreo', sql.NVarChar, ucorreo)
            .query(query);

        await cnn.close();

        if (result.recordset && result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            throw new Error('No se encontraron registros después de la inserción.');
        }

    } catch (error) {
        throw error;
    }
};

// Usuario.create = (ucedula, unombres, uapellidos, ucorreo) => {
//     return new Promise((resolve, reject) => {
//         const query = `
//             INSERT INTO usuario (ucedula, unombres, uapellidos, ucorreo) 
//             VALUES (@ucedula, @unombres, @uapellidos, @ucorreo)`;

//         const request = new Request(query, (err, rowCount) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve({ rowCount });
//         });

//         request.addParameter('ucedula', TYPES.Int, ucedula);
//         request.addParameter('unombres', TYPES.NVarChar, unombres);
//         request.addParameter('uapellidos', TYPES.NVarChar, uapellidos);
//         request.addParameter('ucorreo', TYPES.NVarChar, ucorreo);

//         db.execSql(request);
//     });
// };


module.exports = Usuario;