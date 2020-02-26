import { Formik, Form } from "formik";
import FormBlock from "../../Utils/Form";
import { formStyle, buttonStyle } from "../../../styles/accountStyle";

const LoginForm: React.FC<{}> = () => {
  return (
    <span className={formStyle}>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={values => alert(JSON.stringify(values, null, 2))}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <FormBlock
              id="register-name"
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
              value={values.email}
              errors={errors.email && touched.email && errors.email}
            />
            <FormBlock
              id="register-email"
              name="email"
              type="email"
              placeholder="john@doe.com"
              onChange={handleChange}
              value={values.email}
              errors={errors.email && touched.email && errors.email}
            />
            <FormBlock
              id="register-password"
              name="password"
              type="password"
              placeholder="••••••"
              onChange={handleChange}
              value={values.password}
              errors={errors.password && touched.password && errors.password}
            />
            <button className={buttonStyle} type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </span>
  );
};

export default LoginForm;
