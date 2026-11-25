const Joi = require("joi");

const userSchema = Joi.object({
  nickName: Joi.string().min(4).max(50).required().messages({
    "any.required": "El campo nickName es obligatorio.",
    "string.base": "El campo nickName debe ser un texto.",
    "string.empty": "El campo nickName no puede estar vacío.",
    "string.min": "El campo nickName debe contenter al menos 4 caracteres.",
    "string.max": "El campo nickName no debe exceder los 50 caracteres."
  })
}).required().messages({
  "any.required": "Debe enviar los datos del usuario.",
  "object.base": "La estructura debe contener un objeto.",
  "object.unknown": "Solo se acepta el campo nickName."
});

module.exports = {
  userSchema,
};