import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// import "./form.css";
import React, { useState } from "react";

import supabase from "../utils/supabase";
import useAuth from "../auth/useAuth";

import styles from '/public/styles/form.module.css'
import Header from "../UI/Header";


function Form() {
  const { streetName } = useParams();
  const { user } = useAuth();
  const { register, handleSubmit, reset, unregister } = useForm();
  const [debtNumber, setDebtNumber] = useState(0);
  const navigate = useNavigate();

  function handleAdd() {
    setDebtNumber((num) => num + 1);
  }

  function handleRemove() {
    unregister(`amount${debtNumber}`);
    unregister(`reason${debtNumber}`);
    unregister(`date${debtNumber}`);

    setDebtNumber((num) => num - 1);
  }

  async function onSubmit(formData) {
    console.log(formData);
    //building_no
    //floor
    //head_of_family
    //adults_no
    //children_no
    //phone_number
    //salary
    //job
    //medicines
    //medical_procedure
    //addiction_cases
    //rate

    //street
    formData.street = streetName;
    //by
    formData.by = user?.email;

    let caseId = -1;
    try {
      const { data, error } = await supabase
        .from("cases")
        .insert([formData])
        .select()
        .single();
      console.log("returned data", data);
      caseId = data?.id;

      if (error) {
        throw error;
      }
    } catch (err) {
      toast.error("error submitting please try again");
      console.log(err);
    }
    if (caseId == -1) return;

    const ammount = [];
    const reason = [];
    const date = [];
    for (let key of Object.keys(formData)) {
      if (key.startsWith("amount")) ammount.push(formData[key]);
      else if (key.startsWith("reason")) reason.push(formData[key]);
      else if (key.startsWith("date")) date.push(formData[key]);
    }

    const debtlist = [];

    for (let i = 0; i < ammount.length; i++) {
      debtlist.push({
        amount: +ammount[i],
        reason: reason[i],
        date: date[i],
        case_id: caseId,
      });
    }
    console.log(debtlist);
    try {
      const { data, error } = await supabase
        .from("dean")
        .insert(debtlist)
        .select()
        .single();

      toast.success(`form submited successfully`);
      reset();
      if (error) {
        throw error;
      }

      // reset();
    } catch (err) {
      console.log(err);
    }

    //amount
    //reason
    //date
    //case_id
  }

  return (
    <>
      <Header caller='cases form' /> 
      <div className={styles.main_content}>
        <div className={styles.form_container}>
          <h2>Enter Data for {streetName}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="رقم_العماره">رقم العماره:</label>
            <input
              type="number"
              id="رقم_العماره"
              name="رقم_العماره"
              required
              {...register("building_no")}
            />

            <label htmlFor="رقم_الشقه">رقم الشقه:</label>
            <input
              type="number"
              id="رقم_الشقه"
              name="رقم_الشقه"
              required
              {...register("floor")}
            />

            <label htmlFor="اسم_الاب">اسم الاب:</label>
            <input
              type="text"
              id="اسم_الاب"
              name="اسم_الاب"
              required
              {...register("head_of_family")}
            />

            <label htmlFor="عدد_الباغين">عدد الباغين:</label>
            <input
              type="number"
              id="عدد_الباغين"
              name="عدد_الباغين"
              required
              {...register("adults_no")}
            />

            <label htmlFor="عدد_الاطفال">عدد الاطفال:</label>
            <input
              type="number"
              id="عدد_الاطفال"
              name="عدد_الاطفال"
              required
              {...register("children_no")}
            />

            <label htmlFor="رقم_الهاتف">رقم الهاتف:</label>
            <input
              type="text"
              id="رقم_الهاتف"
              name="رقم_الهاتف"
              required
              {...register("phone_number")}
            />

            <label htmlFor="الدخل">الدخل:</label>
            <input
              type="number"
              id="الدخل"
              name="الدخل"
              required
              {...register("salary")}
            />

            <label htmlFor="الوظيفه">الوظيفه:</label>
            <input
              type="text"
              id="الوظيفه"
              name="الوظيفه"
              required
              {...register("job")}
            />

            <label htmlFor="ادويه">ادويه:</label>
            <input
              type="text"
              id="ادويه"
              name="ادويه"
              {...register("medicines")}
            />

            <label htmlFor="اجراء_طبي">اجراء طبي:</label>
            <input
              type="text"
              id="اجراء_طبي"
              name="اجراء_طبي"
              {...register("medical_procedure")}
            />

            <label htmlFor="حالات_ادمان">حالات ادمان:</label>
            <input
              type="text"
              id="حالات_ادمان"
              name="حالات_ادمان"
              {...register("addiction_cases")}
            />

            <h3>الديون</h3>

            {Array.from({ length: debtNumber }, (_, index) => (
              <React.Fragment key={index}>
                <label htmlFor={`سبب الدين ${index + 1}`}>
                  سبب الدين {index + 1}:
                </label>
                <input
                  type="text"
                  {...register(`reason${index + 1}`)}
                  required
                />

                <label htmlFor={`قيمة الدين ${index + 1}`}>
                  قيمة الدين {index + 1}:
                </label>
                <input
                  type="number"
                  {...register(`amount${index + 1}`)}
                  required
                />

                {/* <label htmlFor={`كم تبقي ${index + 1}`}>
                  كم تبقي {index + 1}:
                </label>
                <input type="text" {...register(`date${index + 1}`)} /> */}

                <label htmlFor={`معاد استحقاق الدين ${index + 1}`}>
                  معاد استحقاق الدين {index + 1}:
                </label>
                <input type="text" {...register(`date${index + 1}`)} required />

                <hr />
                <br />
              </React.Fragment>
            ))}

            <button type="button" className={styles.debt_buttons} onClick={handleAdd}>
              اضافة
            </button>
            {debtNumber > 0 && (
              <button
                type="button"
                className={styles.debt_buttons}
                onClick={handleRemove}
              >
                ازالة{" "}
              </button>
            )}

            <label htmlFor="rate">Rate the case from 1-10</label>
            <input
              type="number"
              id="rate"
              name="rate"
              required
              {...register("rate")}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
