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
import { createFeature, getFeatures } from "../../services/feature";
import { NewFeature } from "../../interfaces/feature";
import { authStore } from "../../store/authStore";
import Features from "../../components/Features";

const Home: FC = () => {
  const { userId } = authStore((state) => state);
  const [newFeature, setNewFeature] = useState<NewFeature>({
    name: "",
    description: "",
  });

  const { data: features, refetch } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures({ userId }),
  });

  const { mutate: createFeatureMutate, isLoading: createFeatureLoading } =
    useMutation({
      mutationFn: (newFeature: NewFeature) => createFeature(newFeature),
    });

  const handleNewFeature = () => {
    if (!newFeature.name) {
      return;
    }
    createFeatureMutate(newFeature, {
      onSuccess: (data) => {
        setNewFeature({
          name: "",
          description: "",
        });
        refetch();
        console.log("Feature Added", data);
      },
    });
  };

  const handleNewFeatureChange = (e: any) => {
    setNewFeature({
      ...newFeature,
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
              onChange={handleNewFeatureChange}
              name="name"
              value={newFeature.name}
            />
            <TextArea
              placeholder="Description"
              style={{
                minHeight: 80,
              }}
              onChange={handleNewFeatureChange}
              name="description"
              value={newFeature.description}
            />
            <Button
              style={{
                letterSpacing: "2px",
              }}
              color="olive"
              icon="plus"
              labelPosition="right"
              content="Add Emotion"
              onClick={handleNewFeature}
              loading={createFeatureLoading}
            ></Button>
          </Segment>
        </Form>
      </div>

      <div>
        <Features features={features} refetch={refetch} />
      </div>
    </Grid>
  );
};

export default Home;
