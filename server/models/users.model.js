

//recupera todo los usuarios
const getAll = () => {
    return db.query('select * from users')
};




// Recupera el cliente a partir de su ID
const getById = (id_user) => {
    return db.query('select * from users where id_user = ?', [id_user]);
}



//CREAR NUEVO USUARIO/ALTA

const create = ({ name, surname, email, password, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook }) => {
    return db.query(
        'insert into users (name, surname, email, password, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook)values(?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [name, surname, email, password, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook]
    );
}

//MODIFICACION DE DATOS SIN IMAGEN
const updateData = (id_user, { name, surname, email, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook }) => {
    return db.query(
        'UPDATE users SET name=?, surname=?, email=?, phone_number=?, address=?, location=?, is_admin=?, rs_instagram=?, rs_linkedin=?, rs_twitter=?, rs_facebook=? WHERE id_user=?',
        [name, surname, email, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook, id_user]
    );
}

//MODIFICACION DE DATOS DEL REGISTRO DE CLIENTES
const update = (id_user, { name, surname, email, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook }) => {
    return db.query(
        'UPDATE users SET name=?, surname=?, email=?, img_avatar=?, phone_number=?, address=?, location=?, is_admin=?, rs_instagram=?, rs_linkedin=?, rs_twitter=?, rs_facebook=? WHERE id_user=?',
        [name, surname, email, img_avatar, phone_number, address, location, is_admin, rs_instagram, rs_linkedin, rs_twitter, rs_facebook, id_user]
    );
}


const getByEmail = (email) => {

    return db.query('SELECT * FROM users WHERE email = ?', [email]);
}



//RESETEO DE CONTRASEÑA
const resetPass = (id_user, { password }) => {
    return db.query('UPDATE users SET password=? where id_user=?', [password, id_user]);

}


module.exports = {
    getAll, create, getById, update, getByEmail, resetPass, updateData

}
