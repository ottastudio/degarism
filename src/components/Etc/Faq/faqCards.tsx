import { style, media } from "typestyle";

const divstyle = style(
  {
    $debugName: "question-answer",
    padding: "0px 20px 0px 20px",
    borderBottom: "1px solid",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: -1
  },
  media({ maxWidth: 767 }, { padding: "5px 5px 0px 5px" })
);
const titleStyle = style(
  {
    $debugName: "question-answer-title",
    width: "25%",
    paddingTop: 20,
    fontSize: "2.5rem",
    fontWeight: "bold",
    lineHeight: 0.9
  },
  media({ maxWidth: 767 }, { width: "100%", marginBottom: "0rem" })
);
const qaStyle = style(
  {
    $debugName: "list-container",
    width: "75%",
    paddingTop: 20,
    borderLeft: "1px solid"
  },
  media({ maxWidth: 767 }, { width: "100%", borderLeft: "none" })
);
const ulStyle = style(
  {
    $debugName: "list-wrapper",
    listStyle: "none",
    position: "relative",
    margin: "0rem 0rem 2.5rem 0rem",
    padding: "0px 0px 0px 0.85rem"
  },
  media({ maxWidth: 767 }, { padding: 0, margin: "0px 0px 2rem 0px" })
);
const qStyle = style(
  {
    $debugName: "list-question",
    fontSize: "2.5rem",
    lineHeight: 0.9,
    marginBottom: "0.5rem"
  },
  media({ maxWidth: 767 }, { fontSize: "1.5rem" })
);
const aStyle = style({
  $debugName: "list-answer",
  fontWeight: 500
});

export interface FaqCardProps {
  items: any[] | undefined;
  title: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ items, title }) => {
  return (
    <div className={divstyle}>
      <span className={titleStyle}>{title}</span>
      <span className={qaStyle}>
        {items?.map(({ _id, question, answer }) => (
          <ul key={_id} className={ulStyle}>
            <li className={qStyle}>
              <strong>{question}</strong>
            </li>
            <li
              className={aStyle}
              dangerouslySetInnerHTML={{ __html: `"${answer}"` }}
            />
          </ul>
        ))}
      </span>
    </div>
  );
};

export default FaqCard;
