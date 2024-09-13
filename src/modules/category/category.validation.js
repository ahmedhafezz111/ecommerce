import Joi from "joi"

const addCategoryValidation  = Joi.object({
    name:Joi.string().min(1).max(50).required(),
})

export {
    addCategoryValidation
}