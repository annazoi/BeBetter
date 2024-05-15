import { FC, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Segment,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import { useMutation, useQuery } from "react-query";
import {
  createFeature,
  createHistory,
  getFeatures,
} from "../../services/feature";
import { Feature, NewFeature } from "../../interfaces/feature";
import { authStore } from "../../store/authStore";
import Features from "../../components/Features";
import { HistoryType } from "../../enums/historyType";

const Home: FC = () => {
  const { userId } = authStore((state) => state);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures({ userId }),
  });
  // useEffect(() => {
  //   console.log("Data", data);
  // }, [data]);

  const { mutate: createFeatureMutate, isLoading: createFeatureLoading } =
    useMutation({
      mutationFn: ({ name, description }: NewFeature) =>
        createFeature({
          name,
          description,
        }),
    });

  const { mutate: createHistoryMutate } = useMutation({
    mutationFn: ({ featureId, history }: any) =>
      createHistory(featureId, history),
  });

  const handleNewFeature = () => {
    if (name === "") {
      return;
    }
    createFeatureMutate(
      {
        name: name,
        description: description,
      },
      {
        onSuccess: (data) => {
          setName("");
          setDescription("");
          console.log("Feature Added", data);
        },
      }
    );
  };
  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleHistory = (featureId: string, history: any) => {
    createHistoryMutate({
      featureId: featureId,
      history: history,
    });
  };

  const handleNegativeOption = (featureId: string) => {
    handleHistory(featureId, {
      description: "Negative",
      type: HistoryType.NEGATIVE,
    });
    console.log("Negative Option");
  };

  const handlePositiveOption = (featureId: string) => {
    handleHistory(featureId, {
      description: "Positive",
      type: HistoryType.POSITIVE,
    });
    console.log("Positive Option");
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
              You can Add a new Feature
            </em>
            <Input
              placeholder="Enter a New Feature"
              onChange={handleNameChange}
              name="name"
              value={name}
            />
            <TextArea
              placeholder="Description"
              style={{
                minHeight: 80,
              }}
              onChange={handleDescriptionChange}
              name="description"
              value={description}
            />
            <Button
              style={{
                letterSpacing: "2px",
              }}
              color="olive"
              icon="plus"
              labelPosition="right"
              content="Add Feature"
              onClick={handleNewFeature}
              loading={createFeatureLoading}
            ></Button>
          </Segment>
        </Form>
      </div>

      <div>
        <Features
          data={data as Feature[]}
          handleNegativeOption={handleNegativeOption}
          handlePositiveOption={handlePositiveOption}
        />
      </div>
    </Grid>
  );
};

export default Home;
