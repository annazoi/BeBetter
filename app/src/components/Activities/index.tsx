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
} from "semantic-ui-react";
import Modal from "../ui/Modal";
import { createHistory } from "../../services/activity";
import { deleteActivity } from "../../services/activity";
import { Activity, NewHistory } from "../../interfaces/activity";
import { HistoryType } from "../../enums/historyType";
import { useMutation } from "react-query";
import { ClipboardList, Minus, Plus, Check, Trash2 } from "lucide-react";

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
        <Button
          content="Log Progress"
          primary
          onClick={() => handleModal(activity.id, HistoryType.NUMERIC)}
          fluid
          className="btn-primary"
        />
      );
    }

    if (activity.type === 'boolean') {
      return (
        <Button
          onClick={() => handleModal(activity.id, HistoryType.BOOLEAN)}
          fluid
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          <Check size={16} />
          Mark Done
        </Button>
      );
    }

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <Button
          circular
          color="red"
          onClick={() => handleModal(activity.id, HistoryType.NEGATIVE)}
          aria-label="Negative"
        >
          <Minus size={18} />
        </Button>
        <Button
          circular
          primary
          onClick={() => handleModal(activity.id, HistoryType.POSITIVE)}
          aria-label="Positive"
        >
          <Plus size={18} />
        </Button>
      </div>
    );
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="empty-state animate-fade-up">
        <div className="empty-state-icon">
          <ClipboardList size={28} strokeWidth={1.5} />
        </div>
        <Header as="h3" className="font-display" style={{ marginBottom: 8 }}>
          No activities yet
        </Header>
        <p style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: 320, marginInline: 'auto' }}>
          Create your first goal above to start tracking your progress.
        </p>
      </div>
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
              <Card fluid style={{ display: 'flex', flexDirection: 'column', height: '100%', margin: 0, position: 'relative' }}>
                <div className={`activity-card-accent ${activity.type}`} />
                <Card.Content style={{ flex: '1 0 auto', paddingTop: '1.5em' }}>
                  <Card.Header style={{ fontSize: "1.15rem", marginBottom: "8px", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <span className="font-display">{activity.name}</span>
                    <button
                      onClick={() => handleDeleteClick(activity.id)}
                      disabled={isDeleteActivityLoading}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 4,
                        color: 'var(--text-muted)',
                        transition: 'color 0.2s ease',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                      aria-label="Delete activity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </Card.Header>

                  <Card.Meta>
                    {activity.type === 'percentage' && `${activity.percent}% Success Rate`}
                    {activity.type === 'numeric' && `Goal: ${activity.goalValue} ${activity.unit}`}
                    {activity.type === 'boolean' && `Daily Habit`}
                  </Card.Meta>

                  <Card.Description style={{ minHeight: "36px", marginTop: "12px" }}>
                    {activity.description || <span style={{ fontStyle: "italic", opacity: 0.7 }}>No description provided.</span>}
                  </Card.Description>

                  {(activity.type === 'percentage' || activity.type === 'numeric') && (
                    <div style={{ marginTop: "20px" }}>
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

                <Card.Content extra style={{ padding: "14px 16px", borderTop: "1px solid var(--border-color)", flex: '0 0 auto', background: 'var(--bg-accent)' }}>
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
        saveButtonText="Save"
      >
        <div style={{ padding: '4px 0' }}>
          <p style={{ margin: '0 0 20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {selectedActivity?.type === 'numeric' ? `Add your progress in ${selectedActivity.unit}` : 'Add a note about your activity'}
          </p>

          <Form>
            {selectedActivity?.type === 'numeric' && (
              <div style={{ marginBottom: "16px" }}>
                <label>Value ({selectedActivity.unit?.toUpperCase() || ''})</label>
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
              <label>Description</label>
              <TextArea
                placeholder="How did it go? (Optional)"
                style={{
                  minHeight: 100,
                  width: '100%',
                  background: 'var(--surface-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  resize: 'none',
                  padding: '12px',
                  lineHeight: '1.5',
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
        saveButtonText="Delete"
        saveButtonColor="red"
        isLoading={isDeleteActivityLoading}
      >
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'var(--danger-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--danger)',
            }}
          >
            <Icon name="warning sign" style={{ margin: 0, fontSize: '1.5rem' }} />
          </div>
          <Header as="h3" className="font-display" style={{ marginBottom: 8 }}>Delete this activity?</Header>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>This action cannot be undone and all history will be lost.</p>
        </div>
      </Modal>
    </>
  );
};

export default Activities;
