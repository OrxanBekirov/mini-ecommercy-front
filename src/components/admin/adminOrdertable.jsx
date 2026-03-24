import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";

const AdminOrderTable = ({ orders, onStatusChange }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Order Number</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.orderNumber}</TableCell>
                            <TableCell>{order.totalAmount} ₼</TableCell>
                            <TableCell>{order.orderStatus}</TableCell>

                            <TableCell align="right">
                                {/* Preparing = 6 */}
                                <Button
                                    variant={order.orderStatus === 6 || order.orderStatus === "Preparing" ? "contained" : "outlined"}
                                    size="small"
                                    color="warning"
                                    sx={{ mr: 1 }}
                                    onClick={() => onStatusChange(order.id, 6)}
                                >
                                    Preparing
                                </Button>

                                {/* Shipped = 3 */}
                                <Button
                                    variant={order.orderStatus === 3 || order.orderStatus === "Shipped" ? "contained" : "outlined"}
                                    size="small"
                                    color="info"
                                    sx={{ mr: 1 }}
                                    onClick={() => onStatusChange(order.id, 3)}
                                >
                                    Shipped
                                </Button>

                                {/* Delivered = 4 */}
                                <Button

                                    size="small"
                                    variant={order.orderStatus === 4 || order.orderStatus === "Delivered" ? "contained" : "outlined"}
                                    color="success"
                                    onClick={() => onStatusChange(order.id, 4)}
                                >
                                    Delivered
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminOrderTable;