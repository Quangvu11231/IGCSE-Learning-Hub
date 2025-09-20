import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/auth.context";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Xác định selectedKey dựa trên đường dẫn hiện tại
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return "dashboard";
    if (path === "/profile") return "profile";
    if (path === "/trello") return "trello";
    if (path === "/trips") return "trips";
    return "dashboard"; // Mặc định
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      label: <NavLink to="/">Dashboard</NavLink>,
    },
    {
      key: "profile",
      label: <NavLink to="/profile">Profile</NavLink>,
    },
    {
      key: "trello",
      label: <NavLink to="/trello">Trello</NavLink>,
    },
    {
      key: "trips",
      label: <NavLink to="/trips">Trips</NavLink>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider breakpoint="lg" collapsible>
        <div style={{ padding: "16px", textAlign: "center" }}>
          <NavLink to="/">
            <img
              src={logo}
              alt="App Logo"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]} // Sử dụng selectedKeys thay vì defaultSelectedKeys
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <NavLink to="/">
            <img src={logo} alt="App Logo" style={{ height: "40px" }} />
          </NavLink>
          <Button type="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
