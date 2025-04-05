import * as yup from "yup";

const nameSchema = yup.string().required("Name is required");
const emailSchema = yup.string().email("Enter a valid email").required("Email is required");
const passwordSchema = yup.string().min(8, "Password must be at least 8 characters").required("Password is required");

export const loginSchema = yup.object({
    email: emailSchema,
    password: passwordSchema,
});

export const registerSchema = yup.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
});

export const accountEditSchema = yup.object({
    name: nameSchema,
});

const galleryNameSchema = yup.string().required("Gallery name is required");

export const galleryCreateSchema = yup.object({
    name: galleryNameSchema,
});

