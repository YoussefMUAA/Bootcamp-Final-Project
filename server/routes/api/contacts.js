const router = require('express').Router();
const ContactsModel = require('../../models/contacts.model')
const { checkAdmin, checkToken } = require('../middlewares');


router.get('/', async (req, res) => {
  try {
    const [result] = await ContactsModel.getAll();
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/:contactId', async (req, res) => {
  try {
    const [result] = await ContactsModel.getById(req.params.contactId);
    if (result.length === 0) {
      return res.json({ info: 'No se encuentra el usuario' });
    }
    res.json(result[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post('/', checkToken, checkAdmin, async (req, res) => {
  try {
    const result = await ContactsModel.create(req.body);
    const newContactId = result[0].insertId;
    const [resultContact] = await ContactsModel.getById(newContactId);

    res.status(201).json(resultContact[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});


router.put('/:contactId', checkToken, checkAdmin, async (req, res) => {
  const result = await ContactsModel.update(req.params.contactId, req.body);
  res.json(result);
});

router.delete('/:contactId', checkToken, checkAdmin, (req, res) => {
  ContactsModel.deleteById(req.params.contactId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: err.message })
    });
});



module.exports = router;
