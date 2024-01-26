import { useSecurityVerify } from "../../components/securityCheck/security";
import AdminHeader from "../../components/headers/AdminHeader";
import { Link } from "react-router-dom";
import './styles/dashboardStyle.css'

const DashboardPage = () => {
  useSecurityVerify();

  return (
    <div className="root1">
      <AdminHeader />
      <h2 className="dashboardTitle">Dashboard</h2>

      <ul className="dashboardList">
        <li className="dbListItem">
          <Link to="/admin/users-panel" className="dashboardlink"><p>Users Panel</p></Link>
        </li>
        <li className="dbListItem">
          <Link to="/"><p>Reported Threads</p></Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardPage;