import FCReact, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useAddNotification, useAddUser } from "../hooks/hooks";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [inputData, setInputData] = useState({});
  const [notificationInput, setNotificationInput] = useState({});
  const [validated, setValidated] = useState(false);
  const [validatedNotification, setValidatedNotification] = useState(false);

  const { mutateAsync: addUserMutation } = useAddUser();
  const { mutateAsync: addNotificationMutation } = useAddNotification();

  const handleAddUser = async (e: any) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
    try {
      const { data } = await addUserMutation(inputData);
      console.log(data.message);
      toast.success(data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleNotificationSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidatedNotification(true);
      try {
        const { data } = await addNotificationMutation(notificationInput);
        toast.success(data.message);
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div style={{ display: "flex", padding: "1rem", margin: "1rem " }}>
      <div style={{ width: "50%", padding: "3rem" }}>
        <h2>Add User</h2>
        <Form noValidate validated={validated} onSubmit={handleAddUser}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter Name
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter Email
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter Password
            </FormControl.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date"
              name="DOB"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter DOB
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date Of Joining</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date "
              name="DOJ"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter DOJ
            </FormControl.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Department</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="Department"
              onChange={({ target: { name, value } }) =>
                setInputData({ ...inputData, [name]: value })
              }
              placeholder="Select Department"
              required
            >
              <option value="developer">Developer</option>
              <option value="hr">HR</option>
              <option value="bde">BDE</option>
              <option value="marketing">MARKETING</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" style={{ marginTop: "10px" }}>
            Add User
          </Button>
        </Form>
      </div>
      <div style={{ width: "50%", padding: "3rem" }}>
        <h2>Add notification</h2>
        <Form
          noValidate
          validated={validatedNotification}
          onSubmit={handleNotificationSubmit}
        >
          <Form.Group>
            <Form.Control
              as="textarea"
              aria-label="With textarea"
              placeholder="Enter Notification Content"
              name="message"
              onChange={({ target: { value, name } }) =>
                setNotificationInput({ ...notificationInput, [name]: value })
              }
              required
            />
            <FormControl.Feedback type="invalid">
              Please enter Notication Content
            </FormControl.Feedback>
          </Form.Group>
          <hr />
          <Form.Group>
            <Form.Select
              aria-label="Default select example"
              name="Department"
              onChange={({ target: { value, name } }) =>
                setNotificationInput({ ...notificationInput, [name]: value })
              }
              required
            >
              <option value="all">ALL</option>
              <option value="hr">HR</option>
              <option value="developer">Developer</option>
              <option value="bde">BDE</option>
              <option value="marketing">MARKETING</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" style={{ marginTop: "10px" }}>
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AdminPage;
