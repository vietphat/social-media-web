import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx('navbar')}>
      <div className={cx('left')}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          socialweb
        </Link>
        <HomeOutlinedIcon />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className={cx('search')}>
          <SearchOutlinedIcon />
          <input type='text' placeholder='Nhập tên cần tìm...' />
        </div>
      </div>
      <div className={cx('right')}>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className={cx('user')}>
          <img src='' alt='' />
          <span>Phat Le</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
