import CKEditor from "@ckeditor/ckeditor5-react";
import BallonEditor from "@ckeditor/ckeditor5-build-balloon";
import { Dispatch, SetStateAction } from "react";

export interface TextEditorProps {
  data: string;
  setData: Dispatch<SetStateAction<any>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ data, setData }) => {
  return (
    <CKEditor
      editor={BallonEditor}
      data={data}
      onInit={(_editor: any) => {
        // You can store the "editor" and use when it is needed.
        // console.log("Editor is ready to use!", editor);
      }}
      onChange={(_event: any, editor: any) => {
        const data = editor.getData();
        setData(data);
        // console.log(event);
      }}
      // onBlur={(editor: any) => {
      //   console.log("Blur.", editor);
      // }}
      // onFocus={(editor: any) => {
      //   console.log("Focus.", editor);
      // }}
    />
  );
};

export default TextEditor;
