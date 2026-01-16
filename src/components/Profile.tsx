import { useUserStore } from "../store/userStore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "./ui/Navbar";
import { Button, Box, Typography, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { getUsers } from "./Signup";
import bcrypt from "bcryptjs";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClickOpenEmail = () => {
    setOpenEmail(true);
  };

  const handleCloseEmail = () => {
    setOpenEmail(false);
    setError(null);
  };

  const handleClickOpenPass = () => {
    setOpenPass(true);
  };

  const handleClosePass = () => {
    setOpenPass(false);
    setError(null);
  };

  const handleSubmitPass = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const oldPass = formJson.oldPass as string;
    const newPass = formJson.newPass as string;
    const confirmNewPass = formJson.confirmNewPass as string;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,32}$/;
    if (!passwordRegex.test(newPass)) {
      setError(
        "Password must be 8-32 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    if (newPass !== confirmNewPass) {
      setError("New passwords do not match.");
      return;
    }

    if (user) {
      const isMatch = await bcrypt.compare(oldPass, user.password);
      if (!isMatch) {
        setError("Old password is incorrect.");
        return;
      }

      const users = getUsers();
      const hashedPassword = await bcrypt.hash(newPass, 10);

      const updatedUser = { ...user, password: hashedPassword };
      setUser(updatedUser);

      const updatedUsers = users.map((u: any) =>
        u.id === user.id ? { ...u, password: hashedPassword } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      handleClosePass();
    }
  };

  const handleSubmitEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const email = formJson.email as string;

    if (user) {
      const users = getUsers();

      // Check if email is already taken by another user
      const emailExists = users.some(
        (u: any) =>
          u.email.toLowerCase() === email.toLowerCase() && u.id !== user.id
      );

      if (emailExists) {
        setError("This email is already registered to another account.");
        return;
      }

      // 1. Update global state (sessionStorage via Zustand)
      const updatedUser = { ...user, email };
      setUser(updatedUser);

      // 2. Update permanent storage (localStorage 'users' array)
      const updatedUsers = users.map((u: any) =>
        u.id === user.id ? { ...u, email } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }

    handleCloseEmail();
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Paper elevation={3} sx={{ width: "100%", maxWidth: 600, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              Profile Details
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table aria-label="user info table">
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "none",
                      width: "40%",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>{`${
                    user?.firstName || ""
                  } ${user?.lastName || ""}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {user?.email || ""}
                  </TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleClickOpenEmail}
                  >
                    Edit
                  </Button>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", borderBottom: "none" }}>
                    Phone Number
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {user?.phoneNumber || ""}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleClickOpenPass}
          >
            Change Password
          </Button>
        </Paper>
      </Box>
      <Dialog open={openEmail} onClose={handleCloseEmail}>
        <DialogTitle>Change Email Address</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmitEmail} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              // defaultValue={user?.email || ""}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmail}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openPass} onClose={handleClosePass}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmitPass} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="oldPass"
              name="oldPass"
              label="Old password"
              type="password"
              fullWidth
              variant="standard"
              // defaultValue={user?.email || ""}
            />
            <TextField
              required
              margin="dense"
              id="newPass"
              name="newPass"
              label="New password"
              type="password"
              fullWidth
              variant="standard"
              // defaultValue={user?.email || ""}
            />
            <TextField
              required
              margin="dense"
              id="confirmNewPass"
              name="confirmNewPass"
              label="Confirm password"
              type="password"
              fullWidth
              variant="standard"
              // defaultValue={user?.email || ""}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePass}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
