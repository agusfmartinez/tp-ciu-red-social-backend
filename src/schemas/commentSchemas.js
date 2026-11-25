const Joi = require("joi");

const objectId = Joi.string().hex().length(24);

const commentSchema = Joi.object({
  comentario: Joi.string().trim().min(1).max(200).required().messages({
    "any.required": "El campo comentario es obligatorio.",
    "string.base": "El campo comentario debe ser un texto.",
    "string.empty": "El campo comentario no puede estar vacío.",
    "string.min": "El campo comentario debe contenter al menos 1 caracter.",
    "string.max": "El campo comentario no debe exceder los 200 caracteres."
  }),
  postId: objectId.required().messages({
    "any.required": "El campo postId es obligatorio.",
    "string.base": "El campo postId debe ser de tipo texto.",
    "string.hex": "El campo postId debe ser un id válido.",
    "string.length": "El campo postId debe tener 24 caracteres.",
  }),
  userId: objectId.required().messages({
    "any.required": "El campo userId es obligatorio.",
    "string.base": "El campo userId debe ser de tipo texto.",
    "string.hex": "El campo userId debe ser un id válido.",
    "string.length": "El campo userId debe tener 24 caracteres.",
  }),
}).required().messages({
  "any.required": "Debe enviar los datos del comentario.",
  "object.base": "La estructura debe contener un objeto.",
  "object.unknown": "Solo se aceptan los campos comentario, postId y userId."
});

const editCommentSchema = Joi.object({
  comentario: Joi.string().trim().min(1).max(200).required().messages({
    "any.required": "El campo comentario es obligatorio.",
    "string.base": "El campo comentario debe ser un texto.",
    "string.empty": "El campo comentario no puede estar vacío.",
    "string.min": "El campo comentario debe contenter al menos 1 caracter.",
    "string.max": "El campo comentario no debe exceder los 200 caracteres."
  }),
  userId: objectId.required().messages({
    "any.required": "El campo userId es obligatorio.",
    "string.base": "El campo userId debe ser de tipo texto.",
    "string.hex": "El campo userId debe ser un id válido.",
    "string.length": "El campo userId debe tener 24 caracteres.",
  }),
}).required().messages({
  "any.required": "Debe enviar los datos a modificar.",
  "object.base": "La estructura debe contener un objeto.",
  "object.unknown": "Solo se aceptan los campos comentario y userId."
});

module.exports = {
  commentSchema,
  editCommentSchema,
};