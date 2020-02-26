import Link from "next/link";
import { style, media } from "typestyle";
import HorizontalAnimate from "./cardItemContent";

export interface CardItemProps {
  href: string;
  asPath?: string | undefined;
  label: string;
}

const CardItem: React.FC<CardItemProps> = ({ href, asPath, label }) => {
  const linkClass = style(
    {
      $debugName: "CardItem-link",
      height: 180,
      width: "calc(100vw + 2rem)",
      borderBottom: "1px solid",
      borderTop: "1px solid",
      marginTop: -1,
      marginLeft: "-1rem",
      overflow: "hidden",
      position: "relative",
      display: "block",
      userSelect: "none",
      color: "currentColor",
      transform: "rotate(-4deg)",
      transformOrigin: "left bottom",
      transformStyle: "preserve-3d"
    },
    media({ maxWidth: 767 }, { height: 120 })
  );
  return (
    <Link href={href} as={asPath}>
      <a className={`${linkClass} CardItem-link`}>
        <HorizontalAnimate label={label} />
        <style jsx global>{`
          @keyframes slide-right {
            0% {
              transform: translate(calc(-100% + 100vw), -50%);
            }
            50% {
              transform: translate(-5%, -50%);
            }
            100% {
              transform: translate(calc(-100% + 100vw), -50%);
            }
          }
          @keyframes slide-left {
            0% {
              transform: translate(-5%, -50%);
            }
            50% {
              transform: translate(calc(-100% + 100vw), -50%);
            }
            100% {
              transform: translate(-5%, -50%);
            }
          }
          .CardItem-link:nth-child(odd) > span {
            animation-name: slide-right;
          }
          .CardItem-link:nth-child(even) > span {
            animation-name: slide-left;
          }
          .CardItem-link:nth-child(odd) > span,
          .CardItem-link:nth-child(even) > span {
            white-space: nowrap;
            font-size: 10.4rem;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-weight: 800;
            animation-duration: 100s;
            animation-timing-function: cubic-bezier(1, 0, 0.5, 1);
            animation-iteration-count: infinite;
          }
          .CardItem-link:nth-child(odd) > span:hover,
          .CardItem-link:nth-child(even) > span:hover {
            animation-play-state: paused;
          }

          @media screen and (max-width: 767px) {
            .CardItem-link:nth-child(odd) > span,
            .CardItem-link:nth-child(even) > span {
              font-size: 8rem;
            }
          }
        `}</style>
      </a>
    </Link>
  );
};

export default CardItem;
