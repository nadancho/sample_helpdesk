import React, { useState } from "react";
import { useNavigate } from "react-router";
import Container from "react-bootstrap/Container";

export default function Login({login}) {

    const navigate = useNavigate();
    //login form
    const[form, setForm] = useState({
        username: '',
        password: '',
    });

    //updates form values
    function updateForm(value) {
        return setForm((prev) =>{
            return { ...prev, ...value};
        });
    }

    //Clears form
    function clearForm() { 
        setForm({username: '', password: '',});
    }

    const onSubmit = () => {
        //temporary authentication check with strings for demo purposes
        if(form.username === "admin" && form.password === "gW9ZziWJ63QX"){
            login(); //setState isAdmin = true
            navigate("/"); //to dashboard
        }
        else{
            alert("That username and password combination was incorrect, please try again.");
            clearForm(); //clears form
        }

        
    };

    return(
        //Form submission for login
        <Container className="login-component">
            
            <div>
            <h3 style={{textAlign: 'center'}}>Login:</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="username" >Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username-input"
                        value={form.username}
                        onChange={(e) => updateForm({ username: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" >Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-input"
                        value={form.password}
                        onChange={(e) => updateForm({ password: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn-primary"
                    />
                </div>
            </form>

            </div>
        </Container>

    );

}