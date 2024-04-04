import * as yup from "yup";
const RegisterSchema = yup.object().shape({
    username: yup.string()
    .min(3,"Username must be a minimum 3 characters")
    .max(15,"Username must be a maximum 15 characters")
    .required(),
    password: yup.string()
    .min(8,"Password must be a minimum 8 characters.")
    .max(32,"Password must be a maximum 8 characters.")
    .required(),
    passwordrepeat:yup.string()
    .min(8,"Password must be a minimum 8 characters.")
    .max(32,"Password must be a maximum 8 characters.")
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required()
});
export default RegisterSchema