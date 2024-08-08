const configsql = require("../config/sqlserver");
const sql = require("mssql");

const { Request, TYPES } = require('tedious');
const Agencia = {};






Agencia.listAgencia = async() => {
    try {
        const sqlQuery = 'SELECT * FROM agencia';

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













Agencia.getAgencia = async(nombre, id) => {
    try {
        console.log(nombre, id)
        const sqlQuery = 'SELECT * FROM agencia WHERE agnombre = @agnombre AND agid = @agid';
        
        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
        .input('agnombre', sql.NVarChar(300), nombre)
        .input('agid', sql.Int, id)
            .query(sqlQuery);
        let count = result.recordset[0];
        await cnn.close();
        return count;
    } catch (error) {
        throw error;
    }
}













Agencia.getAId = async(agnombre, agid) => {
    // console.log(agnombre, agid)
    try {
        const sqlQuery = `SELECT COUNT(*) AS count FROM agencia WHERE agid = @agid AND agnombre = @agnombre '`;


        const request = new Request(sqlQuery, (err, rowCount, rows) => {

            if (err) {
                console.error('Error en la consulta: ', err);
                return;
            }

            if (rows.length > 0) {
                const count = rows[0][0].value;
                if (count > 0) {
                    console.log('La fila existe');
                } else {
                    console.log('La fila no existe');
                }
            }
            connection.close();
        });


        // let cnn = await sql.connect(configsql);
        // let result = await cnn.request()
        //     .input('agid', sql.VarChar(10), agid)
        //     .input('agnombre', sql.VarChar(10), agnombre)
        //     .query(sqlQuery);
        // let count = result.recordset[0].count;
        // await cnn.close();
        // return count;

    } catch (error) {
        throw error;
    }
}






Agencia.create = async(agnombre) => {
    try {
        const query = `
           INSERT INTO agencia (agnombre) 
            OUTPUT  inserted.agnombre
            VALUES (@agnombre)`;

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('agnombre', sql.NVarChar, agnombre)
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

module.exports = Agencia;