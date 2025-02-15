import InterviewsCard from "../UI/InterviewsCard";
import supabase from "../utils/supabase";
// import "./interviews.css";
import styles from "/public/styles/interview.module.css";

import { useEffect, useState } from "react";
import Header from "../UI/Header";
import Footer from "../UI/Footer";


function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const fetchInterviews = async () => {
      setIsloading(true);
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("state", false);

      if (error) {
        console.error("Error fetching interviews:", error);
      } else {
        console.log("Fetched interviews:", data);
        setInterviews(data);
        console.log(data);
      }
      setIsloading(false);
    };
    fetchInterviews();
  }, []);

  return (
    <>
      {/* <InterviewsHeader /> */}
      <Header caller='interview'/>
      <div className={styles.interviews}>
        {isLoading ? (
          <h1>Loading ...</h1>
        ) : (
          interviews.map((interview) => (
            <InterviewsCard interviewsObj={interview} key={interview.id} />
          ))
        )}
      </div>
      <Footer />  

    </>
  );
}
export default Interviews;
