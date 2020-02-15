import { style, media } from "typestyle";
import { useAppContext } from "../../../lib/context";
import { FaqsType } from "../../../lib/interfaces/sites";

export interface FaqCardProps {
  faqs: FaqsType;
}

const FaqCard: React.FC<FaqCardProps> = ({ faqs }) => {
  const {
    mediaQuery: {
      isPhone,
      isTablet,
      isSmallMonitor,
      isMediumMonitor,
      isLargeMonitor
    }
  } = useAppContext();

  const gridWrapper = style(
    {
      $debugName: "faqs-container",
      display: "grid",
      gridGap: 5,
      marginBottom: -1,
      padding: 20
    },
    media(isPhone, { gridTemplateColumns: "repeat(1, 1fr)", padding: 5 }),
    media(isTablet, { gridTemplateColumns: "repeat(2, 1fr)" }),
    media(isSmallMonitor, { gridTemplateColumns: "repeat(3, 1fr)" }),
    media(isMediumMonitor, { gridTemplateColumns: "repeat(4, 1fr)" }),
    media(isLargeMonitor, { gridTemplateColumns: "repeat(4, 1fr)" })
  );
  const divStyle = style({
    $debugName: "faq-wrapper",
    border: "1px solid",
    borderRadius: 4,
    userSelect: "none",
    padding: "0px 10px 20px 20px",
    position: "relative",
    overflow: "hidden"
  });
  const timeStyle = style({
    $debugName: "faq-time",
    position: "absolute",
    bottom: "1rem",
    left: 20,
    fontSize: "0.8rem"
  });
  const articleStyle = style({
    $debugName: "faq-content",
    marginTop: "1.5rem",
    marginBottom: "2.5rem",
    fontSize: "1.3rem",
    position: "relative"
  });

  return (
    <div className={gridWrapper}>
      {faqs.map(({ _id, topic, markup, updatedAt }) => (
        <div title={topic} key={_id} className={divStyle}>
          <time dateTime={updatedAt} className={timeStyle}>
            {new Date(updatedAt).toLocaleDateString()} -{" "}
            {new Date(updatedAt).toLocaleTimeString()}
          </time>
          <article
            className={articleStyle}
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        </div>
      ))}
    </div>
  );
};

export default FaqCard;
