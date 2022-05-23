const getAll = () => {
  return db.query('select * from working_groups')
}

const getById = (id_working_group) => {
  return db.query('select * from working_groups where id_working_group = ?', [id_working_group])
}


const create = ({ working_group_name }) => {
  return db.query(
    'insert into working_groups (working_group_name) values (?)',
    [working_group_name]
  );
};


const update = (id_working_group, { working_group_name }) => {
  return db.query(
    'UPDATE working_groups SET working_group_name = ? WHERE id_working_group = ?',
    [working_group_name, id_working_group]
  );
}

const deleteById = (id_working_group) => {
  return db.query('delete from working_groups where id_working_group = ?', [id_working_group]);
}



//Obtiene los grupos en los que está un usuario

const getUsersByGroup = (working_groups_id_working_group) => {
  let query = db.query('SELECT *  FROM users JOIN users_has_working_groups ON users.id_user =users_has_working_groups.users_id_user where users_has_working_groups.working_groups_id_working_group= ?', [working_groups_id_working_group]);
  return query
}

//Obtiene los grupos de un Usuario

const getGroupsByUser = (users_id_user) => {
  return db.query('select * from working_groups Join users_has_working_groups ON working_groups.id_working_group = users_has_working_groups.working_groups_id_working_group where users_has_working_groups.users_id_user =?', [users_id_user])

}

//Buscar registro member y workinggroup
const memberANdWorkingGroupRegisteralreadyExists = (working_groups_id_working_group, users_id_user) => {
  return db.query('SELECT * from users_has_working_groups WHERE working_groups_id_working_group =? and users_id_user =?',
    [working_groups_id_working_group, users_id_user])
}



//Une los grupos con el usuario

const unionGroupsWithUser = (working_groups_id_working_group, users_id_user) => {
  return db.query(' INSERT into users_has_working_groups(working_groups_id_working_group,users_id_user) VALUES(?, ?) ', [working_groups_id_working_group, users_id_user])
}

//Elimina la relación del usuario con el grupo

const deleteUserFromGroup = (working_groups_id_working_group, users_id_user) => {
  return db.query('DELETE from users_has_working_groups where users_id_user =? and working_groups_id_working_group =?', [users_id_user, working_groups_id_working_group])
}



module.exports = { getAll, getById, create, update, deleteById, getUsersByGroup, getGroupsByUser, unionGroupsWithUser, deleteUserFromGroup, memberANdWorkingGroupRegisteralreadyExists }