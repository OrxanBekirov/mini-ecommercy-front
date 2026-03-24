import { useFormik } from "formik";
import { productSchema } from "../validation/schemas/productSchemas"

import {
    Box,
    TextField,
    Button,
    MenuItem,
    Card,
    CardContent,
    Typography,
} from "@mui/material";


const ProductForm = ({
    onSubmit,
    brands = [],
    categories = [],
    loading = false,
    isEdit = null,
    initialData = null,
    onCancel,
}) => {
    const formik = useFormik({

        initialValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            price: initialData?.price || "",
            stockQuantity: initialData?.stockQuantity || "",
            brandId: initialData?.brandId || "",
            categoryId: initialData?.categoryId ? String(initialData.categoryId) : "",
        },
        validationSchema: productSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            onSubmit({
                ...values,
                price: Number(values.price),
                stockQuantity: Number(values.stockQuantity),
                brandId: Number(values.brandId),
                categoryId: Number(values.categoryId),
            });
            if (!isEdit) {
                actions.resetForm();
            }
        },

    });

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isEdit ? "Edit Product" : "Add Product"}
                </Typography>

                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        margin="normal"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        margin="normal"
                        multiline
                        rows={3}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.description && Boolean(formik.errors.description)
                        }
                        helperText={formik.touched.description && formik.errors.description}
                    />

                    <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        margin="normal"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                    />

                    <TextField
                        fullWidth
                        label="Stock Quantity"
                        name="stockQuantity"
                        margin="normal"
                        value={formik.values.stockQuantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.stockQuantity &&
                            Boolean(formik.errors.stockQuantity)
                        }
                        helperText={
                            formik.touched.stockQuantity && formik.errors.stockQuantity
                        }
                    />

                    <TextField
                        select
                        fullWidth
                        label="Brand"
                        name="brandId"
                        margin="normal"
                        value={formik.values.brandId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.brandId && Boolean(formik.errors.brandId)}
                        helperText={formik.touched.brandId && formik.errors.brandId}
                    >
                        {brands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="Category"
                        name="categoryId"
                        margin="normal"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.categoryId && Boolean(formik.errors.categoryId)
                        }
                        helperText={formik.touched.categoryId && formik.errors.categoryId}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={loading || formik.isSubmitting}
                    >
                        {loading ? "Saving..." : isEdit ? "Update Product" : "Save Product"}

                    </Button>
                    {isEdit && (
                        <Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductForm;