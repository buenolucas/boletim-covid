import React, { useState } from "react";
import { Button, Card, Col, Row, Space, Steps } from "antd";
import { CovidBoletimCreate, CovidBoletimInsertData } from "../forms";
import BoletimPreview from "../components/BoletimPreview";
import { transform } from "typescript";

const { Step } = Steps;

const steps = [
  {
    title: "Criar Boletim",
    content: "First-content",
  },
  {
    title: "Inserir Dados",
    content: "Second-content",
  },
  {
    title: "Gerar Boletim",
    content: "Last-content",
  },
];

const colors = {
  green: "#0D973B",
  lightGreen: "#77F767",
  orange: "#ED8F3B",
  blue: "#06359D",
  red: "#F10909",
};
const typography = {
  h1: "58px GothamBold",
  h2: "42px GothamBold",
  h3: "32px GothamBold",
};
const _fields = [
  //
  // geral
  //
  {
    x: 820,
    y: 193,
    weight: 67,
    color: colors.lightGreen,
    font: typography.h2,
    textAlign: "left",
    value: (data: any) => data.number,
    transform: "number",
  },
  {
    x: 712,
    y: 247,
    weight: 276,
    color: colors.lightGreen,
    font: typography.h3,
    textAlign: "left",
    value: "12/10/10 15h",
  },
  //
  // vacinados
  //
  {
    id: "vacinados",
    x: 238,
    y: 342,
    weight: 208,
    color: colors.lightGreen,
    font: typography.h2,
    textAlign: "right",
    value: (data: any) => data.vacinados,
    transform: "number",
  },
  //
  //
  //
  {
    id: "casos.confirmados",
    x: 238,
    y: 471,
    weight: 208,
    color: "#FFFFFF",
    font: typography.h1,
    textAlign: "right",
    value: ({ casos: { confirmados } }: any) =>
      confirmados.recuperados +
      confirmados.obitos +
      confirmados.ativos.isolamento +
      confirmados.ativos.ala +
      +confirmados.ativos.uti,
    transform: "number",
  },
  {
    x: 238,
    y: 596,
    weight: 208,
    color: colors.orange,
    font: typography.h1,
    textAlign: "right",
    value: ({ casos: { suspeitos } }: any) =>
      suspeitos.isolamento + suspeitos.ala + suspeitos.uti + +suspeitos.obitos,
    transform: "number",
  },
  {
    x: 238,
    y: 715,
    weight: 208,
    color: colors.green,
    font: typography.h1,
    textAlign: "right",
    value: ({ casos: { descartados } }: any) =>
      descartados.exame + descartados.alta + descartados.sars,
    transform: "number",
  },
  {
    id: "",
    x: 238,
    y: 834,
    weight: 208,
    color: colors.blue,
    font: typography.h1,
    textAlign: "right",
    value: (data: any) => data.vacinados,
    transform: "number",
  },
  //
  // recuperados
  //
  {
    x: 810,
    y: 340,
    weight: 105,
    color: "#FFFFFF",
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.confirmados.recuperados,
    transform: "number",
  },
  {
    id: "casos.confirmados.ala",
    x: 810,
    y: 392,
    weight: 105,
    color: colors.red,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.confirmados.ativos.ala,
    transform: "number",
  },
  {
    id: "casos.confirmados.uti",
    x: 810,
    y: 450,
    weight: 105,
    color: colors.red,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.confirmados.ativos.uti,
    transform: "number",
  },
  {
    id: "casos.confirmados.domicilio  ",
    x: 810,
    y: 500,
    weight: 105,
    color: colors.red,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.confirmados.ativos.isolamento,
    transform: "number",
  },
  {
    id: "casos.confirmados.obitos",
    x: 810,
    y: 550,
    weight: 105,
    color: colors.red,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.confirmados.obitos,
    transform: "number",
  },

  //
  // suspeitos
  //
  {
    x: 810,
    y: 663,
    weight: 105,
    color: colors.orange,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.suspeitos.isolamento,
    transform: "number",
  },
  {
    x: 810,
    y: 723,
    weight: 105,
    color: colors.orange,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.suspeitos.ala,
    transform: "number",
  },
  {
    x: 810,
    y: 773,
    weight: 105,
    color: colors.orange,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.suspeitos.uti,
    transform: "number",
  },
  {
    id: "casos.suspeitos.domicilio",
    x: 810,
    y: 827,
    weight: 105,
    color: colors.orange,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.suspeitos.obitos,
    transform: "number",
  },

  //
  // descartados
  //
  {
    id: "casos.descartados.exame",
    x: 810,
    y: 949,
    weight: 105,
    color: colors.green,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.descartados.exame,
    transform: "number",
  },
  {
    id: "casos.descartados.sars",
    x: 810,
    y: 1021,
    weight: 105,
    color: colors.green,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.descartados.sars,
    transform: "number",
  },
  {
    id: "casos.descartados.alta",
    x: 810,
    y: 1087,
    weight: 105,
    color: colors.green,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.casos.descartados.alta,
    transform: "number",
  },
];

const CreateCovidReport = () => {
  const [current, setCurrent] = useState(0);
  const [dados, setDados] = React.useState({});
  const [fields, setFields] = React.useState<any>([{}]);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const generate = () => {
    const arr = _fields.map((field) => {
      if (field && field.value) {
        let v =
          typeof field.value === "string" ? field.value : field.value(dados);
        if (field.transform) {
          if (field.transform === "number") {
            v = v.toLocaleString("pt-br", {
              useGrouping: true,
              minimumIntegerDigits: 3,
            });
          }
        }
        field.value = v;

        return field;
      }
    });
    setFields(arr);
    setCurrent(current + 1);
  };

  const renderContent = () => {
    switch (current) {
      case 0:
        return (
          <div className="container-sm">
            <CovidBoletimCreate onSubmit={setDados} model={dados} />
          </div>
        );
      case 1:
        return (
          <div className="container-sm">
            <CovidBoletimInsertData onSubmit={setDados} model={dados} />
          </div>
        );
      case 2:
        return (
          <div className="container-full">
            <BoletimPreview fields={fields} />
          </div>
        );
      default:
        break;
    }
  };
  return (
    <div>
      <div className="container-sm steps">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>

      {renderContent()}

      <Card style={{}}>
        <Row>
          <Col span={12}>
            {current > 0 && (
              <Button
                style={{ margin: "0 8px" }}
                onClick={() => prev()}
                size="large"
              >
                Voltar
              </Button>
            )}
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            {current === 0 && (
              <Button
                type="primary"
                size="large"
                style={{ margin: "0 8px" }}
                onClick={() => next()}
              >
                Próximo
              </Button>
            )}

            {current === 1 && (
              <Button
                type="primary"
                size="large"
                style={{ margin: "0 8px" }}
                onClick={() => generate()}
              >
                Finalizar
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CreateCovidReport;
