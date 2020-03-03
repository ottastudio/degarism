import { style } from "typestyle";

export interface FormBlockProps {
  id: string;
  name: string;
  type: "email" | "password" | "text" | "number" | "tel" | "url";
  onChange: any;
  value: string | number | string[] | undefined;
  placeholder: string;
  errors: any;
}

const FormBlock: React.SFC<FormBlockProps> = ({
  id,
  name,
  type,
  onChange,
  value,
  placeholder,
  errors
}) => {
  const divStyle = style({
    $debugName: "form-block",
    position: "relative",
    display: "block",
    color: errors ? "red" : "currentColor"
  });
  const labelStyle = style({
    $debugName: "input-label",
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)",
    fontSize: "0.8rem",
    color: "inherit"
  });
  const inputStyle = style({
    $debugName: "form-input",
    appearance: "none",
    "-webkit-appearance": "none",
    width: "100%",
    height: 40,
    background: "none",
    color: "inherit",
    border: "none",
    borderBottom: "2px solid",
    fontSize: "inherit",
    fontFamily: "inherit",
    $nest: {
      "&:focus": {
        borderColor: errors ? "inherit" : "lime",
        $nest: {
          "&::placeholder": {
            color: "transparent"
          }
        }
      }
    }
  });

  return (
    <div className={divStyle}>
      <label className={labelStyle} htmlFor={id}>
        {errors}
      </label>
      <input
        className={inputStyle}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormBlock;
