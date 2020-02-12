import { style, keyframes, media } from "typestyle";

export interface HorizontalAnimateProps {
  label: string;
}

const HorizontalAnimate: React.FC<HorizontalAnimateProps> = ({ label }) => {
  const slideAnimation = keyframes({
    $debugName: "slide-animation",
    "0%": { transform: `translate(-5%, -50%)` },
    "50%": { transform: `translate(calc(-100% + 100vw), -50%)` },
    "100%": { transform: `translate(-5%, -50%)` }
  });
  const spanStyle = style(
    {
      $debugName: "horizontal-animate",
      fontSize: "10.4rem",
      position: "absolute",
      top: "50%",
      fontWeight: 800,
      animation: `${slideAnimation} 50s ease-in-out infinite`,
      "-webkit-animation": `${slideAnimation} 50s ease-in-out infinite`,
      $nest: {
        "&:hover": {
          animationPlayState: "paused",
          "-webkit-animation-play-state": "paused"
        }
      }
    },
    media({ maxWidth: 767 }, { fontSize: "7rem" })
  );
  const itemStyle = (last: boolean) =>
    style({
      margin: last ? "0px 0px 0px 0px" : "0px 6rem 0px 0px",
      whiteSpace: "nowrap"
    });
  return (
    <span className={spanStyle}>
      {Array(10)
        .fill(label)
        .map((item: string, i: number) => (
          <span key={i} className={itemStyle(i === Array(10).length - 1)}>
            {item}
          </span>
        ))}
    </span>
  );
};

export default HorizontalAnimate;
