import { FC, useState } from "react";
import {
  Button,
  Grid,
  Segment,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import { useMutation, useQuery } from "react-query";
import { createActivity, getActivities } from "../../services/activity";
import { NewActivity } from "../../interfaces/activity";
import { authStore } from "../../store/authStore";
import Activities from "../../components/Activities";

const Home: FC = () => {
  const { userId } = authStore((state) => state);
  const [newActivity, setNewActivity] = useState<NewActivity>({
    name: "",
    description: "",
  });

  const { data: activities, refetch } = useQuery({
    queryKey: ["activities"],
    queryFn: () => getActivities({ userId }),
  });

  const { mutate: createActivityMutate, isLoading: createActivityLoading } =
    useMutation({
      mutationFn: (newActivity: NewActivity) => createActivity(newActivity),
    });

  const handleNewActivity = () => {
    if (!newActivity.name) {
      return;
    }
    createActivityMutate(newActivity, {
      onSuccess: (data) => {
        setNewActivity({
          name: "",
          description: "",
        });
        refetch();
        console.log("Activity Added", data);
      },
    });
  };

  const handleNewActivityChange = (e: any) => {
    setNewActivity({
      ...newActivity,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid
      centered
      style={{
        gap: "30px",
      }}
      padded
    >
      <div>
        <Form>
          <Segment
            textAlign="center"
            style={{
              display: "grid",
              gap: "20px",
              maxWidth: "300px",
              minWidth: "300px",
            }}
          >
            <em
              style={{
                marginTop: "5px",
                letterSpacing: "3px",
                color: "olive",
                fontSize: "16px",
              }}
            >
              You can Add a new Emotion
            </em>
            <Input
              placeholder="Enter a New Emotion"
              onChange={handleNewActivityChange}
              name="name"
              value={newActivity.name}
            />
            <TextArea
              placeholder="Description"
              style={{
                minHeight: 80,
              }}
              onChange={handleNewActivityChange}
              name="description"
              value={newActivity.description}
            />
            <Button
              style={{
                letterSpacing: "2px",
              }}
              color="olive"
              icon="plus"
              labelPosition="right"
              content="Add Emotion"
              onClick={handleNewActivity}
              loading={createActivityLoading}
            ></Button>
          </Segment>
        </Form>
      </div>

      <div>
        <Activities activities={activities} refetch={refetch} />
      </div>
    </Grid>
  );
};

export default Home;
