import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useContext
} from "react";
import cookie from "js-cookie";

export type TokenType = string | undefined;
export type SetTokenType = Dispatch<SetStateAction<TokenType>>;
export interface AuthContextProps {
  token: TokenType;
  setToken: SetTokenType;
}

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  setToken: () => {}
});
export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [token, setToken] = useState<TokenType>(() => cookie.get("token"));
  useEffect(() => {
    setToken(cookie.get("token"));
  });

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
