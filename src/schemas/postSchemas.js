const Joi = require("joi");

const postSchema = Joi.object({ 
    descripcion: Joi.string().min(1).max(300).required().messages({
        "any.required": "El campo descripcion es obligatorio.",
        "string.base": "El campo descripcion debe ser un texto.",
        "string.empty": "El campo descripcion no puede estar vacío.",
        "string.min": "El campo descripcion debe contenter al menos 1 caracterer.",
        "string.max": "El campo descripcion no debe exceder los 300 caracteres."
    }),
    userId: Joi.string().hex().length(24).required().messages({
        "any.required": "El campo userId es obligatorio.",
        "string.base": "El campo userId debe ser un texto.",
        "string.empty": "El campo userId no puede estar vacío.",
        "string.hex": "El campo userId debe ser un ID válido.",
        "string.length": "El campo userId debe tener 24 caracteres."
    }),
    images: Joi.array().min(1).max(10).messages({
        "array.base": "La estructura images debe contener un array.",
        "array.min": "Debe envíar como mínimo 1 foto.",
        "array.max": "El limite de fotos a recibir es 10."
    }).items(
        Joi.string().uri().messages({
            "any.required": "El campo url es obligatorio.",
            "string.empty": "El campo images contiene un string vacío.",
            "string.uri": "El campo url debe ser una url válida.",
        })
    ),
    tags: Joi.array().max(10).messages({
          "array.base": "La estructura del campo tags debe ser un array.",
          "array.max": "El limite de tags a recibir es 10." 
        }).items(
          Joi.string().min(2).max(20).messages({
            "any.required": "El campo tags es obligatorio.",
            "string.base": "Los tags deben ser texto.",
            "string.empty": "Los tags no deben contener un string vacío.",
            "string.min": "Los tags debe contenter al menos 2 caracteres.",
            "string.max": "Los tags no debe exceder los 20 caracteres.",
            })
        )    
}).required().messages({
    "object.base": "La estructura debe contener un objeto."
});

// editar con patch recibe descripcion o tags (opcionales pero al menos una), no recibe imagenes
// userId es obligatorio para validar que quien edita sea el dueño del post (no se modifica)
const editPostSchema = Joi.object({
    userId: Joi.string().hex().length(24).required().messages({
        "any.required": "El campo userId es obligatorio.",
        "string.base": "El campo userId debe ser un texto.",
        "string.empty": "El campo userId no puede estar vacío.",
        "string.hex": "El campo userId debe ser un ID válido.",
        "string.length": "El campo userId debe tener 24 caracteres."
    }),
    descripcion: Joi.string().min(1).max(300).messages({
        "string.base": "El campo descripcion debe ser un texto.",
        "string.empty": "El campo descripcion no puede estar vacío.",
        "string.min": "El campo descripcion debe contenter al menos 1 caracterer.",
        "string.max": "El campo descripcion no debe exceder los 300 caracteres."
    }),
    tags: Joi.array().max(10).messages({
        "array.base": "La estructura del campo tags debe ser un array.",
        "array.max": "El limite de tags a recibir es 10."
    }).items(
        Joi.string().min(2).max(20).messages({
            "string.base": "Los tags deben ser texto.",
            "string.empty": "El campo tags contiene un string vacío.",
            "string.min": "Los tags debe contener al menos 2 caracteres.",
            "string.max": "Los tags no debe exceder los 20 caracteres.",
        })
    )
}).or("descripcion", "tags").required().messages({
    "object.base": "La estructura debe contener un objeto.",
    "object.missing": "Debe enviar descripcion o tags para modificar.",
    "object.unknown": "Solo se aceptan los campos descripcion, tags y userId."
});

// agregar imagenes a post existente
const addImagesSchema = Joi.object({
    images: Joi.array().min(1).max(10).required().messages({
        "any.required": "El campo images es obligatorio.",
        "array.base": "La estructura images debe contener un array.",
        "array.min": "Debe envíar como mínimo 1 foto.",
        "array.max": "El limite de fotos a recibir es 10."
    }).items(
        Joi.string().uri().messages({
            "string.base": "Cada imagen debe ser una url.",
            "string.empty": "El campo images contiene un string vacío.",
            "string.uri": "El campo url debe ser una url válida.",
        })
    ),
    userId: Joi.string().hex().length(24).required().messages({
        "any.required": "El campo userId es obligatorio.",
        "string.base": "El campo userId debe ser un texto.",
        "string.empty": "El campo userId no puede estar vacío.",
        "string.hex": "El campo userId debe ser un ID válido.",
        "string.length": "El campo userId debe tener 24 caracteres."
    })
}).required().messages({
    "object.base": "La estructura debe contener un objeto.",
    "object.unknown": "Solo se aceptan los campos images y userId."
});

const postQuerySchema = Joi.object({
    userId: Joi.string().hex().length(24).messages({
        "string.base": "El parámetro userId debe ser un texto.",
        "string.empty": "El parámetro userId no puede estar vacío.",
        "string.hex": "El parámetro userId debe ser un ID válido.",
        "string.length": "El parámetro userId debe tener 24 caracteres."
    })
});

module.exports = {
  postSchema,
  editPostSchema,
  addImagesSchema,
  postQuerySchema,
};