import { useAuthContext } from "../../../../lib/context/AuthContext";
import useRequest from "../../../../lib/hooks/useRequest";
import UserTable from "../../../Utils/Table/userTable";

export type Users = {
  _id?: string;
  role: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  token: string;
};

const DashboardUsers: React.FC<{}> = () => {
  const { token } = useAuthContext();
  const { data } = useRequest({
    url: "/api/v2/users",
    headers: { Authorization: JSON.stringify({ token }) }
  });

  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <UserTable users={data.users} />
    </div>
  );
};

export default DashboardUsers;
