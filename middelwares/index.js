
const validarJWT = require('../middelwares/validar-jwt');
const validaRoles = require('../middelwares/validar-roles');
const validarCampos = require('../middelwares/validar_campos');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}
