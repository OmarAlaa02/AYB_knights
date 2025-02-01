// import "../pages/interviews.css";
import { useState } from "react";
import Modal from "./Modal";
import styles from '/public/styles/interview.module.css'

function InterviewsCard({ interviewsObj }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const { name, email, phone_number, major, team, feedback, id,state } =
    interviewsObj;
  return (
    <div className={styles.interviews_card}>
      {/* <p>{id}</p> */}
      <p>{name}</p>
      <p>{email}</p>
      <p>{phone_number}</p>
      <p>{major}</p>
      <p>{team}</p>
      {state ? (
        <>
          <p>feedback: {feedback}</p>
          <button style={{backgroundColor:'green'}} onClick={()=> sendMail(id)}>ACCEPT</button>
          <button>REJECT</button>
        </>
      ) : (
        <>
          <button onClick={() => setShowFeedback((state) => !state)}>
            START INTERVIEW
          </button>
          {showFeedback && (
            <Modal
              id={id}
              showModal={showFeedback}
              closeModal={() => setShowFeedback(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
export default InterviewsCard;
