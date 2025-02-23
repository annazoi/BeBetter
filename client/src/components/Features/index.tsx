import { FC, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
  Card,
  GridColumn,
  Form,
  TextArea,
  Input,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import Modal from "../ui/Modal";
import { createHistory } from "../../services/feature";
import { Feature, NewHistory } from "../../interfaces/feature";
import { HistoryType } from "../../enums/historyType";
import { useMutation } from "react-query";

interface FeaturesProps {
  features: Feature[] | undefined;
  refetch?: any;
}

const Features: FC<FeaturesProps> = ({ features, refetch }) => {
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [openUpdatedModal, setOpenUpdatedModal] = useState<boolean>(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature>();

  const [newHistory, setNewHistory] = useState<NewHistory>({
    featureId: "",
    history: {
      description: "" as string,
      type: "" as HistoryType,
    },
  });

  const { mutate: createHistoryMutate, isLoading: isCreateHistoryLoading } =
    useMutation({
      mutationFn: (newHistory: NewHistory) => createHistory(newHistory),
    });

  useEffect(() => {
    if (selectedFeature) {
      setNewHistory((prev) => ({
        ...prev,
        history: {
          ...prev.history,
          description: updatedDescription,
        },
      }));
    }
  }, [updatedDescription, selectedFeature]);

  const handleNewHistory = () => {
    createHistoryMutate(newHistory, {
      onSuccess: (data) => {
        console.log("History Added", data);
        refetch();
      },
    });
    setUpdatedDescription("");
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

  console.log("selectedFeature", selectedFeature);

  return (
    <>
      <Segment
        only="computer"
        placeholder
        style={{
          maxWidth: "300px",
          minWidth: "300px",
        }}
      >
        <em
          style={{
            letterSpacing: "3px",
            color: "black",
            fontSize: "16px",
            marginBottom: "15px",
          }}
        >
          My Emotions
        </em>
        <Grid>
          <GridColumn>
            {features?.map((feature: Feature, index: number) => (
              <Card key={index} style={{ padding: "5px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Header sub as="h2" textAlign="left">
                    {feature.name}
                    <HeaderSubHeader>{feature.percent}%</HeaderSubHeader>
                  </Header>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gridColumnGap: "10px",
                    }}
                  >
                    <Button
                      icon="minus"
                      color="red"
                      onClick={() => {
                        handleModal(feature.id, HistoryType.NEGATIVE);
                      }}
                    />
                    <Button
                      icon="plus"
                      color="green"
                      onClick={() => {
                        handleModal(feature.id, HistoryType.POSITIVE);
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </GridColumn>
        </Grid>
      </Segment>
      <Modal
        name={selectedFeature?.name}
        onOpen={openUpdatedModal}
        onClose={() => setOpenUpdatedModal(false)}
        onSave={() => handleNewHistory()}
        isLoading={isCreateHistoryLoading}
      >
        <div>
          <Form>
            <TextArea
              placeholder="Description"
              style={{
                minHeight: 80,
              }}
              onChange={handleUpdatedDescriptionChange}
              name="description"
              value={updatedDescription}
            />
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Features;
