import React from "react";
import { AutoField, AutoForm, SubmitField, DateField } from "uniforms-antd";
import { blue, green, red, yellow, purple } from "@ant-design/colors";

import { bridge as schema } from "../schemas/boletim-covid-schema";
import { Typography, Divider, Card, Col, Row, Steps, Space } from "antd";
import TimeField from "../components/form/TimeField";

const { Title, Paragraph, Text, Link } = Typography;

const cardStyle = (color: any) => {
  return { borderLeft: `6px solid ${color}` };
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const fieldProps = {
  size: "large",
  showInlineError: true,
};

export function CovidBoletimCreate(props: any) {
  const [current, setCurrent] = React.useState(0);

  const submit = (fields: any) => {
    props.onSubmit(fields);
  };
  return (
    <AutoForm
      schema={schema}
      onSubmit={submit}
      autosave={true}
      model={props.model}
    >
      <Space
        direction="vertical"
        style={{ display: "flex", marginTop: 20, marginBottom: 20 }}
      >
        <Card style={cardStyle(blue.primary)}>
          <Title level={3}>Geral</Title>
          <AutoField name="number" {...fieldProps} />
          <Row gutter={16} align="bottom">
            <Col span={12}>
              <DateField
                name="datePublished"
                size="large"
                showTime={false}
                label={true}
              />
            </Col>
            <Col span={12}>
              <TimeField name="datePublished" size="large" label={false} />
            </Col>
          </Row>
        </Card>
      </Space>
    </AutoForm>
  );
}

export default CovidBoletimCreate;
