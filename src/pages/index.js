import { useRouter } from "next/router";
import { Button, Card, Container, Grid } from "semantic-ui-react";

export default function Home({ tasks }) {
  const router = useRouter();
  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <img
              src="https://i.ibb.co/RPM73rv/No-data-amico.png"
              alt="No tasks yet"
            />
            <div>
              <Button
                primary
                onClick={() => {
                  router.push("/tasks/form");
                }}
              >
                Create a Task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  // Render a List of tasks
  return (
    <Container style={{ padding: "20px" }}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header style={{ "word-wrap": "break-word" }}>
                {task.title}
              </Card.Header>
              <Card.Description style={{ "word-wrap": "break-word" }}>
                <p>{task.description}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                primary
                style={{ margin: "1px" }}
                onClick={() => router.push(`/tasks/${task._id}`)}
              >
                View
              </Button>
              <Button
                primary
                style={{ margin: "1px" }}
                onClick={() => {
                  router.push(`/tasks/${task._id}/edit`);
                }}
              >
                Edit
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};
