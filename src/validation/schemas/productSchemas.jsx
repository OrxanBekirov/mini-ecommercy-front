import * as Yup from "yup"

export const productSchema = Yup.object({
    name: Yup.string()
        .min(2, "Minimum 2 simvol")
        .max(100, "Maksimum 100 simvol")
        .required("Name tələb olunur"),
    description: Yup.string()
        .min(2, "Minimum 2 simvol")
        .max(100, "Maksimum 100 simvol")
        .required("Description tələb olunur"),
    stockQuantity: Yup.number()
        .typeError("Stock rəqəm olmalıdır")
        .integer("Tam ədəd olmalıdır")
        .min(0, "Minimum 0")
        .required("Stock tələb olunur"),
    price: Yup.number().typeError("Price reqem olmalidir")
        .positive("Price sifirdan boyuk olmalidir").required("Price teleb olunur"),
    brandId: Yup.number()
        .typeError("Brand seçilməlidir")
        .positive("Brand seçilməlidir")
        .required("Brand tələb olunur"),

    categoryId: Yup.number()
        .typeError("Category seçilməlidir")
        .positive("Category seçilməlidir")
        .required("Category tələb olunur"),
})