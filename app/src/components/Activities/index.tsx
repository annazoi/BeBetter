import { FC, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Card,
  GridColumn,
  Form,
  TextArea,
  Input,
  Progress,
  Icon,
  Segment,
} from "semantic-ui-react";
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
  const [numericValue, setNumericValue] = useState<string>("");

  const [newHistory, setNewHistory] = useState<NewHistory>({
    activityId: "",
    history: {
      description: "" as string,
      type: "" as HistoryType,
      value: undefined,
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
          value: prev.history.type === HistoryType.NUMERIC ? Number(numericValue) : undefined,
        },
      }));
    }
  }, [updatedDescription, selectedActivity, numericValue]);

  const handleNewHistory = () => {
    createHistoryMutate(newHistory, {
      onSuccess: (data) => {
        console.log("History Added", data);
        refetch();
      },
      onError: (err) => console.log(err),
    });
    setUpdatedDescription("");
    setNumericValue("");
    setOpenUpdatedModal(false);
  };

  const handleUpdatedDescriptionChange = (e: any) => {
    setUpdatedDescription(e.target.value);
  };

  const handleNumericValueChange = (e: any) => {
    setNumericValue(e.target.value);
  };

  const handleModal = (activityId: any, type: HistoryType) => {
    setSelectedActivity(activities?.find((activity) => activity.id === activityId));
    setOpenUpdatedModal(true);
    setNewHistory({
      activityId: activityId,
      history: {
        description: updatedDescription,
        type: type,
        value: type === HistoryType.NUMERIC ? Number(numericValue) : undefined,
      },
    });
  };

  const getProgressColor = (percent: number): "red" | "yellow" | "green" => {
    if (percent < 30) return "red";
    if (percent < 80) return "yellow";
    return "green";
  };

  const renderCardActions = (activity: Activity) => {
    if (activity.type === 'numeric') {
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            content={`Log ${activity.unit || 'Value'}`}
            color="teal"
            onClick={() => handleModal(activity.id, HistoryType.NUMERIC)}
            fluid
          />
        </div>
      );
    }

    if (activity.type === 'boolean') {
      return (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            icon="check"
            content="Done"
            color="green"
            onClick={() => handleModal(activity.id, HistoryType.BOOLEAN)}
            fluid
          />
        </div>
      );
    }

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Button
          circular
          icon="minus"
          color="red"
          onClick={() => handleModal(activity.id, HistoryType.NEGATIVE)}
        />
        <Button
          circular
          icon="plus"
          color="green"
          onClick={() => handleModal(activity.id, HistoryType.POSITIVE)}
        />
      </div>
    );
  };

  if (!activities || activities.length === 0) {
    return (
      <Segment placeholder style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
        <Header icon>
          <Icon name="clipboard outline" style={{ color: "var(--text-secondary)" }} />
          No activities found
          <Header.Subheader>Create your first goal to start tracking productivity!</Header.Subheader>
        </Header>
      </Segment>
    );
  }

  return (
    <>
      <Grid stackable columns={3}>
        {activities.map((activity: Activity, index: number) => {
          let progressPercent = 0;
          if (activity.type === 'percentage') {
            progressPercent = Number(activity.percent) || 0;
          } else if (activity.type === 'numeric' && activity.goalValue) {
            const sum = activity.history.filter(h => h.type === HistoryType.NUMERIC).reduce((acc, curr) => acc + (curr.value || 0), 0);
            progressPercent = Math.min((sum / activity.goalValue) * 100, 100);
          }

          return (
            <GridColumn key={index}>
              <Card fluid>
                <Card.Content>
                  <Card.Header style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                    {activity.name}
                  </Card.Header>

                  <Card.Meta>
                    {activity.type === 'percentage' && `${activity.percent}% Success Rate`}
                    {activity.type === 'numeric' && `Goal: ${activity.goalValue} ${activity.unit}`}
                    {activity.type === 'boolean' && `Habit Tracker`}
                  </Card.Meta>

                  <Card.Description style={{ minHeight: "20px", marginTop: "10px", color: "var(--text-secondary)" }}>
                    {activity.description || <span style={{ fontStyle: "italic" }}>No description provided.</span>}
                  </Card.Description>

                  {(activity.type === 'percentage' || activity.type === 'numeric') && (
                    <div style={{ marginTop: "15px", marginBottom: "5px" }}>
                      <Progress
                        percent={progressPercent}
                        color={getProgressColor(progressPercent)}
                        size="tiny"
                        style={{ margin: 0 }}
                      />
                    </div>
                  )}
                </Card.Content>

                <Card.Content extra style={{ padding: "10px 15px", borderTop: "1px solid var(--border-color)" }}>
                  {renderCardActions(activity)}
                </Card.Content>
              </Card>
            </GridColumn>
          );
        })}
      </Grid>

      <Modal
        name={selectedActivity?.name}
        onOpen={openUpdatedModal}
        onClose={() => setOpenUpdatedModal(false)}
        onSave={() => handleNewHistory()}
        isLoading={isCreateHistoryLoading}
      >
        <div>
          <Form>
            {selectedActivity?.type === 'numeric' && (
              <Input
                type="number"
                placeholder={`Value (${selectedActivity.unit || ''})`}
                value={numericValue}
                onChange={handleNumericValueChange}
                style={{ marginBottom: "10px", width: "100%" }}
              />
            )}
            <TextArea
              placeholder="Description (Optional)"
              style={{ minHeight: 80 }}
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
