import * as Yup from 'yup'
export const loginSchema = Yup.object().shape({

    email: Yup.string().email("Email duzgun deyil").required("Email teleb olunur")
    ,
    password: Yup.string()
        .min(6, "Minimum 6 simvol")
        .required("Şifrə tələb olunur"),
})