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
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import Modal from "../ui/Modal";
import { createHistory } from "../../services/activity";
import { Activity, NewHistory } from "../../interfaces/activity";
import { HistoryType } from "../../enums/historyType";
import { useMutation } from "react-query";

interface ActivitiesProps {
  activities: Activity[] | undefined;
  refetch?: any;
}

const Activities: FC<ActivitiesProps> = ({ activities, refetch }) => {
  const [updatedDescription, setUpdatedDescription] = useState<string>("");
  const [openUpdatedModal, setOpenUpdatedModal] = useState<boolean>(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  const [newHistory, setNewHistory] = useState<NewHistory>({
    activityId: "",
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
    if (selectedActivity) {
      setNewHistory((prev) => ({
        ...prev,
        history: {
          ...prev.history,
          description: updatedDescription,
        },
      }));
    }
  }, [updatedDescription, selectedActivity]);

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

  const handleModal = (activityId: any, type: HistoryType) => {
    setSelectedActivity(activities?.find((activity) => activity.id === activityId));
    setOpenUpdatedModal(true);
    setNewHistory({
      activityId: activityId,
      history: {
        description: updatedDescription,
        type: type,
      },
    });
  };

  console.log("selectedActivity", selectedActivity);

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
            {activities?.map((activity: Activity, index: number) => (
              <Card key={index} style={{ padding: "5px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Header sub as="h2" textAlign="left">
                    {activity.name}
                    <HeaderSubHeader>{activity.percent}%</HeaderSubHeader>
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
                        handleModal(activity.id, HistoryType.NEGATIVE);
                      }}
                    />
                    <Button
                      icon="plus"
                      color="green"
                      onClick={() => {
                        handleModal(activity.id, HistoryType.POSITIVE);
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
        name={selectedActivity?.name}
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

export default Activities;
