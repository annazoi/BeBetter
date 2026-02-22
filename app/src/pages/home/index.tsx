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
    queryKey: ["activities"],
    queryFn: () => getActivities({ userId }),
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

  const handleDropdownChange = (_e: any, { value }: any) => {
    setNewActivity({ ...newActivity, type: value });
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
        >
          <Header icon="rocket" content="Create a New Activity" />
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Activity Name</label>
                <Input
                  placeholder="e.g., Drink Water, Read 20 Pages"
                  onChange={handleNewActivityChange}
                  name="name"
                  value={newActivity.name}
                />
              </Form.Field>
              <Form.Field>
                <label>Tracking Type</label>
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
                <Form.Group widths="equal">
                  <Form.Field>
                    <label>Goal Value</label>
                    <Input
                      type="number"
                      placeholder="e.g. 100"
                      name="goalValue"
                      value={newActivity.goalValue || ""}
                      onChange={handleNewActivityChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Unit/Metric</label>
                    <Input
                      placeholder="e.g. $, pages, km"
                      name="unit"
                      value={newActivity.unit || ""}
                      onChange={handleNewActivityChange}
                    />
                  </Form.Field>
                </Form.Group>
              )}

              <Form.Field>
                <label>Description (Optional)</label>
                <TextArea
                  placeholder="Additional context or notes"
                  style={{ minHeight: 80 }}
                  onChange={handleNewActivityChange}
                  name="description"
                  value={newActivity.description}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => setIsModalOpen(false)}>
              <Icon name="remove" /> Cancel
            </Button>
            <Button color="green" onClick={handleNewActivity} loading={createActivityLoading}>
              <Icon name="checkmark" /> Create Activity
            </Button>
          </Modal.Actions>
        </Modal>
      </div>

      <Activities activities={activities} refetch={refetch} />
    </div>
  );
};

export default Home;
