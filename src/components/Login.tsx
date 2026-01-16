import {
  Box,
  Button,
  CssBaseline,
  Divider,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
  Card as MuiCard,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "./ui/Navbar";
import { loginSchema, type LoginInput } from "../utils/schema";
import bcrypt from "bcryptjs";
import { getUsers } from "./Signup";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useUserStore } from "../store/userStore";
import styles from "./Login.module.css";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "0px 5px 15px rgba(0, 0, 0, 0.05), 0px 15px 35px -5px rgba(0, 0, 0, 0.05)",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const { password, email } = data;
    setErrorMessage(null);
    setSuccessMessage(null);

    const users = getUsers();

    const user = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setErrorMessage("The email does not exist!!");
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      setErrorMessage("Incorrect Password!!");
      return;
    }

    setUser(user);
    setSuccessMessage("Logged in successfully!!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <Navbar />
      <CssBaseline />

      <div className={styles.loginContainer}>
        <Card variant="outlined" className={styles.card}>
          <Typography component="h1" variant="h4" className={styles.title}>
            Log in
          </Typography>

          {errorMessage && (
            <Alert variant="filled" severity="error" className={styles.alert}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert variant="filled" severity="success" className={styles.alert}>
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
          >
            {/* Email */}
            <FormControl className={styles.formControl}>
              <FormLabel className={styles.formLabel}>Email</FormLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FormControl>

            {/* Password */}
            <FormControl className={styles.formControl}>
              <FormLabel className={styles.formLabel}>Password</FormLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </FormControl>

            <Button type="submit" variant="contained" fullWidth className={styles.submitButton}>
              Log in
            </Button>
          </Box>

          <Divider className={styles.divider} />

          <Typography textAlign="center" className={styles.footerText}>
            Don't have an account? <Link href="/signup">Sign up</Link>
          </Typography>
        </Card>
      </div>
    </>
  );
}
