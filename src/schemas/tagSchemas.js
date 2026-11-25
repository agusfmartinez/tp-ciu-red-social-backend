const Joi = require("joi");

const tagSchema = Joi.object({
    nombre: Joi.array().min(1).max(10).required().messages({
      "any.required": "El campo nombre es obligatorio.",
      "array.base": "La estructura del campo nombre debe ser un array.",
      "array.min": "Debe envíar como mínimo 1 tag.",
      "array.max": "El limite de tags a recibir es 10." 
    }).items( 
      Joi.string().min(2).max(20).messages({
        // Podemos validar entre los tres cual es el max de caracteres a permitir para un tag.
        "any.required": "El campo nombre es obligatorio.",
        "string.empty": "El campo nombre contine un string vacío.",
        "string.min": "El campo nombre debe contenter al menos 2 caracteres.",
        "string.max": "El campo nombre no debe exceder los 20 caracteres.",
      })
    )
}).required().messages({
    "any.required": "Debe enviar los tags a crear.",
    "object.base": "La estructura debe contener un objeto.",
    "object.unknown": "Solo se acepta el campo nombre."
});

// editar tag recibe solo nombre string y no una lista
const editTagSchema = Joi.object({
    nombre: Joi.string().trim().min(2).max(20).required().messages({
      "any.required": "El campo nombre es obligatorio.",
      "string.base": "El campo nombre debe ser un texto.",
      "string.empty": "El campo nombre no puede estar vacío.",
      "string.min": "El campo nombre debe contener al menos 2 caracteres.",
      "string.max": "El campo nombre no debe exceder los 20 caracteres.",
    })
}).required().messages({
    "object.base": "La estructura debe contener un objeto.",
    "object.unknown": "Solo se puede modificar el campo nombre."
});

module.exports = {
  tagSchema,
  editTagSchema,
};