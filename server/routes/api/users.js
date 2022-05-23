
const router = require('express').Router();
const UsersModel = require('../../models/users.model');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { checkToken } = require('../middlewares');
const WorkingGroupsModel = require('../../models/working-groups.model');


//Tu propio perfil , que se devuelve al logearte.
router.get('/profile', checkToken, (req, res) => {
    res.json(req.users);
});


//Obtener lista de todos los usuarios 
router.get('/All', async (req, res) => {
    // Recuperar de la BD todos los clientes
    try {
        const [result, columns] = await UsersModel.getAll();
        res.json(result);
    } catch (err) {
        res.json({ error: err.message });
    }
});



//Recuperar un usuario por id
router.get('/profile/:id_user', async (req, res) => {
    try {
        // Recuperar el cliente a través de su ID
        const [result] = await UsersModel.getById(req.params.id_user);
        // Comprobamos si el array tiene algún valor
        if (result.length === 0) {
            return res.json({ info: 'User not found' });
        }
        res.json(result[0]);
    } catch (err) {
        res.json({ error: err.message });
    }
});


//Cambiar la contraseña estando logeado.

router.put('/resetPassword/:id_user', async (req, res) => {

    //Encriptacion de la password//numero deencriptamientos por seguridad,(se puede sustituir los calores y dejar en una linea) 2
    const passwordHash = bcrypt.hashSync(req.body.password, 12);
        req.body.password = passwordHash;

    //perfil propio que te devuelve al logearte
    router.get('/profile', checkToken, (req, res) => {
        res.json(req.users);
    });

    //Insertar la contraseña del usuario encriptada en la base de datos 
    UsersModel.resetPass(req.params.id_user, req.body)
        .then(result => res.json(result))
        .catch(err => res.json({ error: err.message }));
});



//Actualizar/update perfil de usuario.
router.put('/:id_user', async (req, res) => {
    const result = await UsersModel.updateData(req.params.id_user, req.body);
    // const result2 = await WorkingGroupsModel.unionGroupsWithUser(req.params.users_id_user, req.params.working_groups_id_working_group);
    res.json(result);
    // res.json(result2);
});

//SUBIR ARCHIVOS DE FOTOS
router.put('/profile/update', upload.single('img_avatar'), checkToken, async (req, res) => {
    
    if (req.file) {
        //modificamos el doc para situarlo
        const extension = '.' + req.file.mimetype.split('/')[1];
        //obtenemos el nombre del nuevo doc
        const newImg = `${req.file.filename}${extension}`;
        // obtenemos ruta con la extensión
        const newPath = `public/images/${req.file.filename}${extension}`;
        // movemos el doc para que reciba la extensión
        fs.renameSync(req.file.path, newPath);
    
        // Modifico el BODY para poder incluir el nombre de la imagen en la BD
        req.body.img_avatar = newImg;

    } else {
        req.body.img_avatar = "user_default_img.png";
    }

    const result = await UsersModel.update(req.body.id_user, req.body);
    res.json(result)

    
});

//LOGIN DE USUARIOS///////////////////////////////////////////////////////////

router.post('/login', async (req, res) => {
    //Comprobación de la existencia del email en la BBDD.
    const [result] = await UsersModel.getByEmail(req.body.email);
  
    if (result.length === 0) {  //el email no existe comporbacion
        return res.json({ error: "Email or password doesn´t exist" })
    }

    //Obtengo el usuario del array
    const user = result[0];

    //utilizaomos  compare de bscrypt para comparar la contraseña encripatda con la del ususario
    const iguales = bcrypt.compareSync(req.body.password, user.password);
    
    if (iguales) {
        //login correcto
        return res.json({ success: "Login Correct", token: createToken(user) })
    } else {
        return res.json({ error: "Email or password doesn´t exist" })
    }
});


//Método para crear token
function createToken(users) {//esta funcion genera el token y me lo devuelve
    const payload = {
        id_user: users.id_user,
        email: users.email,
        is_admin: users.is_admin   //Este objeto codifica la información en un el token
    }
    return jwt.sign(payload, 'frasesecretagubernamental', { expiresIn: '6d' });
};





module.exports = router