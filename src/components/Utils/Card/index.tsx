import CardItem from "./cardItem";

export type CardProps = { label: string; href: string; asPath?: string };

const Card: React.FC<{ items: CardProps[] }> = ({ items }) => {
  return (
    <div className="card-block">
      {items.map(({ label, href, asPath }, i: number) => (
        <CardItem key={i} href={href} asPath={asPath} label={label} />
      ))}
      <style jsx>{`
        .card-block {
          position: relative;
          padding-top: 58px;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default Card;
