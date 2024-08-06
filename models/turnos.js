const configsql = require("../config/sqlserver");

const sql = require("mssql");

const Turno = {};






Turno.ultimoTurno = async() => {
    try {
        const sqlQuery = 'SELECT TOP 1 * FROM turnos ORDER BY tid Desc';

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .query(sqlQuery);

        let turno = result.recordset[0].tturno;
        await cnn.close();

        return turno;

    } catch (error) {
        throw error;
    }
}





Turno.getTurnoById = async(tid) => {
    try {
        const sqlQuery = `
            SELECT 
                t.tid,
                t.tcedula,
                t.tnombres,
                t.tapellidos,
                t.tcorreo,
                t.tturno,
                t.ttipoturno,
                t.tfecha,
                a.anombre AS AreaNombre,
                g.agnombre AS AgenciaNombre
            FROM 
                turnos t
            JOIN 
                area a ON t.idarea = a.aid
            JOIN 
                agencia g ON t.idagencia = g.agid
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

Turno.create = async(tcedula, tnombres, tapellidos, tcorreo, tturno, ttipoturno, idarea, idagencia) => {

    try {
        const query = `
           INSERT INTO turnos (tcedula, tnombres, tapellidos, tcorreo, tturno, ttipoturno, idarea, idagencia) 
            OUTPUT  inserted.tid, inserted.tcedula, inserted.tnombres, inserted.tapellidos, inserted.tcorreo, inserted.tturno , inserted.ttipoturno, inserted.idarea, inserted.idagencia
            VALUES (@tcedula, @tnombres, @tapellidos, @tcorreo, @tturno, @ttipoturno, @idarea, @idagencia)`;

        let cnn = await sql.connect(configsql);
        let result = await cnn.request()
            .input('tcedula', sql.NVarChar, tcedula)
            .input('tnombres', sql.NVarChar, tnombres)
            .input('tapellidos', sql.NVarChar, tapellidos)
            .input('tcorreo', sql.NVarChar, tcorreo)
            .input('tturno', sql.NVarChar, tturno)
            .input('ttipoturno', sql.NVarChar, ttipoturno)
            .input('idarea', sql.Int, idarea)
            .input('idagencia', sql.Int, idagencia)
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