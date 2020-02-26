import useRequest from "../../../../lib/hooks/useRequest";
import { useAuthContext } from "../../../../lib/context/AuthContext";

const DashboardAccount: React.FC<{}> = () => {
  const { token } = useAuthContext();
  const { data, error } = useRequest({
    url: "/api/v2/users/profile",
    headers: { Authorization: JSON.stringify({ token }) }
  });
  if (!data) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <div>
      <div>{data.profile.name}</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DashboardAccount;
