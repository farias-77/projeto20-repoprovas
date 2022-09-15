import joi from "joi";

export const testSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required()
});