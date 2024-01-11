import { useSecurityVerify } from "../securityCheck/security";
import AdminHeader from "../../components/admin/AdminHeader";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  useSecurityVerify();

  return (
    <>
      <AdminHeader />
      <h2>Welcome Administrator</h2>

      <ul>
        <li>
          <Link to="/users-panel" className="dashboardlink"><p>Users Panel</p></Link>
        </li>
        <li>
          <Link to="/subjects" className="subjectslink"><p>Subjects</p></Link>
        </li>
      </ul>
    </>
  );
};

export default DashboardPage;