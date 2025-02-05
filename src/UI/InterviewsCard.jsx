// import "../pages/interviews.css";
import { useState } from "react";
import Modal from "./Modal";
import styles from '/public/styles/interview.module.css'
import emailjs from "emailjs-com";

function InterviewsCard({ interviewsObj }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const { name, email, phone_number, major, team, feedback, id,state } =interviewsObj;

  const sendMail = (email) => {
    const serviceID = "service_lw2o77y";  
    const templateID = "template_6welqi7";
    const userID = "EyiBm15aGIeIwOhIa";  

    const templateParams = {
      to_email: email,
      to_name: name,
      message: `Dear ${name},

Congratulations! We are excited to officially welcome you to the AYB for Charity club. Your passion and commitment to making a difference align perfectly with our mission, and we are confident that you will bring valuable contributions to our cause.

We look forward to working together on various impactful initiatives that will positively affect our community. Your involvement will help us grow and achieve the meaningful change we strive for.

If you have any questions or need guidance, please don't hesitate to reach out. Once again, welcome aboard, and we can't wait to see the great things we'll achieve together!



`,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(response => {
        console.log("Email sent successfully!", response.status, response.text);
        alert("Acceptance email sent successfully!");
      })
      .catch(err => {
        console.error( err);
        alert("Error sending email.");
      });}




  return (
    <div className={styles.interviews_card}>
      {/* <p>{id}</p> */}
      <p>name: {name}</p>
      <p>email: {email}</p>
      <p>phone number: {phone_number}</p>
      <p>major: {major}</p>
      <p>team: {team}</p>
      {state ? (
        <>
          <p>feedback: {feedback}</p>
          <button style={{backgroundColor:'green'}} onClick={()=> sendMail(email)}>ACCEPT</button>
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
