
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/Auth/authSlice'
import { loginRequest } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import { loginSchema } from '../validation/schemas/loginSchemas'
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false)


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {
            try {
                const res = await loginRequest(values);

                const token =
                    res.data.data?.token || res.data.token || res.data.accessToken;

                dispatch(setCredentials(token));
                navigate("/"); // istəsən /products yazarıq
                action.resetForm();
            } catch (error) {
                action.setSubmitting(false);
                alert("Email ve ya sifre yanlisdir")
            }
        }
    })


    return (
        <>
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
                            Login
                        </Typography>


                        <Box component="form" onSubmit={formik.handleSubmit}>
                            <TextField
                                label="Email"
                                name='email'
                                fullWidth
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
                                name='password'
                                margin="normal"
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

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Loding..." : "Login"}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}

export default LoginPage