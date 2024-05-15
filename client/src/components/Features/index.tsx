import { FC } from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
  Card,
  GridColumn,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { Feature } from "../../interfaces/feature";

interface FeaturesProps {
  data: Feature[];
  handlePositiveOption: (id: string) => void;
  handleNegativeOption: (id: string) => void;
}

const Features: FC<FeaturesProps> = ({
  data,
  handleNegativeOption,
  handlePositiveOption,
}) => {
  return (
    <Segment
      only="computer"
      placeholder
      style={{
        maxWidth: "300px",
        minWidth: "300px",
      }}
    >
      <em
        style={{
          letterSpacing: "3px",
          color: "black",
          fontSize: "16px",
          marginBottom: "15px",
        }}
      >
        My Features
      </em>
      <Grid>
        <GridColumn>
          {data?.map((feature: Feature, index: number) => (
            <Card key={index} style={{ padding: "5px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Header sub as="h2" textAlign="left">
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
  );
};

export default Features;
