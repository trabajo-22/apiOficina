const configsql = require("../config/sqlserver");

const sql = require("mssql");

const Turno = {};







Turno.getTurnoById = async(tid) => {
    try {
        const sqlQuery = `
        SELECT 
    t.tid,
    t.tcedula,
    t.tnombres,
    t.tapellidos,
    t.tcorreo,
    t.ttipoturno,
    t.idcodigo,
    t.tfecha,
    a.anombre AS AreaNombre,
    a.alias AS alias,
    g.agnombre AS AgenciaNombre,
    c.ccodigo  
FROM 
    turnos t
JOIN 
    area a ON t.idarea = a.aid
JOIN 
    agencia g ON t.idagencia = g.agid
LEFT JOIN 
    codigo c ON t.idcodigo = c.cid 
WHERE 
    t.tid = @tid;
        `;

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('tid', sql.Int, tid)
            .query(sqlQuery);

        await cnn.close();

        if (result.recordset && result.recordset.length > 0) {
            return result.recordset[0];
        } else {
            throw new Error('No se encontró ningún registro con el ID especificado.');
        }

    } catch (error) {
        throw error;
    }
};




Turno.create = async(tcedula, tnombres, tapellidos, tcorreo,  ttipoturno, idarea, idagencia, idcodigo) => {
    try {
        const query = `
           INSERT INTO turnos (tcedula, tnombres, tapellidos, tcorreo,  ttipoturno, idarea, idagencia, idcodigo) 
            OUTPUT  inserted.tid, inserted.tcedula, inserted.tnombres, inserted.tapellidos, inserted.tcorreo, inserted.ttipoturno, inserted.idarea, inserted.idagencia, inserted.idcodigo
            VALUES (@tcedula, @tnombres, @tapellidos, @tcorreo,  @ttipoturno, @idarea, @idagencia, @idcodigo)`;

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('tcedula', sql.NVarChar, tcedula)
            .input('tnombres', sql.NVarChar, tnombres)
            .input('tapellidos', sql.NVarChar, tapellidos)
            .input('tcorreo', sql.NVarChar, tcorreo)
            .input('ttipoturno', sql.NVarChar, ttipoturno)
            .input('idarea', sql.Int, idarea)
            .input('idagencia', sql.Int, idagencia)
            .input('idcodigo', sql.Int, idcodigo)
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



module.exports = Turno;