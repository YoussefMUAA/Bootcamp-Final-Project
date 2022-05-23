const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'public/documents' });
const fs = require('fs');

const DocumentsModel = require('../../models/documents.model');

const { checkAdmin, checkToken } = require('./../middlewares')

router.get('/', async (req, res) => {
  try {
    const [result] = await DocumentsModel.getAll();
    res.json(result);
  } catch (err) {
    res.json({ error: err.message });
  };
});

//Docs por id
router.get('/:documentId', async (req, res) => {
  try {
    const [result] = await DocumentsModel.getById(req.params.documentId);
    if (result.length === 0) {
      return res.json({ info: 'El documento no existe' });
    }
    res.json(result[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});



//Crear nuevo doc
router.post('/', upload.single('doc_url'), async (req, res, cb) => { 
 
  //modificamos el doc para situarlo
  const extension = '.' + req.file.mimetype.split('/')[1];
  //Aseguramos que solo se suban PDFs
  if (extension != '.pdf') {
    cb(null, false);
    return cb(new Error('Solo se admite la subida de PDFs'));
    
  } else {
    //obtenemos el nombre del nuevo doc
     const newDoc = req.file.originalname;
    // obtenemos ruta con la extensión
    const newPath = `public/documents/${req.file.originalname}`;
    // movemos el doc para que reciba la extensión
    fs.renameSync(req.file.path, newPath);
  
    // Modifico el BODY para poder incluir el nombre de la imagen en la BD
    
    req.body.doc_url = newDoc;
  }
  try {
    const result = await DocumentsModel.create(req.body);
    const newDocumentId = result[0].insertId;
    const [resultDocument] = await DocumentsModel.getById(newDocumentId);

    res.status(201).json(resultDocument[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
  
});


//editar SOLO info del doc
router.put('/data/:documentId', checkToken, async (req, res) => {

  const result = await DocumentsModel.updateData(req.params.documentId, req.body);

  res.json(result);

});

//editar info del documento
router.put('/:documentId', upload.single('doc_url'), async (req, res, cb) => {
  
  //modificamos el doc para situarlo
  const extension = '.' + req.file.mimetype.split('/')[1];
  //Aseguramos que solo se suban PDFs
  if (extension != '.pdf') {
    cb(null, false);
    return cb(new Error('Solo se admite la subida de PDFs'));
    
  } else {
    //obtenemos el nombre del nuevo doc
    const newDoc = req.file.originalname;
    // obtenemos ruta con la extensión
    const newPath = `public/documents/${req.file.originalname}`;
    // movemos el doc para que reciba la extensión
    fs.renameSync(req.file.path, newPath);
    
    // Modifico el BODY para poder incluir el nombre de la imagen en la BD
    
    req.body.doc_url = newDoc;
  }
  try {
    const result = await DocumentsModel.update(req.params.documentId, req.body);
    res.json(result);
    const newDocumentId = result[0].insertId;
    const [resultDocument] = await DocumentsModel.getById(newDocumentId);
    
    res.status(201).json(resultDocument[0]);
  } catch (err) {
    res.json({ error: err.message });
  }
});


//eliminar documento
router.delete('/:documentId', (req, res) => {
  DocumentsModel.deleteById(req.params.documentId)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ error: err.message })
    });
});

module.exports = router;