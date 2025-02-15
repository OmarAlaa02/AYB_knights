import { useForm } from "react-hook-form";
// import  "./interviews_form.css";
import supabase  from "../utils/supabase";
import { toast } from 'react-hot-toast';

import styles from '/public/styles/interview_form.module.css'
import Header from "../UI/Header";
import Footer from "../UI/Footer";


function Interviews_form(){
    const {register,handleSubmit,formState:{errors},reset}=useForm();
    const onSubmit = async (data) => {
        try {
         
          const { error } = await supabase.from("interviews").insert([data]);
    
          if (error) {
            console.log("Error inserting data:", error.message);
            toast.error('Error submitting data 😢');
          } else {
            console.log("Data submitted successfully:", data);
            toast.success('Login successful! 🎉');
            reset();
            console.log(data)
          }
        } catch (err) {
          console.error("Unexpected error:", err);
          toast.error('unexpected error 😢');
        }
      };
    

    return (
    <div>
      <Header />
        <h1>Register form</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
                <label>Name:</label>
                <input type="text" {...register("name",{required:true})} />
                {errors.name && <p>Name is required</p> }
            </div>

            <div>
                <label>Email</label>
                <input type="email"{...register("email",{required:"Email required",
                pattern:{value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"}})} />
               {errors.email && <p>{errors.email.message}</p>}
            </div>
            
            <div>
                <label>Phone number:</label>
                <input type="text"{...register("phone_number", 
                {required: "Phone number is required",
                    pattern: { value: /^[0-9]{11}$/,message: "Phone number must be 11 digits" }})}/>
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
            </div>
            <div>
                <label>Major:</label>
                <input type="text"{...register("major",{required:"major is required"})}/>
                {errors.major && <p>{errors.major.message}</p>}

            </div>
            <div>
                <label>Team</label>
                <input type="text" {...register("team",{required:"Team is required"})}/>
                {errors.team && <p>{errors.team.message}</p>}
            </div>
            <button type="submit">Submit</button>

        </form>
      <Footer />  

    </div>
    );
}

export default Interviews_form;