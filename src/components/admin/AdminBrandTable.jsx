import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography
} from '@mui/material'
import React from 'react'

function AdminBrandTable({ brands, onEdit, onDelete }) {
    if (!brands || brands.length === 0) {
        return <Typography>Brand Tapilmadi</Typography>
    }
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {brands.map((brand) => (
                        <TableRow key={brand.id}>
                            <TableCell>{brand.id}</TableCell>
                            <TableCell>{brand.name}</TableCell>
                            <TableCell align="right">
                                <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => onEdit(brand)}>
                                    Edit
                                </Button>

                                <Button variant="contained" color="error" size="small" onClick={() => onDelete(brand.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminBrandTable