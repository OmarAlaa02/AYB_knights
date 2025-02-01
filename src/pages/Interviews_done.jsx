import InteriewsDoneHeader from "../UI/InterviewsDoneHeader";
import InterviewsCard from "../UI/InterviewsCard";
import supabase from "../utils/supabase";
import { useEffect, useState } from "react";
import Header from "../UI/Header";

function Interviews_done() {
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {
    const fetchInterviews = async () => {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("state", true);

      if (error) {
        console.error("Error fetching interviews:", error);
      } else {
        console.log("Fetched interviews:", data);
        setInterviews(data);
      }
    };
    fetchInterviews();
  }, []);
  return (
    <>
      <Header caller="interview_done" />
      <div>
        {interviews.map((interviews) => (
          <InterviewsCard interviewsObj={interviews}  key={interviews.id} />
        ))}
      </div>
    </>
  );
}

export default Interviews_done;
