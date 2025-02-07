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
import {
  createFeature,
  createHistory,
  getFeatures,
} from "../../services/feature";
import { Feature, NewFeature, NewHistory } from "../../interfaces/feature";
import { authStore } from "../../store/authStore";
import Features from "../../components/Features";
import { HistoryType } from "../../enums/historyType";

const Home: FC = () => {
  const { userId } = authStore((state) => state);
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [selectedFeature, setSelectedFeature] = useState<Feature>();
  const [openUpdatedModal, setOpenUpdatedModal] = useState<boolean>(false);
  const [newFeature, setNewFeature] = useState<NewFeature>({
    name: "",
    description: "",
  });
  const [newHistory, setNewHistory] = useState<NewHistory>({
    featureId: "",
    history: {
      description: updatedDescription,
      type: "" as HistoryType,
    },
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

  const { mutate: createHistoryMutate } = useMutation({
    mutationFn: (newHistory: NewHistory) => createHistory(newHistory),
  });

  const handleNewHistory = () => {
    createHistoryMutate(newHistory, {
      onSuccess: (data) => {
        console.log("History Added", data);
        refetch();
      },
    });
    setOpenUpdatedModal(false);
  };

  const handleUpdatedDescriptionChange = (e: any) => {
    setUpdatedDescription(e.target.value);
  };

  const handleModal = (featureId: any, type: HistoryType) => {
    setSelectedFeature(features?.find((feature) => feature.id === featureId));
    setOpenUpdatedModal(true);
    setNewHistory({
      featureId: featureId,
      history: {
        description: updatedDescription,
        type: type,
      },
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
              You can Add a new Feature
            </em>
            <Input
              placeholder="Enter a New Feature"
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
              content="Add Feature"
              onClick={handleNewFeature}
              loading={createFeatureLoading}
            ></Button>
          </Segment>
        </Form>
      </div>

      <div>
        <Features
          data={features}
          handleModal={handleModal}
          onOpen={openUpdatedModal}
          onClose={() => setOpenUpdatedModal(false)}
          onSave={() => handleNewHistory()}
          onChange={handleUpdatedDescriptionChange}
          desctiprionValue={updatedDescription}
          selectedFeature={selectedFeature}
        />
      </div>
    </Grid>
  );
};

export default Home;
