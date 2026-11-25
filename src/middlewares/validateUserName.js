const { userSchema } = require("../schemas/userSchemas");

const userNameValidate = (req, res, next) => {
  
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
    console.log(error)
    return res.status(400).json({ error: "Estructura inválida.", message: error.details[0].message });
    } 
    next();
  } catch (error) {
    res.status(500).json({message:"Ocurrió un error al validar el usuario."});
  }
  
};

module.exports = userNameValidate;