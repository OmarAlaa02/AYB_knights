import { Link } from "react-router-dom";
import styles from '/public/styles/home.module.css'


function HomeCard({ streetName , color , imgurl}) {
  return (
    <Link to={`/form/${streetName}`} className={styles.card} style={{backgroundColor:color}}>
      <img src={imgurl} alt={streetName} />
      <span>{streetName}</span>
    </Link>
  );
}

export default HomeCard;
