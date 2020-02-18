import { FormEvent, useState } from "react";
import Axios from "axios";
import dynamic from "next/dynamic";
import { inputStyle, buttonStyle } from "./styles";

export interface AddFaqProps {
  revalidate: () => Promise<boolean>;
}

const TextEditor = dynamic(() => import("../../../Utils/TextEditor"), {
  ssr: false,
  loading: () => <div>Loding Editor...</div>
});

const AddFaq: React.FC<AddFaqProps> = ({ revalidate }) => {
  const [faq, setFaq] = useState<{ topic: string; markup: string }>({
    topic: "Topic name...",
    markup: "Create new faq topic."
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      Axios.post("/api/v1/sites/faq", faq).then(() => revalidate());
    } catch (error) {
      throw error;
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <TextEditor
        data={faq.markup}
        setData={v => setFaq({ ...faq, markup: v })}
      />
      <input
        className={inputStyle}
        type="text"
        placeholder="Add new topic"
        defaultValue={faq.topic}
        onChange={e => setFaq({ ...faq, topic: e.target.value })}
      />
      <button type="submit" className={buttonStyle}>
        Update
      </button>
    </form>
  );
};

export default AddFaq;
