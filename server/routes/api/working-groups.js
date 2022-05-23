const router = require('express').Router();
const { Router } = require('express');
const WorkingGroupsModel = require('../../models/working-groups.model');
const { checkToken, checkAdmin } = require('../middlewares');



//Devuelve los grupos de MIPERFIL usuario
router.get('/miWG', checkToken, async (req, res) => {
  const [result] = await WorkingGroupsModel.getGroupsByUser(req.users.id_user);
  res.json(result);
});


//Obtiene la lista de todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [result] = await WorkingGroupsModel.getAll();
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});


//Obtiene un working group
router.get('/:workingGroupId', async (req, res) => {
  try {
    const [result] = await WorkingGroupsModel.getById(req.params.workingGroupId);
    if (result.length === 0) {

      return res.json({ info: 'El grupo de trabajo no existe' });
    }
    res.json(result[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});


//Crea un working group
router.post('/', checkToken, checkAdmin, async (req, res) => {
  try {
    const result = await WorkingGroupsModel.create(req.body);
    const newWorkingGroupId = result[0].insertId;
    const [resultWorkingGroup] = await WorkingGroupsModel.getById(newWorkingGroupId);

    res.status(201).json(resultWorkingGroup[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});


//Modifica un working group
router.put('/:workingGroupId', checkToken, checkAdmin, async (req, res) => {
  const result = await WorkingGroupsModel.update(req.params.workingGroupId, req.body);
  res.json(result);
});


router.delete('/:workingGroupId', checkToken, checkAdmin, (req, res) => {
  WorkingGroupsModel.deleteById(req.params.workingGroupId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: err.message })
    });
});



//Obtiene los usuarios pertenecientes a un grupo
router.get('/getUsersByGroup/:working_groups_id_working_group', async (req, res) => {
  const [result] = await WorkingGroupsModel.getUsersByGroup(req.params.working_groups_id_working_group);
  res.json(result);
});

//Obtiene los grupos de un usuario
router.get('/getGroupByUser/:id_user', async (req, res) => {
  const [result] = await WorkingGroupsModel.getGroupsByUser(req.params.id_user);
  res.json(result);
});


//Registro de un usuario en un wokring group (by usuario)
router.post('/unionGroups/:working_groups_id_working_group', checkToken, checkAdmin, async (req, res) => {
  const [registros] = await WorkingGroupsModel.memberANdWorkingGroupRegisteralreadyExists(req.params.working_groups_id_working_group, req.users.id_user);

  if (registros.length === 0) {
    const [result] = await WorkingGroupsModel.unionGroupsWithUser(req.params.working_groups_id_working_group, req.users.id_user)
    res.json(result);
  } else {
    res.json({ error: "Member is already in the group" })
  }

});

// Añadir usuario a WG
router.post('/unionGroupsAdmin/:working_groups_id_working_group/:users_id_user', async (req, res) => {

  const [registros] = await WorkingGroupsModel.memberANdWorkingGroupRegisteralreadyExists(req.params.working_groups_id_working_group, req.params.users_id_user);

  if (registros.length === 0) {
    const [result] = await WorkingGroupsModel.unionGroupsWithUser(req.params.working_groups_id_working_group, req.params.users_id_user)
    res.json(result);
  } else {
    res.json({ error: "Member is already in the group" })
  }

});



//Borra al usuario de un working group

router.delete('/deleteGroup/:working_groups_id_working_group/:users_id_user', checkToken, checkAdmin, (req, res) => {


  WorkingGroupsModel.deleteUserFromGroup(req.params.working_groups_id_working_group, req.params.users_id_user)

    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: err.message })
    });
});


// Ruta para borrar por parte de Admin

router.delete('/deleteGroup/:working_groups_id_working_group/:users_id_user', checkToken, checkAdmin, (req, res) => {


  WorkingGroupsModel.deleteUserFromGroup(req.params.working_groups_id_working_group, req.params.users_id_user)

    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: err.message })
    });
});




module.exports = router;