import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function CreateExercise() {
 const [form, setForm] = useState({
  name: '',
  splashImageLink: '',
  demoImageLink: '',
  youtubeLink: '',
  personalNote: '',
  targetMuscle: '',
  creationDate: '',
  creatorId: '',
  lastUpdated: '',
  lastUpdatedBy: '',
 });
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   const currentDate = new Date();

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newWorkout = { 
      ...form,
      creationDate: currentDate,
      lastUpdated: currentDate,
    };

   await fetch("http://localhost:5050/record", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newWorkout),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({ 
    name: '',
    splashImageLink: '',
    demoImageLink: '',
    youtubeLink: '',
    personalNote: '',
    targetMuscle: '',
    creatorId: '',
    lastUpdatedBy: ''
  });
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Workout</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="personalNote">Notes</label>
         <input
           type="text"
           className="form-control"
           id="personalNote"
           value={form.personalNote}
           onChange={(e) => updateForm({ personalNote: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="targetMuscle">Muscle Group</label>
         <input
           type="text"
           className="form-control"
           id="muscleGroup"
           value={form.muscleGroup}
           onChange={(e) => updateForm({ muscleGroup: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="youtubeLink">Youtube Link</label>
         <input
           type="text"
           className="form-control"
           id="youtubeLink"
           value={form.youtubeLink}
           onChange={(e) => updateForm({ youtubeLink: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create Exercise"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
