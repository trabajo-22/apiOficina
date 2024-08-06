const turnoModel = require('../models/turnos');




exports.getUltimoTurno = async(req, res) => {
    try {

        const turno = await turnoModel.ultimoTurno();
        res.status(200).json({
            success: true,
            data: turno
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en la base de datos',
            error: error.message
        });
    }

}








exports.createTurno = async(req, res) => {
    try {
        const { tcedula, tnombres, tapellidos, tcorreo, tturno, ttipoturno, idarea, idagencia } = req.body;

        // const tuno = turnoModel.ultimoTurno()


        const resp = await turnoModel.create(tcedula, tnombres, tapellidos, tcorreo, tturno, ttipoturno, idarea, idagencia);
        const LISTA = await turnoModel.getTurnoById(resp.tid)


        return res.status(201).json({
            success: true,
            data: LISTA,
            message: 'turno creado correctamente',
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Database error',
            error: error.message
        });
    }

};