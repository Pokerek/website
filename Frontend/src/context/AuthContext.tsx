import { createContext, useState, useEffect, FC, KeyboardEvent } from "react";
// import { useCookies } from "react-cookie";

interface Authentication {
  isAdmin: boolean;
  isLogin: boolean;
  handleKeyPress: (event: KeyboardEvent<HTMLDivElement>) => void;
  changeIsLogin: () => void;
}

const SECRET_PASSWORD = "123"; //process.env.REACT_APP_SECRET_PASSWORD;

export const AuthContext = createContext<Authentication | null>(null);

export const AuthProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  // const [cookies] = useCookies();

  const authCode = {
    answer: SECRET_PASSWORD,
    length: SECRET_PASSWORD?.length || 0,
  };

  const checkAnswer = (text: string) => authCode.answer === text;

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    const newArray = keysPressed.slice(1);
    if (keysPressed.length >= authCode.length) {
      setKeysPressed([...newArray, event.key]);
    } else {
      setKeysPressed([...keysPressed, event.key]);
    }
  };

  const changeIsLogin = () => setIsLogin((prev) => !prev);

  useEffect(() => {
    const currentText = keysPressed.join("");
    if (checkAnswer(currentText)) setIsAdmin(true);
  }, [keysPressed]);

  useEffect(() => {
    const authorization = null; // cookies["Authorization"];
    if (!authorization) return;

    setIsLogin(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAdmin, isLogin, handleKeyPress, changeIsLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
