// calcula la fecha desde la cual los comentarios se muestran
// la usan el virtual "comments" del post y el virtual "visible" del comentario
const fechaLimiteComentarios = () => {
    const meses = Number(process.env.COMENTARIOS_MESES_MAXIMOS || 6);

    // si no está configurado o no es un número válido, usa 6
    const mesesMaximos = meses >= 0 ? meses : 6;

    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() - mesesMaximos);
    return fechaLimite;
};

module.exports = fechaLimiteComentarios;
