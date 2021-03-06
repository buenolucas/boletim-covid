import React from "react";
import {
  AutoField,
  AutoFields,
  AutoForm,
  ErrorField,
  SubmitField,
  NestField,
  DateField,
} from "uniforms-antd";
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

export function CreateCovidBoletim() {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submit = (fields: any) => {
    console.log(fields);
  };
  return (
    <AutoForm schema={schema} onSubmit={submit}>
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

        <Card style={cardStyle(red.primary)}>
          <Title level={4}>Casos Confirmados</Title>
          <AutoField name="casos.confirmados.recuperados" {...fieldProps} />

          <AutoField name="casos.confirmados.ativos.ala" {...fieldProps} />
          <AutoField name="casos.confirmados.ativos.uti" {...fieldProps} />
          <AutoField
            name="casos.confirmados.ativos.isolamento"
            {...fieldProps}
          />
          <AutoField name="casos.confirmados.obitos" {...fieldProps} />
        </Card>

        <Card style={cardStyle(yellow.primary)}>
          <Title level={4}>Casos Suspeitos</Title>
          <AutoField name="casos.suspeitos.isolamento" {...fieldProps} />
          <AutoField name="casos.suspeitos.ala" {...fieldProps} />
          <AutoField name="casos.suspeitos.uti" {...fieldProps} />
          <AutoField name="casos.suspeitos.obitos" {...fieldProps} />
        </Card>

        <Card style={cardStyle(green.primary)}>
          <Title level={4}>Investigação Concluída</Title>
          <AutoField name="casos.descartados.exame" {...fieldProps} />
          <AutoField name="casos.descartados.sars" {...fieldProps} />
          <AutoField name="casos.descartados.alta" {...fieldProps} />
        </Card>

        <Card style={cardStyle(purple.primary)}>
          <Title level={4}>Vacinados</Title>
          <AutoField name="vacinados" {...fieldProps} />
        </Card>

        <Card>
          <SubmitField onSubmit={submit} size="large" value="Gerar Boletim" />
        </Card>
      </Space>
    </AutoForm>
  );
}
