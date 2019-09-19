import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, validateYupSchema } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
      if (status) {
        setUser([...user, status]);
      }
    }, [status]);

    return(
        <div>
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name &&  <p className="error">{errors.name}</p>}
                <Field type="text" name="email" placeholder="Email" />
                {touched.email && errors.email &&  <p className="error">{errors.email}</p>}
                <Field type="text" name="password" placeholder="Password" />
                {touched.password && errors.password &&  <p className="error">{errors.password}</p>}
                <label>
                TOS
                <Field type="checkbox" name="tos" checked={values.TOS} />
                </label>
                <button>Submit!</button>
            </Form>
            {user.map(users =>(
               <ul key={users.id}>
                   <li>Name:{users.name}</li>
                   <li>Email:{users.email}</li>
                   <li>Password:{users.password}</li>
               </ul>
           ))}        
        </div>
    );
};

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, TOS}) {
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            TOS: TOS || false
        };
    },
    validateYupSchema: Yup.object().shape({
        name: Yup.string().required("Enter a name please"),
        email: Yup.string().required("Enter an email please"),
        password: Yup.string().required("Enter a password please"),
    }),
    handleSubmit(values, { setStatus }) {
        axios 
        .post("https://reqres.in/api/users", values)
        .then(res => {
            setStatus(res.data);
        })
        .catch(err => console.log(err.res))
    }
})(UserForm);
console.log(FormikUserForm);
export default FormikUserForm;