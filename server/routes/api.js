const router = require('express').Router();
//Enrutado hacia USERS
const apiUsersRouter = require('./api/users');
const apiOrdersRouter = require('./api/orders');
const apiEventsRouter = require('./api/events');
const apiDocumentsRouter = require('./api/documents');
const apiContactsRouter = require('./api/contacts');
const apiWorkingGroupsRouter = require('./api/working-groups');
const apiAdminsRouter = require('./api/admins');
const apiMessaging = require('./api/messaging');

//Importo el metodo checktoken
const { checkToken, checkAdmin } = require('./middlewares');


router.use('/users', apiUsersRouter);
router.use('/orders', apiOrdersRouter);
router.use('/events', apiEventsRouter);
router.use('/documents', apiDocumentsRouter);
router.use('/contacts', apiContactsRouter);
router.use('/working-groups', apiWorkingGroupsRouter);
router.use('/admins', checkToken, checkAdmin, apiAdminsRouter);
router.use('/messaging', apiMessaging);

module.exports = router;