import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  // init state variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // some helper functions

  // this function will store the received token from the server to our local storage
  //under a key-value pair

  function storeToken(token) {
    localStorage.setItem('authToken', token);
  }

  function authenticateUser() {
    // get the stored token from localStorage
    const storedToken = localStorage.getItem('authToken'); // returns the token or null;
    // if a token is stored we will send it to /auth/verify to check it

    if (storeToken) {
      axios
        .get(process.env.REACT_APP_API_URL + '/auth/verify', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // if the token is valid the server returns us user object with user info
          const user = response.data;
          // Update state variables
          // In a way logs the user in
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((err) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };
  // 3. Checks if we have a JWT token in localStorage
  // If yes, update our state variables accordingly
  // If not, update our state variable isLoading to false
  useEffect(() => {
    authenticateUser();
  }, []);

  // 2. Provider component that will share 'value' to the rest of the component tree
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
