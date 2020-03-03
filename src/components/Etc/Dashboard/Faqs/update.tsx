import { useState, FormEvent } from "react";
import Axios from "axios";
import { FaqType } from "../../../../lib/interfaces/sites";
import dynamic from "next/dynamic";
import { inputStyle, buttonStyle } from "./styles";

const TextEditor = dynamic(() => import("../../../Utils/TextEditor"), {
  ssr: false,
  loading: () => <div>Loding Editor...</div>
});

type UpdateFaqType = {
  items: FaqType;
  revalidate: () => Promise<boolean>;
  index: number;
};

const UpdateFaq: React.FC<UpdateFaqType> = ({
  revalidate,
  items: { _id, topic, markup, createdAt, updatedAt }
}) => {
  const [faqsField, setFaqsField] = useState<FaqType>({
    _id,
    topic,
    markup,
    createdAt,
    updatedAt
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios.patch("/api/v1/sites/faq", faqsField)
      .then(() => revalidate())
      .catch(err => {
        throw err;
      });
  };
  const handleDelete = () => {
    Axios.delete(`/api/v1/sites/faq?id=${_id}`)
      .then(() => revalidate())
      .catch(err => {
        throw err;
      });
  };

  return (
    <form onSubmit={e => onSubmit(e)} style={{ display: "inline-block" }}>
      <TextEditor
        data={markup}
        setData={v => setFaqsField({ ...faqsField, markup: v })}
      />
      <input
        className={inputStyle}
        type="text"
        defaultValue={faqsField.topic}
        onChange={e => setFaqsField({ ...faqsField, topic: e.target.value })}
      />
      <button className={buttonStyle} type="submit">
        Update
      </button>
      <button className={buttonStyle} onClick={handleDelete}>
        Delete
      </button>
    </form>
  );
};

export default UpdateFaq;
