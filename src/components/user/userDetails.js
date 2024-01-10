import { useEffect, useState } from "react";

// { children } is used to handle and use the result because our result is a json array, it will contain the userDetails const we created in which we will store the json array returned.
const UserDetailsFetcher = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userResponse = await fetch("http://localhost:3001/api/users");
      const userResponseData = await userResponse.json();
      setUserDetails(userResponseData);
    };

    fetchUserDetails();
  }, []);

  return children(userDetails);
};

export default UserDetailsFetcher;