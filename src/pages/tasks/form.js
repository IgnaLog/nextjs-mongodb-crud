import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";

const TaskForm = () => {
  const { query, push } = useRouter();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validate = () => {
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "Description is required";
    return errors;
  };

  const createTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async () => {
    const res = await fetch(`http://localhost:3000/api/tasks/${query.id}`);
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };

  const updateTask = async () => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${query.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }
    await push("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  useEffect(() => {
    if (query.id) {
      getTask();
    }
  }, []);

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1>{query.id ? "Update Task" : "Create a Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <FormInput
              value={newTask.title}
              name="title"
              label="Title"
              placeholder="Title"
              onChange={handleChange}
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
            />
            <FormTextArea
              value={newTask.description}
              name="description"
              label="Description"
              placeholder="Description"
              onChange={handleChange}
              error={
                errors.description
                  ? { content: errors.description, pointing: "below" }
                  : null
              }
            />
            <Button primary>{query.id ? "Update" : "Save"}</Button>
          </Form>
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default TaskForm;
