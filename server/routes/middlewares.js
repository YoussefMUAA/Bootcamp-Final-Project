const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users.model')



const checkToken = async (req, res, next) => {
    //1-comprobamos si el token viene incluido en las cabeceras
    if (!req.headers['authorization']) {//se puede poner req.body.authorization
        return res
            .status(401)
            .json({ error: 'Debes incluir cabecerea autorizacion' })
    }
    //recuperar el token  
    const token = req.headers['authorization'];
    //2comprobar si el token es correcto//decodificar el token
    //utuilizamosel try catch para coger el error que nos devuelve

    //3 comrpobar si el token esta caducado
    //(ya lo comprueba la funcion verify de jwt)
    let payload;
    try {
        payload = jwt.verify(token, 'frasesecretagubernamental');

    } catch (err) {
        return res.json({ error: 'The token is incorrect or expired ' });
    }

    //Vamos a recuperar la informacion del susuario que realiza la peticion
    //nos dará lo que pusimos que codificara en el otken y un iat y un exp(numeros)
    const [users] = await UsersModel.getById(payload.id_user);//lo que cojo de payload que es el objeto donde introduje los parametros que quiero codificar del usuari en la base de datos
    req.users = users[0];
    next();
}

const checkAdmin = (req, res, next) => {
    if (req.users.is_admin) {
        next();
    } else {
        res.json({ error: 'You are not an administrator' });
    }
}

module.exports = {
    checkToken, checkAdmin
}