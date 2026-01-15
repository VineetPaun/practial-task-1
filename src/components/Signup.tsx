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
  Stack,
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

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "100dvh",
  padding: theme.spacing(2),
  justifyContent: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,
    backgroundImage:
      "radial-gradient(ellipse at center, hsl(210, 100%, 97%), white)",
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

      <SignUpContainer>
        <Card variant="outlined">
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>

          {alertMessage && (
            <Alert variant="filled" severity={alertMessage.type}>
              {alertMessage.message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* First Name */}
            <FormControl>
              <FormLabel>First name</FormLabel>
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
            <FormControl>
              <FormLabel>Last name</FormLabel>
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
            <FormControl>
              <FormLabel>Email</FormLabel>
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
            <FormControl>
              <FormLabel>Phone number</FormLabel>
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
            <FormControl>
              <FormLabel>Password</FormLabel>
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
            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
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
                  />
                )}
              />
            </FormControl>

            <Button type="submit" variant="contained" fullWidth>
              Sign up
            </Button>
          </Box>

          <Divider />

          <Typography textAlign="center">
            Already have an account? <Link href="/login">Log in</Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </>
  );
}
