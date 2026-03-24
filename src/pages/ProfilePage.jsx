import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    Avatar,
    Alert,
} from "@mui/material";
import { uploadProfileImageThunk } from '../features/Auth/authSlice';

function ProfilePage() {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((store) => store.auth);

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const result = await dispatch(uploadProfileImageThunk(selectedFile));
        if (uploadProfileImageThunk.fulfilled.match(result)) {
            setSelectedFile(null);
            setPreview(null);
            alert("Profil şəkli yeniləndi!");
        }
    };
    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Profil
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                        <Avatar
                            src={preview || user?.profileImageUrl || ""}
                            sx={{ width: 120, height: 120 }}
                        >
                            {user?.fullName ? user.fullName[0].toUpperCase() : "U"}
                        </Avatar>
                    </Box>

                    <Typography sx={{ mb: 1 }}>
                        <strong>Ad:</strong> {user?.fullName}
                    </Typography>

                    <Typography sx={{ mb: 2 }}>
                        <strong>Email:</strong> {user?.email}
                    </Typography>

                    <input type="file" accept="image/*" onChange={handleFileChange} />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? "Yüklənir..." : "Profil şəklini yenilə"}
                    </Button>

                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                </CardContent>
            </Card>
        </Box>
    )
}

export default ProfilePage