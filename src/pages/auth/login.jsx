import { React } from "react";
import { FormFeedback, Input } from "reactstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { authLogin } from "../../service/auth";
import { FcLock } from "react-icons/fc";

const validationSchema = yup.object().shape({
  username: yup.string().min(6).required("user id cannot be empty"),
  password: yup.string().min(8).required("password cannot be empty"),
});

const Login = ({ setCurrentContainer }) => {
  const handleLogin = async (e) => {
    const { status, data } = await authLogin(formik.values);
    const token = data.token;
    const id = data.id;
    if (status === 200) {
      sessionStorage.setItem("logged", true);
      sessionStorage.setItem("x-auth", token);
      sessionStorage.setItem("id", id);

      window.location = "/profile";
      alert(`Wellcome back ${data.fullname}`);
    } else {
      alert(data.error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => handleLogin(),
  });

  return (
    <div className="maincontainer">
      <div className="container">
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Login</h4>
            <form onSubmit={formik.handleSubmit}>
              {Object.keys(formik.initialValues).map((key, index) => (
                <div key={index} className="row-input form-group input-group">
                  {key === "username" && (
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
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
                  <Input
                    type={key === "password" ? "password" : "text"}
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
              <button className="btn-login btn-block" type="submit">
                Login
              </button>
              <button
                type="button"
                className="btn-create btn-block"
                onClick={() => setCurrentContainer(true)}
              >
                Create Account
              </button>
            </form>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Login;
