import { FC, useState } from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import { useMutation, useQuery } from "react-query";
import { createActivity, getActivities } from "../../services/activity";
import { NewActivity } from "../../interfaces/activity";
import { authStore } from "../../store/authStore";
import Activities from "../../components/Activities";
import Modal from "../../components/ui/Modal";
import Select from "../../components/ui/Select";
import { Plus, Sprout, TrendingUp, Hash, CheckCircle2 } from "lucide-react";

const Home: FC = () => {
  const { userId } = authStore((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState<NewActivity>({
    name: "",
    description: "",
    type: "percentage",
  });

  const { data: activities, refetch } = useQuery({
    queryKey: ["activities", userId],
    queryFn: () => getActivities({ userId }),
    enabled: !!userId,
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
          type: "percentage",
          goalValue: undefined,
          unit: "",
        });
        setIsModalOpen(false);
        refetch();
        console.log("Activity Added", data);
      },
      onError: (err) => console.log("error", err),
    });
  };

  const handleNewActivityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: name === "goalValue" ? Number(value) : value,
    });
  };

  const typeOptions = [
    {
      value: "percentage",
      label: "Percentage (+/-)",
      description: "Track success rate over time",
      icon: <TrendingUp size={18} strokeWidth={2.25} />,
      accent: "primary" as const,
    },
    {
      value: "numeric",
      label: "Numeric",
      description: "Log measurable progress like pages or km",
      icon: <Hash size={18} strokeWidth={2.25} />,
      accent: "accent" as const,
    },
    {
      value: "boolean",
      label: "Boolean",
      description: "Simple done or not done tracking",
      icon: <CheckCircle2 size={18} strokeWidth={2.25} />,
      accent: "success" as const,
    },
  ];

  return (
    <div className="animate-fade-up">
      <div className="dashboard-header-block">
        <div>
          <h1 className="dashboard-title">Your Habits</h1>
          <p className="dashboard-subtitle">Track progress, one day at a time</p>
        </div>

        <Modal
          closeIcon
          onOpen={isModalOpen}
          trigger={
            <Button primary size="large" onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Plus size={18} style={{ marginRight: 8, verticalAlign: "middle" }} />
              New Activity
            </Button>
          }
          onClose={() => setIsModalOpen(false)}
          size="tiny"
          header={
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="nav-brand-mark" style={{ width: 44, height: 44, borderRadius: 12 }}>
                <Sprout size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-display" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Create Activity</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 400, fontFamily: 'var(--font-body)' }}>Define your next goal or habit</div>
              </div>
            </div>
          }
          footer={
            <>
              <Button basic color="red" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button primary onClick={handleNewActivity} loading={createActivityLoading} className="btn-primary">
                Create Activity
              </Button>
            </>
          }
        >
          <Form>
            <Form.Field style={{ marginBottom: '20px' }}>
              <label>Activity Name</label>
              <Input
                placeholder="e.g., Drink Water, Read 20 Pages"
                onChange={handleNewActivityChange}
                name="name"
                value={newActivity.name}
                fluid
              />
            </Form.Field>

            <Form.Field style={{ marginBottom: '20px' }}>
              <label htmlFor="activity-type">Tracking Type</label>
              <Select
                id="activity-type"
                name="type"
                value={newActivity.type}
                onChange={(type) => setNewActivity({ ...newActivity, type: type as NewActivity["type"] })}
                options={typeOptions}
              />
            </Form.Field>

            {newActivity.type === 'numeric' && (
              <Form.Group widths="equal" style={{ marginBottom: '20px' }}>
                <Form.Field>
                  <label>Goal Value</label>
                  <Input
                    type="number"
                    placeholder="100"
                    name="goalValue"
                    value={newActivity.goalValue || ""}
                    onChange={handleNewActivityChange}
                    fluid
                  />
                </Form.Field>
                <Form.Field>
                  <label>Unit</label>
                  <Input
                    placeholder="e.g. km, cups"
                    name="unit"
                    value={newActivity.unit || ""}
                    onChange={handleNewActivityChange}
                    fluid
                  />
                </Form.Field>
              </Form.Group>
            )}

            <Form.Field>
              <label>Description (Optional)</label>
              <TextArea
                placeholder="What is this activity about?"
                style={{ minHeight: 100, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--surface-elevated)', resize: 'none' }}
                onChange={handleNewActivityChange}
                name="description"
                value={newActivity.description}
              />
            </Form.Field>
          </Form>
        </Modal>
      </div>

      <Activities activities={activities} refetch={refetch} />
    </div>
  );
};

export default Home;
