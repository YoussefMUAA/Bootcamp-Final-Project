const router = require('express').Router();
const EventsModel = require('../../models/events.model');

router.get('/', async (req, res) => {
  try {
    const [result] = await EventsModel.getAll();
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get('/:eventId', async (req, res) => {
  try {
    const [result] = await EventsModel.getById(req.params.eventId);
    if (result.length === 0) {
      return res.json({ info: 'El evento no existe' });
    }
    res.json(result[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const result = await EventsModel.create(req.body);
    const newEventId = result[0].insertId;
    const [resultEvent] = await EventsModel.getById(newEventId);

    res.status(201).json(resultEvent[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});


router.put('/:eventId', async (req, res) => {
  const result = await EventsModel.update(req.params.eventId, req.body);
  res.json(result);
});

router.delete('/:eventId', (req, res) => {
  EventsModel.deleteById(req.params.eventId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: err.message })
    });
});



//TRAER LOS EVENTOS POR FECHA

router.get('/eventday/:date', async (req, res) => {

  const [eventos] = await EventsModel.eventsByDay(req.params.date)
  res.json(eventos);



});





module.exports = router;