//INSERTAR QUERY DE REGISTRO USUARIOS


const getAll = () => {
    return db.query('select * from users')
};

//Faltaba un GetById para los usuarios que maneja el ADMIN --lo creo para poder meterle una foto a un user en concreto

const getById = (id_user) => {
    return db.query('select * from users where id_user = ?', [id_user])
};

const deleteById = (id_user) => {
    return db.query('delete from users where id_user = ?', [id_user]);
};



const create = ({ name, surname, email, password, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook }) => {
    return db.query('INSERT INTO users (name, surname, email, password, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [name, surname, email, password, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook]
    );
};

//creada para el login aunque se pasa al users tambien por ahora
const getByEmail = (email) => {

    return db.query('SELECT * FROM users WHERE email=?', [email]);
}


module.exports = { create, getByEmail, getById, getAll, deleteById }