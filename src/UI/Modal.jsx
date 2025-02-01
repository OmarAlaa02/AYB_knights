import React, { useState } from "react";
// import "../pages/modal.css";
import { toast } from "react-hot-toast";
import supabase from "../utils/supabase";

import styles from "/public/styles/modal.module.css";

function Modal({ showModal, closeModal, id }) {
  const [feedback, setFeedback] = useState("");
  const handleInputChange = (e) => {
    setFeedback(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Feedback Submitted:", feedback);
    setFeedback("");
    closeModal();
  };
  if (!showModal) return null;

  async function handleClick() {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .update({ state: true, feedback })
        .eq("id", id)
        .select();
      console.log("data ", data);
      if (error) {
        console.log("Error inserting data:", error.message);
        toast.error("Error submitting data 😢");
      } else {
        console.log("Data submitted successfully:");
        toast.success("feedback submitted successful! 🎉");

        closeModal();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("unexpected error 😢");
    }
  }

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <button className={styles.close_btn} onClick={closeModal}>
          X
        </button>
        <h2>Submit Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={handleInputChange}
            placeholder="Write your feedback here..."
            rows="5"
            cols="30"
            required
          />
          <br />
          <button type="submit" onClick={handleClick}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
export default Modal;
