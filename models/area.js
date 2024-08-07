const configsql = require("../config/sqlserver");
const sql = require("mssql");

const Area = {};




Area.getArea = async(nombre, id) => {
    try {
        const sqlQuery = ` SELECT 
        a.aid,
        a.anombre,
        a.aicon,
        a.agid,
        a.alias,
        a.afecha,
        g.agnombre,
        g.agfecha
      FROM 
        area a
      JOIN 
        agencia g ON a.agid = g.agid
      WHERE 
        g.agid = @agid AND g.agnombre = @agnombre;`

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
        .input('agnombre', sql.NVarChar(300), nombre)
        .input('agid', sql.Int, id)
            .query(sqlQuery);
        let count = result.recordsets[0];
        await cnn.close();
        return count;

    } catch (error) {
        throw error;
    }
}






Area.create = async(anombre, aicon, agid,alias) => {
    try {
        const query = `
           INSERT INTO area (anombre, aicon, agid, alias) 
            OUTPUT  inserted.anombre, inserted.aicon, inserted.agid, inserted.alias
            VALUES (@anombre, @aicon, @agid, @alias)`;

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('anombre', sql.NVarChar, anombre)
            .input('aicon', sql.NVarChar, aicon)
            .input('agid', sql.Int, agid)
            .input('alias', sql.NVarChar, alias)
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




module.exports = Area;