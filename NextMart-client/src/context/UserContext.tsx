import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProviderValues {
  user: IUser | null;
  loading: boolean;
  setUser: (user: IUser | null) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    handleUser();
  }, [loading]);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
    const context = useContext(UserContext) 

    if(context == undefined){
        throw new Error("useUser must be used within the userProvider ")
    }

    return context;
}

export default UserProvider;
