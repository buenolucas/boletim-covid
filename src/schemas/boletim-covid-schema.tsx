import SimpleSchema from "simpl-schema";

import { SimpleSchema2Bridge } from "uniforms-bridge-simple-schema-2";

const getNow = () => {};
const schema = new SimpleSchema(
  {
    number: {
      type: SimpleSchema.Integer,
      label: "Número do Boletim",
      min: 1,
    },
    datePublished: {
      type: Date,
      label: "Data de Publicação",
      defaultValue: new Date(),
    },
    nivel: {
      type: SimpleSchema.Integer,
      label: "Nível de Alerta",
    },
    internados_sus_gv: {
      type: SimpleSchema.Integer,
      label: "Internados em UTI GV",
    },
    internados_sus_other: {
      type: SimpleSchema.Integer,
      label: "Internados em UTI Outros",
    },
    factor_sus: {
      type: SimpleSchema.Integer,
      label: "Internados em UTI Outros",
    },
    factor_other: {
      type: SimpleSchema.Integer,
      label: "Internados em UTI Outros",
    },
  },
  {
    requiredByDefault: false,
  }
);

export const bridge = new SimpleSchema2Bridge(schema);
