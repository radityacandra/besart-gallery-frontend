import * as React from "react"

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(null);
  const [profileName, setProfileName] = React.useState(null)

  return (
    <AuthContext.Provider value={{ token, profileName, setToken, setProfileName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
