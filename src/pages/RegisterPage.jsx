import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../api/authApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerSchema } from "../validation/schemas/registerSchemas";
import { useFormik } from 'formik'
import {
    Box, TextField,
    Button,
    Typography,
    Card,
    CardContent,
    IconButton,
    InputAdornment
} from '@mui/material'
function RegisterPage() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            userName: "",
            fullName: " "

        },
        validationSchema: registerSchema,
        onSubmit: async (values, actions) => {
            try {
                await registerRequest(values);
                alert("Qeydiyyat uğurlu oldu. İndi login ola bilərsən.");
                actions.resetForm();
                navigate("/login")


            } catch (error) {
                actions.setSubmitting(false);
                alert("Register alinmadi.Email istifade olunmus ola biler")
            }
        }

    })
    return (
        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Card sx={{ width: 400, p: 2 }}>
                <CardContent>
                    <Typography variant="h5" align="center" gutterBottom>
                        Register
                    </Typography>

                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Username"
                            fullWidth
                            name="userName"
                            margin="normal"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                        />
                        <TextField
                            label="FullName"
                            fullWidth
                            name="fullName"
                            margin="normal"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            name="email"
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            margin="normal"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }} disabled={formik.isSubmitting} >

                            {formik.isSubmitting ? "Loding.." : "Register"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default RegisterPage