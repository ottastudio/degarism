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
export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [token, setToken] = useState<TokenType>(() => cookie.get("mantap"));
  useEffect(() => {
    setToken(cookie.get("token"));
  });

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = () => useContext(AuthContext);
