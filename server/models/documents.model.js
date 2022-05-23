

const getAll = () => {
  return db.query('select * from documents')
}

const getById = (documentId) => {
  return db.query('select * from documents where id_document = ?', [documentId])
}

const create = ({ is_private, doc_title, doc_description, doc_url }) => {
  return db.query(
    'insert into documents ( is_private, doc_title, doc_description, doc_url) values (?, ?, ?, ?)',
    [is_private, doc_title, doc_description, doc_url]
  )
};

const update = (documentId, { is_private, doc_title, doc_description, doc_url }) => {
  return db.query(
    'UPDATE documents SET is_private = ?, doc_title = ?, doc_description = ?, doc_url = ? WHERE id_document = ?',
    [is_private, doc_title, doc_description, doc_url, documentId]
  );
}

const updateData = (documentId, { is_private, doc_title, doc_description }) => {
  return db.query(
    'UPDATE documents SET is_private = ?, doc_title = ?, doc_description = ?  WHERE id_document = ?',
    [is_private, doc_title, doc_description, documentId]
  );
}


const deleteById = (documentId) => {
  return db.query('delete from documents where id_document = ?', [documentId]);
} 





module.exports = {
  getAll, getById, deleteById, update, create, updateData
}
