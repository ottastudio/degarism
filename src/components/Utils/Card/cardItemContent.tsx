const CardItemContent: React.FC<{ label: string }> = ({ label }) => {
  return (
    <span>
      {Array(10)
        .fill(label)
        .map((item: string, i: number) => (
          <span key={i} style={{ margin: "0px 3rem 0px 0px" }}>
            {item}
          </span>
        ))}
    </span>
  );
};

export default CardItemContent;
