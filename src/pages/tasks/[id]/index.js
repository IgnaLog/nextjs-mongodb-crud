import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Grid, GridColumn, GridRow, Button, Confirm } from "semantic-ui-react";

const TaskDetail = ({ task, error }) => {
  const { query, push } = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [isDeliting, setIsDeliting] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    const { id } = query;
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    setIsDeliting(true);
    await deleteTask();
    close();
    push("/");
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeliting}>
              Delete
            </Button>
          </div>
        </GridColumn>
      </GridRow>
      <Confirm
        header="Please confirm"
        content="Are you sure you want to delete this task?"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
};

export default TaskDetail;

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: { task },
    };
  }
  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
