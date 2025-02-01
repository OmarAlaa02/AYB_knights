import { useNavigate } from "react-router-dom";

function InteriewsDoneHeader() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Interviews Done</h1>
      <button onClick={() => navigate("/interviews")}>Interviews</button>
    </div>
  );
}
export default InteriewsDoneHeader;
