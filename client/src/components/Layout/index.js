import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Leftbar />
        <Outlet />
        <Rightbar />
      </div>
    </div>
  );
};

export default Layout;
