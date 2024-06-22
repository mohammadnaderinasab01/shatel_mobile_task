import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from './NavBar.module.css';
import CodeIcon from '@mui/icons-material/Code';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function NavBar() {
  // useStates
  const [click, setClick] = useState(false);

  // handlers
  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.nav_container}>
          <NavLink exact to="/" className={styles.nav_logo}>
            <span>ShatelMobile</span>
            <span className={styles.icon}>
              <CodeIcon fontSize="large" />
            </span>
          </NavLink>

          <ul className={click ? `${styles.nav_menu} ${styles.active}` : styles.nav_menu}>
            <li className={styles.nav_item}>
              <NavLink
                exact
                to="/login"
                activeClassName="active"
                className={styles.nav_links}
                onClick={handleClick}
              >
                LogIn
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink
                exact
                to="/signup"
                activeClassName="active"
                className={styles.nav_links}
                onClick={handleClick}
              >
                SignUp
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink
                exact
                to="/upload"
                activeClassName="active"
                className={styles.nav_links}
                onClick={handleClick}
              >
                Upload
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink
                exact
                to="/send-mail"
                activeClassName="active"
                className={styles.nav_links}
                onClick={handleClick}
              >
                Send Mail
              </NavLink>
            </li>
          </ul>
          <div className={styles.nav_icon} onClick={handleClick}>
            {click ? (
              <span className={styles.icon}>
                <MenuIcon />{" "}
              </span>
            ) : (
              <span className={styles.icon}>
                <CloseIcon />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
