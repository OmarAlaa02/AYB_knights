import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
// import './cases.css'
import styles from "/public/styles/cases.module.css";
import Header from "../UI/Header";
function Cases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const get_data = async () => {
      try {
        console.log("Fetching cases...");
        const { data: casesData, error: casesError } = await supabase
          .from("cases")
          .select("*");

        if (casesError) throw casesError;
        console.log("Cases Data:", casesData);

        if (!casesData.length) {
          console.log("No cases found!");
          setCases([]);
          return;
        }

        const caseIds = casesData.map((c) => c.id);

        console.log("Fetching dean data for case IDs:", caseIds);
        const { data: deanData, error: deanError } = await supabase
          .from("dean")
          .select("*")
          .in("case_id", caseIds);

        if (deanError) throw deanError;
        console.log("Dean Data:", deanData);

        // Merge case data with dean data
        const mergedCases = casesData.map((c) => {
          const deanInfo = deanData.find((d) => d.case_id === c.id) || null;
          console.log(`Case ID: ${c.id} => Dean Info:`, deanInfo); // Debugging the merge step
          return { ...c, deanInfo };
        });

        console.log("Merged Cases:", mergedCases);
        setCases(mergedCases);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    get_data();
  }, []);

  if (loading) return <div className={styles.loading}>Loading cases...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <>
      <Header caller="cases form" />
      <div className={styles.cases_container}>
        {cases.length === 0 ? (
          <p>No cases available.</p>
        ) : (
          cases.map((caseItem) => (
            <div key={caseItem.id} className={styles.case_card}>
              <h2>Building No: {caseItem.building_no}</h2>
              <h3>Floor: {caseItem.floor}</h3>
              <p>
                <strong>Head of Family:</strong> {caseItem.head_of_family}
              </p>
              <p>
                <strong>Adults:</strong> {caseItem.adults_no}
              </p>
              <p>
                <strong>Children:</strong> {caseItem.children_no}
              </p>
              <p>
                <strong>Phone:</strong> {caseItem.phone_number}
              </p>
              <p>
                <strong>Salary:</strong> {caseItem.salary}
              </p>
              <p>
                <strong>Job:</strong> {caseItem.job}
              </p>
              <p>
                <strong>Medicines:</strong> {caseItem.medicines}
              </p>
              <p>
                <strong>Medical Procedure:</strong> {caseItem.medical_procedure}
              </p>
              <p>
                <strong>Addiction Cases:</strong> {caseItem.adiction_cases}
              </p>
              <p className={styles.rate_label}>
                <strong>Rate:</strong>{" "}
                <span className={styles.rate_value}>{caseItem.rate}</span>
              </p>
              <p>
                <strong>Street:</strong> {caseItem.street}
              </p>
              <p>
                <strong>By:</strong> {caseItem.by}
              </p>

              {caseItem.deanInfo ? (
                <div className={styles.dean_info}>
                  <h3>Dean Information</h3>
                  <p>
                    <strong>Name:</strong> {caseItem.deanInfo.amount}
                  </p>
                  <p>
                    <strong>Reason:</strong> {caseItem.deanInfo.reason}
                  </p>
                  <p>
                    <strong>Amount:</strong> {caseItem.deanInfo.amount}
                  </p>
                  <p>
                    <strong>Date:</strong> {caseItem.deanInfo.date}
                  </p>
                </div>
              ) : (
                <p className={styles.no_dean_info}>
                  No Dean Information Available
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Cases;
