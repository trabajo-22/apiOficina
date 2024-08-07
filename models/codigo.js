const configsql = require("../config/sqlserver");

const sql = require("mssql");

const Codigo = {};







Codigo.codigo = async () => {
    try {
        const now = new Date();
        const nowString = now.toISOString(); 

        const selectQuery = `SELECT TOP 1 * FROM codigo WHERE CONVERT(varchar, cfecha, 120) LIKE '${nowString.substring(0, 10)}%' ORDER BY cfecha DESC`;
        const cnn = await sql.connect(configsql);
        const result = await cnn.request().query(selectQuery);

        let newCodigo;
        if (result.recordset.length > 0) {
            // incrementamos +1
            const lastCodigo = parseInt(result.recordset[0].ccodigo);
            newCodigo = (lastCodigo + 1).toString();
        } else {
            // No existe  = 1
            newCodigo = '1';
        }

    
     const insertQuery = `INSERT INTO codigo (ccodigo, cfecha)  OUTPUT INSERTED.cid VALUES ('${newCodigo}', '${now.toISOString()}')`;
    const re =  await cnn.request().query(insertQuery);

     await cnn.close();

     // Retornar el nuevo turno creado
     return { 
        cid: re.recordset[0].cid,
        ccodigo: newCodigo,
         cfecha: now };



    } catch (error) {
        throw error;
    }
};





// Codigo.codigo = async() => {
//     try {
//         const sqlQuery = 'SELECT TOP 1 * FROM codigo ORDER BY cfecha Desc';

//         let cnn = await sql.connect(configsql);
//         let result = await cnn.request()
//             .query(sqlQuery);

//         let turno = result.recordset[0];
//         await cnn.close();

//         return turno;

//     } catch (error) {
//         throw error;
//     }
// }






module.exports = Codigo;