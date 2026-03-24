import * as Yup from 'yup'


export const chekoutSchema = Yup.object({
    shippingAddress: Yup.string().min(10, "Min 10 simbol").required("Unvan Teleb olunur"),
    note: Yup.string(200, "Max 200 simbol"),
    paymentMethod: Yup.string().required("Payment Methodu sec")
})