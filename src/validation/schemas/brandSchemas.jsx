import * as Yup from 'yup'


export const brandSchema = Yup.object({
    name: Yup.string().min(2, "Min 2 Simbol").max(50, "Max 50 Simbol").required("Brend name teleb olunur")
})