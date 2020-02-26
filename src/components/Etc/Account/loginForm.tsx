import Axios, { AxiosResponse } from "axios";
import { Formik, Form, FormikValues, FormikHelpers } from "formik";
import { loginHandler } from "../../../lib/helper/loginHandler";
import FormBlock from "../../Utils/Form";
import { formStyle, buttonStyle } from "../../../styles/accountStyle";

const LoginForm: React.FC<{}> = () => {
  const onSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<{ email: string; password: string }>
  ) => {
    await Axios.put("/api/v2/users/login", values).then(
      (res: AxiosResponse) => {
        if (res.data.success) {
          const {
            loggedIn: { token }
          } = res.data;
          loginHandler(token);
          actions.resetForm();
        } else {
          actions.setErrors({
            email: res.data.message.email,
            password: res.data.message.password
          });
        }
      }
    );
  };

  return (
    <span className={formStyle}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <FormBlock
              id="login-email"
              name="email"
              type="email"
              placeholder="Email..."
              onChange={handleChange}
              value={values.email}
              errors={errors.email && touched.email && errors.email}
            />
            <FormBlock
              id="login-password"
              name="password"
              type="password"
              placeholder="••••••"
              onChange={handleChange}
              value={values.password}
              errors={errors.password && touched.password && errors.password}
            />
            <button className={buttonStyle} type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </span>
  );
};

export default LoginForm;
