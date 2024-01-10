import { useSecurityVerify } from "../securityCheck/security";

const DashboardPage = () => {
  useSecurityVerify();

  return (
    <>
      <h2>Vous êtes bien connecté en tant qu'admin</h2>
    </>
  );
};

export default DashboardPage;