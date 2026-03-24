import * as Yup from 'yup'
export const registerSchema = Yup.object().shape({

    email: Yup.string().email("Email duzgun deyil").required("Email teleb olunur")
    ,
    password: Yup.string()
        .min(6, "Minimum 6 simvol")
        .required("Şifrə tələb olunur"),
    userName: Yup.string().required("UserName teleb olunur").min(3, "Min 3 simbol").max(30, "Max 30 simbol"),
    fullName: Yup.string().required("FullName teleb olunur").min(3, "Min 3 simbol").max(30, "Max 30 simbol")
})