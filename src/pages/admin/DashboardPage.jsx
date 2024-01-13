import { useSecurityVerify } from "../../components/securityCheck/security";
import AdminHeader from "../../components/headers/AdminHeader";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  useSecurityVerify();

  return (
    <>
      <AdminHeader />
      <h2>Welcome Administrator</h2>

      <ul>
        <li>
          <Link to="/admin/users-panel" className="dashboardlink"><p>Users Panel</p></Link>
        </li>
        <li>
          <Link to="/" className="subjectslink"><p>Reported Threads</p></Link>
        </li>
      </ul>
    </>
  );
};

export default DashboardPage;