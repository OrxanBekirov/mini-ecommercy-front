import { useFormik } from "formik";
import { Box, TextField, Button, Card, CardContent, Typography } from "@mui/material";

const CategoryForm = ({ onSubmit, initialData, isEdit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            name: initialData?.name || "",
        },
        onSubmit: (values) => {
            onSubmit(values);
        },
        enableReinitialize: true,
    });

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6">
                    {isEdit ? "Edit Category" : "Add Category"}
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Category Name"
                        name="name"
                        margin="normal"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />

                    <Box sx={{ mt: 2 }}>
                        <Button type="submit" variant="contained">
                            {isEdit ? "Update" : "Save"}
                        </Button>

                        {isEdit && (
                            <Button sx={{ ml: 2 }} onClick={onCancel}>
                                Cancel
                            </Button>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CategoryForm;