import { useNavigate } from "react-router-dom";
// import "../pages/interviews.css";
import styles from '/public/styles/interview.module.css'

function Interviews_header(){
    const navigate = useNavigate();
    return (
       
        <div className={styles.header}>
            <h1>Interviews</h1>
            <button onClick={()=>navigate('/interviews_done')}>Interviews Done</button>
        </div>
        
    );
}
export default Interviews_header;