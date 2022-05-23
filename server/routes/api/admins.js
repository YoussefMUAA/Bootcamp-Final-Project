
const router = require('express').Router();
const AdminsModel = require('../../models/admins.model');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const WorkingGroupsModel = require('../../models/working-groups.model');


//Obtiene a todos los usuarios
router.get('/All', async (req, res) => {
    // Recuperar de la BD todos los clientes
    try {
        const [result, columns] = await AdminsModel.getAll();
        res.json(result);
    } catch (err) {
        res.json({ error: err.message });
    }
});


//Borra a un usuario
router.delete('/:id_user', (req, res) => {
    AdminsModel.deleteById(req.params.id_user)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json({ error: err.message })
        });
})


//Registro usuarios
router.post('/register', upload.single('img_avatar'),
    async (req, res) => {

        //comprobamos los errores con vslidadores,insertado antes en mitad del router post
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            //hay algun tipo de error
            return res.json(errors.array());
        }

        //Encriptacion de la password//numero deencriptamientos por seguridad,(se puede sustituir los calores y dejar en una linea) 2
        const passwordHash = bcrypt.hashSync(req.body.password, 12);
        req.body.password = passwordHash;
       
        //Inserción de la imagen del avatar si la hubiera. Si no, introduce "null"
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
        
        //insertar usuario base de datos 1
           try {
            const result = await AdminsModel.create(req.body);
            const newUserId = result[0].insertId;
            const [resultUser] = await AdminsModel.getById(newUserId);
            res.status(201).json(resultUser[0]);
        } catch (err) {
            res.json({ error: err.message });
        }
    });


module.exports = router;