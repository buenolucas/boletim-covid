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
  green: "#27A70A",
  lightGreen: "#4BDF31",
  orange: "#ED8F3B",
  blue: "#06359D",
  red: "#F10909",
};
const typography = {
  h1: "110px GothamBold",
  h2: "84px GothamBold",
  h3: "42px GothamBold",
  h4: "26px GothamBold",
};
const _fields = [
  //
  // geral
  //
  {
    x: 588,
    y: 291,
    width: 251,
    color: "#6AD755",
    font: typography.h4,
    textAlign: "left",

    value: (data: any) => {
      const dt: Date = data.datePublished || new Date();
      const d = dt.getDate().toString().padStart(2, "0");
      const m = (dt.getMonth() + 1).toString().padStart(2, "0");
      const y = dt.getFullYear();
      const h = dt.getHours().toString().padStart(2, "0");
      let str = `${d}/${m}/${y} - ${h}h`;
      return str;
    },
  },
  //
  // nivel
  //
  {
    x: 595,
    y: 341,
    width: 221,
    color: colors.lightGreen,
    font: typography.h4,
    textAlign: "left",
    value: (data: any) => data.nivel,
    transform: "number",
  },

  //
  // ocupacao
  //
  {
    x: 586,
    y: 590,
    width: 56,
    color: colors.red,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.internados_sus_gv,
    transform: "number",
  },

  {
    x: 586,
    y: 650,
    width: 56,
    color: colors.red,
    font: typography.h3,
    textAlign: "right",
    value: (data: any) => data.internados_sus_other,
    transform: "number",
  },

  {
    x: 382,
    y: 595,
    width: 140,
    color: colors.red,
    font: typography.h2,
    textAlign: "right",
    value: (data: any) => data.internados_sus_other + data.internados_sus_gv,
    transform: "number",
  },

  {
    x: 331,
    y: 786,
    width: 231,
    color: colors.green,
    font: typography.h1,
    textAlign: "right",
    value: (data: any) => data.factor_sus,
    transform: "percent",
  },

  {
    x: 455,
    y: 940,
    width: 231,
    color: colors.orange,
    font: typography.h1,
    textAlign: "left",
    value: (data: any) => data.factor_other,
    transform: "percent",
  },

  //
  //
  //
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
              minimumIntegerDigits: 2,
            });
          } else if (field.transform === "percent") {
            v =
              v.toLocaleString("pt-br", {
                useGrouping: true,
                minimumIntegerDigits: 2,
              }) + "%";
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
    <>
      <div className="main-area">
        <div className="container-sm steps">
          <Steps current={current}>
            {steps.map((item, index) => (
              <Step key={index} />
            ))}
          </Steps>
        </div>

        {renderContent()}
      </div>
      <Card style={{}}>
        <Row>
          <Col span={12}>
            {current > 0 && (
              <Button
                style={{ margin: "0 8px", fontFamily: "GothamBold" }}
                onClick={() => prev()}
                size="large"
              >
                Voltar
              </Button>
            )}
          </Col>
          <Col
            span={12}
            style={{ textAlign: "right", fontFamily: "GothamBold" }}
          >
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
                style={{ margin: "0 8px", fontFamily: "GothamBold" }}
                onClick={() => generate()}
              >
                Finalizar
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CreateCovidReport;
