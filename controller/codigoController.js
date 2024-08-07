const codigoModel = require('../models/codigo');



const sql = require('mssql');
const configsql = {
    // tu configuración de conexión a la base de datos
};







exports.getCodigo = async(req, res) => {
    try {

        const codigo = await codigoModel.codigo();
        res.status(200).json({
            success: true,
            data: codigo
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en la base de datos',
            error: error.message
        });
    }

}






