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
      <Segment
        textAlign="center"
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        <Header style={{ marginTop: "10px", letterSpacing: "3px" }}>
          You can Add a new Feature
        </Header>
        <Input placeholder="Enter a New Feature" />
        <Form>
          <TextArea
            placeholder="Description"
            style={{
              minHeight: 80,
            }}
          />
        </Form>
        <Button
          style={{
            letterSpacing: "2px",
          }}
        >
          Add Feature
        </Button>
      </Segment>
      <Segment placeholder>
        <Header
          style={{
            letterSpacing: "2px",
          }}
        >
          My Features
        </Header>
        <Grid>
          <GridRow stretched>
            <GridColumn>
              {cards.map((card: any, index: number) => (
                <Segment key={index}>
                  <Header sub as="h2">
                    {card.name}
                    <HeaderSubHeader>{card.percent}</HeaderSubHeader>
                  </Header>
                </Segment>
              ))}
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    </>
  );
};

export default Home;
