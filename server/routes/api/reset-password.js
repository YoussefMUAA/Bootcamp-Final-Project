//Recuperar contraseña



router.post('/forgot-password', async (req, res, next) => {
  const [result] = await UsersModel.getByEmail(req.body.email);

  if (result.length === 0) {  //el email no existe comporbacion
    return res.json({ error: "Email or password doesn´t exist" })
  } else {
    //El usuario existe, ahora creamos un link de un solo uso y válido por 15 min


  }
});

router.get('/reset-password', (req, res, next) => {

});

router.post('/reset-password', (req, res, next) => {

});