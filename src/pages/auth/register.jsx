import { React, useState, useEffect } from 'react'
import { Button, Container, FormFeedback, Input } from 'reactstrap'
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(8).required(),
    password: yup.string().min(8).required(),
    retypePassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegPages = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            retypePassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: () => handleRegister()
    });

    const handleRegister = (e) => {
        console.log(e)
    }

    return (
        (<Container className="container-register">
            <div>Register</div>
            <form onSubmit={formik.handleSubmit}>
                {
                    Object.keys(formik.initialValues).map((key, index) => (
                        <div key={index} className="row-input">
                            <Input
                                type={key === "password" || key === "retypePassword" ? "password" : "text"}
                                id={key}
                                name={key}
                                placeholder={key}
                                value={formik.values[key]}
                                onChange={formik.handleChange}
                                invalid={formik.touched[key] && Boolean(formik.errors[key])}
                            />
                            {
                                formik.touched[key] && Boolean(formik.errors[key]) &&
                                <FormFeedback className="error-feedback">{formik.errors[key]}</FormFeedback>
                            }
                        </div>
                    ))
                }
                <Button className="btn-submit" type="submit">
                    Register
                </Button>
            </form>
        </Container >)
    );
}

export default RegPages;