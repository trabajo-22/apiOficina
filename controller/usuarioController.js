const usuarioModel = require('../models/usuario');





exports.login = async(req, res) => {

    try {
        const ucedula = req.params.cedula;

        const existeCedula = await usuarioModel.getCedula(ucedula);

        if (existeCedula > 0) {
            const lista = await usuarioModel.OnUser(ucedula);
            return res.status(200).json({
                success: true,
                data: lista
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'La cédula no existe'
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error en la base de datos',
            error: error.message
        });
    }


}





exports.getUsuario = async(req, res) => {
    try {
        const usuarios = await usuarioModel.getAll();
        res.status(200).json({
            success: true,
            data: usuarios
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en la base de datos',
            error: error.message
        });
    }

}






exports.createUsuario = async(req, res) => {
    try {
        const { ucedula, unombres, uapellidos, ucorreo } = req.body;
        const existeCedula = await usuarioModel.getCedula(ucedula);

        if (existeCedula > 0) {
            return res.status(400).json({
                success: false,
                message: 'La cedula ya existe'
            });
        } else {
            const resp = await usuarioModel.create(ucedula, unombres, uapellidos, ucorreo);
            return res.status(201).json({
                success: true,
                message: 'Usuario creado correctamente',
                data: resp
            });
        }

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Database error',
            error: error.message
        });
    }

};





// exports.createUsuario = async(req, res) => {
//     try {
//         const { ucedula, unombres, uapellidos, ucorreo } = req.body;

//         const existeCedula = await usuarioModel.getCedula(ucedula);

//         if (existeCedula > 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'La cedula ya existe'
//             });
//         } else {
//             const resp = await usuarioModel.create(ucedula, unombres, uapellidos, ucorreo);
//             return res.status(201).json({
//                 success: true,
//                 message: 'Usuario creado correctamente',
//                 data: resp
//             });
//         }

//     } catch (error) {

//         return res.status(500).json({
//             success: false,
//             message: 'Database error',
//             error: error.message
//         });
//     }

// };