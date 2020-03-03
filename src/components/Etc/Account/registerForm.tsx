import { Formik, Form, FormikValues, FormikHelpers } from "formik";
import FormBlock from "../../Utils/Form";
import { formStyle, buttonStyle } from "../../../styles/accountStyle";
import Axios from "axios";

const LoginForm: React.FC<{}> = () => {
  const onSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<any>
  ) => {
    await Axios.post("/api/v3/user/register", values).then(res => {
      if (res.status === 201) {
        alert(JSON.stringify(res.data, null, 2));
        return actions.resetForm();
      } else {
        const {
          message: {
            email,
            password,
            name: { first_name, last_name }
          }
        } = res.data;

        return actions.setErrors({
          email,
          password,
          name: { first_name, last_name }
        });
      }
    });
  };

  return (
    <span className={formStyle}>
      <Formik
        initialValues={{
          name: { first_name: "", last_name: "" },
          email: "",
          password: "",
          subscribe: false
        }}
        onSubmit={(values, actions) => onSubmit(values, actions)}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <div style={{ display: "flex" }}>
              <FormBlock
                id="register-first-name"
                name="name.first_name"
                type="text"
                placeholder="John"
                onChange={handleChange}
                value={values.name.first_name}
                errors={
                  errors.name?.first_name &&
                  touched.name?.first_name &&
                  errors.name?.first_name
                }
              />
              <FormBlock
                id="register-last-name"
                name="name.last_name"
                type="text"
                placeholder="Doe"
                onChange={handleChange}
                value={values.name.last_name}
                errors={
                  errors.name?.last_name &&
                  touched.name?.last_name &&
                  errors.name?.last_name
                }
              />
            </div>

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

            <div>
              <label>
                <input
                  id="register-subcscribe"
                  name="subscribe"
                  type="checkbox"
                  checked={values.subscribe}
                  onChange={handleChange}
                />
                Newsletter?
              </label>
            </div>
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
