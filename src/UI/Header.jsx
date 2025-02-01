import { Link, useNavigate } from "react-router-dom";
// import"../pages/home.css"

import styles from "/public/styles/home.module.css";
import { IoArrowBackCircle } from "react-icons/io5";

function Header({ caller }) {
  return (
    <header>
      <div className={styles.logo}>
        <img
          src="/images/ayb_logo.jpeg"
          alt="Logo"
          className={styles.logo_img}
        />
        <Link to='/home'className={styles.link_like_h1} >AYB</Link>
      </div>
      <nav className={styles.nav_right}>
        {caller === 'cases form' && <Link to='/home' className={styles.cases_button}> <IoArrowBackCircle /> </Link>}
        {caller === 'interview' && <Link to='/interviews_done' className={styles.cases_button}> interviews done</Link>}
        {caller === 'interview_done' && <Link to='/interviews' className={styles.cases_button}> interviews </Link>}
        {caller === "home" && (
          <>
            <Link to="/cases" className={styles.cases_button}>
              Cases
            </Link>
            <Link to="/interviews" className={styles.cases_button}>
              interviews
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
