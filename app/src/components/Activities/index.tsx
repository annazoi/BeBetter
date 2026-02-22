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
import { deleteActivity } from "../../services/activity";
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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);

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

  const { mutate: deleteActivityMutate, isLoading: isDeleteActivityLoading } =
    useMutation({
      mutationFn: (activityId: string) => deleteActivity(activityId),
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

  const handleDeleteClick = (activityId: string) => {
    setActivityToDelete(activityId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (activityToDelete) {
      deleteActivityMutate(activityToDelete, {
        onSuccess: () => {
          refetch();
          setDeleteModalOpen(false);
          setActivityToDelete(null);
        },
        onError: (err) => {
          console.log(err);
          setDeleteModalOpen(false);
          setActivityToDelete(null);
        },
      });
    }
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
            content="Progress"
            primary
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
            primary
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
          primary
          onClick={() => handleModal(activity.id, HistoryType.POSITIVE)}
        />
      </div>
    );
  };

  if (!activities || activities.length === 0) {
    return (
      <Segment placeholder style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
        <Header icon>
          <Icon name="clipboard" style={{ color: "var(--text-secondary)" }} />
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
            <GridColumn key={index} style={{ display: 'flex' }}>
              <Card fluid style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: 0 }}>
                <Card.Content style={{ flex: '1 0 auto' }}>
                  <Card.Header style={{ fontSize: "1.2rem", marginBottom: "5px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {activity.name}
                    <Button
                      icon="trash alternate"
                      basic
                      color="red"
                      size="mini"
                      circular
                      onClick={() => handleDeleteClick(activity.id)}
                      loading={isDeleteActivityLoading}
                      style={{ opacity: 0.7, padding: '5px' }}
                    />
                  </Card.Header>

                  <Card.Meta>
                    {activity.type === 'percentage' && `${activity.percent}% Success Rate`}
                    {activity.type === 'numeric' && `Goal: ${activity.goalValue} ${activity.unit}`}
                    {activity.type === 'boolean' && `Habit Tracker`}
                  </Card.Meta>

                  <Card.Description style={{ minHeight: "30px", marginTop: "10px", color: "var(--text-primary)" }}>
                    {activity.description || <span style={{ fontStyle: "italic" }}>No description provided.</span>}
                  </Card.Description>

                  {(activity.type === 'percentage' || activity.type === 'numeric') && (
                    <div style={{ marginTop: "15px", marginBottom: "5px" }}>
                      <Progress
                        percent={progressPercent.toFixed(0)}
                        color={getProgressColor(progressPercent)}
                        size="small"
                        progress
                        style={{ margin: 0 }}
                      />
                    </div>
                  )}
                </Card.Content>

                <Card.Content extra style={{ padding: "10px 15px", borderTop: "1px solid var(--border-color)", flex: '0 0 auto' }}>
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
        <div style={{ padding: '10px 5px' }}>
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(25, 188, 181, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name="edit" color="teal" size="large" style={{ margin: 0 }} />
            </div>
            <div>
              <Header as="h4" style={{ margin: 0 }}>Progress</Header>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {selectedActivity?.type === 'numeric' ? `Add your progress in ${selectedActivity.unit}` : 'Add a note about your activity'}
              </p>
            </div>
          </div>

          <Form>
            {selectedActivity?.type === 'numeric' && (
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  VALUE ({selectedActivity.unit?.toUpperCase() || ''})
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  fluid
                  value={numericValue}
                  onChange={handleNumericValueChange}
                  autoFocus
                />
              </div>
            )}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                DESCRIPTION
              </label>
              <TextArea
                placeholder="How did it go? (Optional)"
                style={{
                  minHeight: 100,
                  width: '100%',
                  background: 'transparent',
                  resize: 'none',
                  padding: '12px',
                  lineHeight: '1.5'
                }}
                onChange={handleUpdatedDescriptionChange}
                name="description"
                value={updatedDescription}
              />
            </div>
          </Form>
        </div>
      </Modal>

      <Modal
        name="Delete Activity"
        onOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onSave={() => handleConfirmDelete()}
        saveButtonText="delete"
        saveButtonColor="red"
        isLoading={isDeleteActivityLoading}
      >
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <Icon name="warning sign" size="huge" color="red" style={{ marginBottom: '15px' }} />
          <Header as="h3">Are you sure you want to delete this activity?</Header>
          <p style={{ color: 'var(--text-secondary)' }}>This action cannot be undone and all history will be lost.</p>
        </div>
      </Modal>
    </>
  );
};

export default Activities;
