const turnoModel = require('../models/turnos');











exports.createTurno = async(req, res) => {
    try {
        const { tcedula, tnombres, tapellidos, tcorreo,  ttipoturno, idarea, idagencia, idcodigo } = req.body;

        // const tuno = turnoModel.ultimoTurno()


        const resp = await turnoModel.create(tcedula, tnombres, tapellidos, tcorreo,  ttipoturno, idarea, idagencia, idcodigo);
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