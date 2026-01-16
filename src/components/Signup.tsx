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
import { signUpSchema, type SignUpInput } from "../utils/schema";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useUserStore } from "../store/userStore";
import styles from "./Signup.module.css";

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

const STORAGE_KEY = "users";

export const getUsers = (): any[] => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

const emailValidation = (email: string, users: any[]) => {
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase());
};

const saveUsers = (users: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export default function SignUp() {
  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const setUser = useUserStore((state) => state.setUser);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpInput) => {
    const { password, confirmPassword, email, ...rest } = data;

    const users = getUsers();

    if (emailValidation(email, users)) {
      setAlertMessage({
        type: "error",
        message: "User already exists!!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: uuid(),
      email,
      password: hashedPassword,
      ...rest,
    };
    users.push(newUser);
    saveUsers(users);

    // Store user in Zustand
    setUser(newUser);

    setAlertMessage({
      type: "success",
      message: "Account created successfully!!",
    });
    console.log("Saved to local storage:", newUser);
  };

  return (
    <>
      <Navbar />
      <CssBaseline />

      <div className={styles.signupContainer}>
        <Card variant="outlined" className={styles.card}>
          <Typography component="h1" variant="h4" className={styles.title}>
            Sign up
          </Typography>

          {alertMessage && (
            <Alert
              variant="filled"
              severity={alertMessage.type}
              className={styles.alert}
            >
              {alertMessage.message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            className={styles.form}
          >
            {/* First Name */}
            <FormControl className={styles.formControl}>
              <FormLabel className={styles.formLabel}>First name</FormLabel>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </FormControl>

            {/* Last Name */}
            <FormControl className={styles.formControl}>
              <FormLabel className={styles.formLabel}>Last name</FormLabel>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </FormControl>

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

            {/* Phone Number */}
            <FormControl className={styles.formControl}>
              <FormLabel className={styles.formLabel}>Phone number</FormLabel>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    type="tel"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
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

            {/* Confirm Password */}
            <FormControl className={styles.formControl}>
              <FormLabel className={styles.formLabel}>
                Confirm Password
              </FormLabel>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ""}
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    className={styles.textField}
                  />
                )}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className={styles.submitButton}
            >
              Sign up
            </Button>
          </Box>

          <Divider className={styles.divider} />

          <Typography className={styles.footerText}>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Log in
            </Link>
          </Typography>
        </Card>
      </div>
    </>
  );
}
