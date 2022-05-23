const getAll = () => {
  return db.query('select * from events')
}

const getById = (eventId) => {
  return db.query('select * from events where id_event = ?', [eventId])
}


const create = ({ name, description, date, location }) => {
  return db.query(
    'insert into events (name, description, date, location) values (?, ?, ?, ?)',
    [name, description, date, location]
    )
  };
  

const update = (eventId, { name, description, date, location }) => {
    return db.query(
      'UPDATE events SET name = ?, description = ?, date = ?, location = ? WHERE id_event = ?',
      [name, description, date, location, eventId]
    );
  }

const deleteById = (eventId) => {
  return db.query('delete from events where id_event = ?', [eventId]);
}

const eventsByDay = (date) => {
  return db.query('select * from events where DATE(date) = ?', [date]);
}

module.exports = {
  getAll, getById, deleteById, update, create, eventsByDay
}
