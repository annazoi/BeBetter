import { FC, useState } from "react";
import {
  Button,
  Form,
  Input,
  TextArea,
  Dropdown,
  Modal,
  Header,
  Icon,
} from "semantic-ui-react";
import { useMutation, useQuery } from "react-query";
import { createActivity, getActivities } from "../../services/activity";
import { NewActivity } from "../../interfaces/activity";
import { authStore } from "../../store/authStore";
import Activities from "../../components/Activities";

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

  const handleNewActivityChange = (e: any) => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: name === "goalValue" ? Number(value) : value,
    });
  };

  const handleDropdownChange = (_e: any, data: any) => {
    setNewActivity({ ...newActivity, type: data.value });
  };

  const typeOptions = [
    { key: 'percentage', text: 'Percentage (+/-)', value: 'percentage' },
    { key: 'numeric', text: 'Numeric (e.g., Pages, €)', value: 'numeric' },
    { key: 'boolean', text: 'Boolean (Done/Not Done)', value: 'boolean' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <Header as="h1" style={{ margin: 0 }}>
          Dashboard
          <Header.Subheader>Track your habits, goals, and productivity</Header.Subheader>
        </Header>

        <Modal
          closeIcon
          open={isModalOpen}
          trigger={
            <Button color="teal" size="large" onClick={() => setIsModalOpen(true)}>
              <Icon name="plus" /> New Activity
            </Button>
          }
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
          size="tiny"
          className="saas-modal"
        >
          <Header>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(25, 188, 181, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name="rocket" color="teal" style={{ margin: 0 }} />
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>Create New Activity</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '400' }}>Define your next goal or habit</div>
              </div>
            </div>
          </Header>
          <Modal.Content style={{ padding: '20px' }}>
            <Form>
              <Form.Field style={{ marginBottom: '20px' }}>
                <label style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Activity Name</label>
                <Input
                  placeholder="e.g., Drink Water, Read 20 Pages"
                  onChange={handleNewActivityChange}
                  name="name"
                  value={newActivity.name}
                  fluid
                />
              </Form.Field>

              <Form.Field style={{ marginBottom: '20px' }}>
                <label style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Tracking Type</label>
                <Dropdown
                  placeholder='Select Type'
                  fluid
                  selection
                  options={typeOptions}
                  value={newActivity.type}
                  onChange={handleDropdownChange}
                />
              </Form.Field>

              {newActivity.type === 'numeric' && (
                <Form.Group widths="equal" style={{ marginBottom: '20px' }}>
                  <Form.Field>
                    <label style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Goal Value</label>
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
                    <label style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Unit</label>
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
                <label style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', marginBottom: '8px', display: 'block' }}>Description (Optional)</label>
                <TextArea
                  placeholder="What is this activity about?"
                  style={{ minHeight: 100, borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', resize: 'none' }}
                  onChange={handleNewActivityChange}
                  name="description"
                  value={newActivity.description}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions style={{ padding: '15px 20px', borderTop: '1px solid var(--border-color)' }}>
            <Button basic color="red" onClick={() => setIsModalOpen(false)} style={{ borderRadius: '8px' }}>
              Cancel
            </Button>
            <Button color="teal" onClick={handleNewActivity} loading={createActivityLoading} style={{ borderRadius: '8px', paddingLeft: '25px', paddingRight: '25px' }}>
              Create Activity
            </Button>
          </Modal.Actions>
        </Modal>
      </div>

      <Activities activities={activities} refetch={refetch} />
    </div>
  );
};

export default Home;
