import { React } from "react";
import { Button, FormFeedback, Input } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { authRegister } from "../../service/auth";
import { FcHome, FcIphone, FcLock } from "react-icons/fc";

const validationSchema = yup.object().shape({
  username: yup.string().min(6).required(),
  fullname: yup.string().required(),
  address: yup.string().max(255).required(),
  phonenumber: yup
    .string()
    .min(9)
    .matches(/^08[1-9][0-9]*/, "Phone number is not valid"),
  password: yup.string().min(8).required(),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
const RegPages = ({ setCurrentContainer }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      address: "",
      phonenumber: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleRegister(),
  });

  const handleRegister = async (e) => {
    const { status, data } = await authRegister(formik.values);
    if (status === 200) {
      setCurrentContainer(false);
      window.location = "/";
      alert(data.register);
    } else {
      alert(data.item);
    }
  };
  return (
    <div className="maincontainer">
      <div className="container">
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <p className="text-center">Get started with your free account</p>
            <form onSubmit={formik.handleSubmit}>
              {Object.keys(formik.initialValues).map((key, index) => (
                <div key={index} className="row-input form-group input-group">
                  {key === "phonenumber" && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FcIphone />
                      </span>
                    </div>
                  )}
                  {key === "password" && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <FcLock />
                      </span>
                    </div>
                  )}
                  {key === "username" && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <i className="fa fa-user"></i>{" "}
                      </span>
                    </div>
                  )}
                  {key === "repassword" && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <FcLock />
                      </span>
                    </div>
                  )}
                  {key === "retypePassword" && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <FcLock />
                      </span>
                    </div>
                  )}
                  {key === "address" && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FcHome />
                      </span>
                    </div>
                  )}
                  <Input
                    type={
                      key === "password" || key === "retypePassword"
                        ? "password"
                        : "text"
                    }
                    id={key}
                    name={key}
                    placeholder={key}
                    onChange={formik.handleChange}
                    invalid={formik.touched[key] && Boolean(formik.errors[key])}
                  />
                  {formik.touched[key] && Boolean(formik.errors[key]) && (
                    <FormFeedback className="error-feedback">
                      {formik.errors[key]}
                    </FormFeedback>
                  )}
                </div>
              ))}
              <Button className="btn-reg btn-block" type="submit">
                Register
              </Button>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
};

export default RegPages;
