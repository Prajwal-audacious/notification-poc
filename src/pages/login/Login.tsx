import React, { useState } from "react";
import "./style.css";
import { Button, Form, FormControl } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useLoginAuth } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login: React.FC = () => {
  const [inputData, setInputData] = useState({});
  const [validated, setValidated] = useState(false);

  const { mutateAsync: loginMutation } = useLoginAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    try {
      const { data, error , isError , message } = await loginMutation(inputData);
      console.log(message)
      if (data.message === "Login successfully") {
        localStorage.setItem("authToken", data.token);
        toast.success(data.message);
        navigate("/");
        console.log(data);

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } 
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };
  return (
    <div className="loginpage">
      <div className="loginContainer">
        <h3>Login</h3>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              name="email"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter email
            </FormControl.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter password
            </FormControl.Feedback>
          </FloatingLabel>
          <Button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              fontWeight: "bolder",
              marginTop: "10px",
              backgroundColor: "black",
            }}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
