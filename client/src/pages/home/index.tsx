import { FC, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
  Card,
  GridColumn,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { useMutation, useQuery } from "react-query";
import { createFeature, getFeatures } from "../../services/feature";
import { NewFeature } from "../../interfaces/feature";
import { authStore } from "../../store/authStore";

const Home: FC = () => {
  const { userId } = authStore((store) => store);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { data } = useQuery({
    queryKey: "features",
    queryFn: () => getFeatures({ userId: userId }),
  });
  console.log(data);

  const { mutate: createFeatureMutate, isLoading: createFeatureLoading } =
    useMutation({
      mutationFn: ({ name, description }: NewFeature) =>
        createFeature({
          name,
          description,
        }),
    });

  const cards = [
    {
      name: "card 1",
      percent: "100%",
    },
    {
      name: "card 2",
      percent: "100%",
    },
    {
      name: "card 3",
      percent: "89%",
    },
    {
      name: "card 4",
      percent: "10%",
    },
    {
      name: "card 5",
      percent: "30%",
    },
    {
      name: "card 6",
      percent: "60%",
    },
    {
      name: "card 7",
      percent: "40%",
    },
  ];

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
  return (
    <>
      <Grid
        style={{
          justifyContent: "center",
        }}
      >
        <Form>
          <Segment
            textAlign="center"
            style={{
              display: "grid",
              gap: "20px",
              maxWidth: "500px",
              margin: "10px auto",
            }}
          >
            <Header style={{ marginTop: "10px", letterSpacing: "3px" }}>
              You can Add a new Feature
            </Header>
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
        {/* <Divider vertical></Divider> */}
        <Segment
          placeholder
          style={{
            maxWidth: "700px",
            margin: "10px auto",
          }}
        >
          <Header
            style={{
              letterSpacing: "2px",
            }}
          >
            My Features
          </Header>
          <Grid>
            <GridColumn>
              {cards.map((card: any, index: number) => (
                <Card key={index} style={{ padding: "5px" }}>
                  <Header sub as="h2">
                    {card.name}
                    <HeaderSubHeader>{card.percent}</HeaderSubHeader>
                  </Header>
                </Card>
              ))}
            </GridColumn>
          </Grid>
        </Segment>
      </Grid>
    </>
  );
};

export default Home;
