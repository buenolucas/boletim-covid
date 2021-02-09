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
    casos: { type: Object },
    "casos.confirmados": { type: Object },
    "casos.confirmados.recuperados": {
      type: SimpleSchema.Integer,
    },
    "casos.confirmados.ativos": { label: "Casos Ativos", type: Object },
    "casos.confirmados.ativos.isolamento": {
      label: "Isolamento Domicioliar",
      type: SimpleSchema.Integer,
    },
    "casos.confirmados.ativos.ala": {
      label: "Internados em Ala",
      type: SimpleSchema.Integer,
    },
    "casos.confirmados.ativos.uti": {
      label: "Internados em UTI",
      type: SimpleSchema.Integer,
    },
    "casos.confirmados.obitos": { type: SimpleSchema.Integer },

    "casos.suspeitos": { type: Object },
    "casos.suspeitos.isolamento": {
      label: "Isolamento Domicioliar",
      type: SimpleSchema.Integer,
    },
    "casos.suspeitos.ala": {
      label: "Internados em Ala",
      type: SimpleSchema.Integer,
    },
    "casos.suspeitos.uti": {
      label: "Internados em UTI",
      type: SimpleSchema.Integer,
    },
    "casos.suspeitos.obitos": {
      label: "Óbitos em Investigalção",
      type: SimpleSchema.Integer,
    },
    "casos.descartados": { type: Object },
    "casos.descartados.exame": {
      label: "Descartados por exame LAboratorial",
      type: SimpleSchema.Integer,
    },
    "casos.descartados.alta": {
      label: "Alta - Síndrome Gripal",
      type: SimpleSchema.Integer,
    },
    "casos.descartados.sars": {
      label: "Sìndrome Respiratória Aguda Grave",
      type: SimpleSchema.Integer,
    },
    vacinados: {
      label: "Indivíduos Vacinados",
      type: SimpleSchema.Integer,
    },
  },
  {
    requiredByDefault: false,
  }
);

export const bridge = new SimpleSchema2Bridge(schema);
