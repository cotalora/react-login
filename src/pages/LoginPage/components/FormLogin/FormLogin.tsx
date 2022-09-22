import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    InputLabel,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../../../store/slices/login";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Messages } from "../../../../enums/messages.enum";
import './FormLogin.scss'

export const FormLogin = () => {
    const dispatch = useDispatch(); 

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(Messages.EmailInvalid)
            .required(Messages.Required),
        password: Yup.string()
            .required(Messages.Required)
            .min(8, Messages.PasswordMinLength)
            .max(20, Messages.PasswordMaxLength),
    })

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(event: any) => {
                event = {
                    ...event,
                    isLogged: true,
                }
                dispatch(login(event));
            }}
        >
            {({ touched, errors, getFieldProps }) => (
                <Form>
                    <Box className="form-control">
                        <InputLabel htmlFor="email" className="form-control-label">
                            Correo electrónico
                        </InputLabel>
                        <TextField
                            id="email"
                            error={touched.email && errors.email ? true : false}
                            variant="outlined"
                            type="email"
                            className="form-control-input"
                            helperText={touched.email && errors.email}
                            {...getFieldProps("email")}
                        />
                    </Box>
                    <Box className="form-control">
                        <InputLabel htmlFor="password" className="form-control-label">
                            Contraseña
                        </InputLabel>
                        <TextField
                            id="password"
                            error={touched.password && errors.password ? true : false}
                            variant="outlined"
                            type="password"
                            className="form-control-input"
                            helperText={touched.password && errors.password}
                            {...getFieldProps("password")}
                        />
                    </Box>
                    <Box className="form-control">
                        <FormControlLabel
                            className="form-control-checkbox"
                            control={
                                <Checkbox
                                    disableRipple={true}
                                    className="checkbox"
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#3C37FF",
                                        },
                                    }}
                                />
                            }
                            label="Recordar información"
                        />
                    </Box>
                    <Button type="submit" className="button-principal button-mbt-10">
                        Iniciar sesión
                    </Button>
                    <Typography className="register-text" variant="body2">
                        ¿Aún no tienes una cuenta?
                        <Link className="register-anchor" href="#">Registrate</Link>
                    </Typography>
                </Form>
            )}
        </Formik>
    );
};
