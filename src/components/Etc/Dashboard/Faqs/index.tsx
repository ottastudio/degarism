// import { FaqType } from "../../../../lib/interfaces/sites";
// import useRequest from "../../../../lib/hooks/useRequest";
// import AddFaq from "./add";
// import UpdateFaq from "./update";

const DashboardFaqs: React.FC<{}> = () => {
  // const { data, revalidate } = useRequest({ url: "/api/v1/sites/faq" });
  return (
    <div
      style={{
        position: "relative",
        borderTop: "1px solid",
        marginTop: -1,
        overflow: "hidden"
      }}
    >
      {/* <AddFaq revalidate={revalidate} />
      {!data ? (
        <div style={{ padding: 20 }}>Loading data...</div>
      ) : (
        data.faqs.map((items: FaqType, i: number) => (
          <UpdateFaq key={i} index={i} items={items} revalidate={revalidate} />
        ))
      )} */}

      <style jsx global>{`
        form {
          border-bottom: 1px solid;
          padding: 20px;
          width: 100%;
        }
        form:nth-child(even) {
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default DashboardFaqs;
