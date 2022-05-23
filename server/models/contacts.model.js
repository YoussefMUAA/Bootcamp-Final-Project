
const getAll = () => {
    return db.query('select * from contacts');
}

const getById = (contactId) => {
    return db.query('select * from contacts where id_contact = ?', [contactId]);
}

const create = ({ name, organization, email }) => {
    return db.query(
        'insert into contacts ( name, organization, email ) values (?, ?, ?)',
        [name, organization, email]
    );
}

const update = (contactId, { name, organization, email }) => {
    return db.query(
        'UPDATE contacts SET name = ?, organization = ?, email = ? WHERE id_contact = ?',
        [name, organization, email, contactId]
    );
}

const deleteById = (contactId) => {
    return db.query('Delete from contacts where id_contact = ?', [contactId]);
}

module.exports = {
    create, getAll, getById, update, deleteById
}