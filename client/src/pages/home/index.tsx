import React, { FC } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  SegmentInline,
  SegmentGroup,
  Card,
  GridColumn,
  GridRow,
  Form,
  Input,
  TextArea,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const Home: FC = () => {
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
            <Input placeholder="Enter a New Feature" />
            <TextArea
              placeholder="Description"
              style={{
                minHeight: 80,
              }}
            />
            <Button
              style={{
                letterSpacing: "2px",
              }}
              color="olive"
            >
              Add Feature
            </Button>
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
