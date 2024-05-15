import { FC, useEffect, useState } from "react";
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
  Icon,
  GridRow,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { useMutation, useQuery } from "react-query";
import {
  createFeature,
  createHistory,
  getFeatures,
} from "../../services/feature";
import { Feature, NewFeature } from "../../interfaces/feature";
import { authStore } from "../../store/authStore";
import { create } from "zustand";
import { set } from "react-hook-form";

const Home: FC = () => {
  const { userId } = authStore((state) => state);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["features"],
    queryFn: () => getFeatures({ userId }),
  });
  // useEffect(() => {
  //   console.log("Data", data);
  // }, [data]);

  const { mutate: createFeatureMutate, isLoading: createFeatureLoading } =
    useMutation({
      mutationFn: ({ name, description }: NewFeature) =>
        createFeature({
          name,
          description,
        }),
    });

  const { mutate: createHistoryMutate } = useMutation({
    mutationFn: ({ featureId, history }: any) =>
      createHistory(featureId, history),
  });

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

  const handleHistory = (featureId: string, history: any) => {
    createHistoryMutate({
      featureId: featureId,
      history: history,
    });
  };

  const handleNegativeOption = (featureId: string) => {
    handleHistory(featureId, {
      description: "Negative",
      type: "NEGATIVE",
    });
    console.log("Negative Option");
  };

  const handlePositiveOption = (featureId: string) => {
    handleHistory(featureId, {
      description: "Positive",
      type: "POSITIVE",
    });
    console.log("Positive Option");
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
              {data?.map((feature: Feature, index: number) => (
                <Card key={index} style={{ padding: "5px" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Header sub as="h2">
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
                        onClick={() => handleNegativeOption(feature.id)}
                      />
                      <Button
                        icon="plus"
                        color="green"
                        onClick={() => handlePositiveOption(feature.id)}
                      />
                    </div>
                  </div>
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
