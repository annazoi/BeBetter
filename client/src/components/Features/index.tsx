import { FC } from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
  Card,
  GridColumn,
  Form,
  TextArea,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { Feature } from "../../interfaces/feature";
import Modal from "../ui/Modal";
import { HistoryType } from "../../enums/historyType";

interface FeaturesProps {
  data: Feature[] | undefined;
  handleModal: (id: string, type: HistoryType) => void;
  onSave?: () => void;
  onClose?: () => void;
  onOpen?: any;
  onChange?: any;
  desctiprionValue?: string;
  selectedFeature?: Feature;
}

const Features: FC<FeaturesProps> = ({
  data,
  handleModal,
  onSave,
  onClose,
  onOpen,
  onChange,
  desctiprionValue,
  selectedFeature,
}) => {
  return (
    <>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
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
                      onClick={() => {
                        handleModal(feature.id, HistoryType.NEGATIVE);
                      }}
                    />
                    <Button
                      icon="plus"
                      color="green"
                      onClick={() => {
                        handleModal(feature.id, HistoryType.POSITIVE);
                      }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </GridColumn>
        </Grid>
      </Segment>
      <Modal
        name={selectedFeature?.name}
        onOpen={onOpen}
        onClose={onClose}
        onSave={onSave}
      >
        <div>
          <Form>
            <TextArea
              placeholder="Description"
              style={{
                minHeight: 80,
              }}
              onChange={onChange}
              name="description"
              value={desctiprionValue}
            />
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Features;
