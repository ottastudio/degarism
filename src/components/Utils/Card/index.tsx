import Link from "next/link";
import { style, media } from "typestyle";
import HorizontalAnimate from "./horizontalAnimate";

export interface CardProps {
  href: string;
  asPath?: string | undefined;
  label: string;
}

const Card: React.FC<CardProps> = ({ href, asPath, label }) => {
  const linkClass = style(
    {
      $debugName: "card-link",
      height: 180,
      borderBottom: "1px solid",
      marginTop: -1,
      overflow: "hidden",
      position: "relative",
      display: "block",
      userSelect: "none"
    },
    media({ maxWidth: 767 }, { height: 120 })
  );
  return (
    <Link href={href} as={asPath}>
      <a className={linkClass}>
        <HorizontalAnimate label={label} />
      </a>
    </Link>
  );
};

export default Card;
