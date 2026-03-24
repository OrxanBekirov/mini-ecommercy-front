import { useEffect } from "react";
import { useFormik } from "formik";
import { Box, TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { brandSchema } from "../../validation/schemas/brandSchemas";

const BrandForm = ({ onSubmit, loading = false, initialData = null, isEdit = false, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validationSchema: brandSchema,
        onSubmit: (values, actions) => {
            onSubmit(values);
            actions.resetForm();
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (initialData) {
            formik.setValues({
                name: initialData.name || "",
            });
        }
    }, [initialData]);

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isEdit ? "Edit Brand" : "Add Brand"}
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Brand Name"
                        name="name"
                        margin="normal"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button type="submit" variant="contained" disabled={loading || formik.isSubmitting}>
                            {loading ? "Saving..." : isEdit ? "Update Brand" : "Save Brand"}
                        </Button>

                        {isEdit && (
                            <Button variant="outlined" onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BrandForm;