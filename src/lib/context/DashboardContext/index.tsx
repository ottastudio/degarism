import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState
} from "react";
import cookie from "js-cookie";

type token = string | undefined;

export type UserProfile = {
  name: string;
  email: string;
  password: string;
  role: number;
  token: string;
};

export interface DashboardProps {
  token: token;
  setToken: Dispatch<SetStateAction<token>>;
  profile: UserProfile;
}

export const DashboardContext = createContext<DashboardProps>({
  token: undefined,
  setToken: () => {},
  profile: { name: "", email: "", password: "", role: 0, token: "" }
});
export const DashboardConsumer = DashboardContext.Consumer;
export const useDashboardContext = () => useContext(DashboardContext);

export const DashboardProvider: React.FC<{ profile: UserProfile }> = ({
  children,
  profile
}) => {
  const [token, setToken] = useState<token>(() => cookie.get("token"));
  return (
    <DashboardContext.Provider value={{ token, setToken, profile }}>
      {children}
    </DashboardContext.Provider>
  );
};
