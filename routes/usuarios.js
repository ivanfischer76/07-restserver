
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middelwares/validar_campos');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
            check('id', 'No es in ID válido').isMongoId(),
            check('id').custom(existeUsuarioPorId),
            check('rol').custom(esRoleValido),
            validarCampos
        ], usuariosPut);

router.post('/', [
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('password', 'El password es obligatorio y debe contener más de seis caracteres')
                .isLength({min: 6}),
            check('correo', 'El correo ingresado NO es válido').isEmail(),
            check('correo').custom( emailExiste ),
            //check('rol', 'El rol NO es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
            check('rol').custom( esRoleValido ),
            validarCampos
        ], usuariosPost);

router.delete('/:id', [
            check('id', 'No es in ID válido').isMongoId(),
            check('id').custom(existeUsuarioPorId),
            validarCampos
        ], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;