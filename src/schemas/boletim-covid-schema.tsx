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
  },
  {
    requiredByDefault: false,
  }
);

export const bridge = new SimpleSchema2Bridge(schema);
