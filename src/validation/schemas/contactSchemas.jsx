import * as Yup from 'yup'

export const contactSchema = Yup.object({
    Name: Yup.string()
        .required("Ad boş ola bilməz")
        .max(100, "Ad maksimum 100 simvol ola bilər"),

    Email: Yup.string()
        .email("Email formatı düzgün deyil")
        .required("Email boş ola bilməz"),

    Subject: Yup.string()
        .required("Mövzu boş ola bilməz")
        .max(150, "Mövzu maksimum 150 simvol"),

    Message: Yup.string()
        .required("Mesaj boş ola bilməz")
        .min(5, "Mesaj minimum 5 simvol")
})