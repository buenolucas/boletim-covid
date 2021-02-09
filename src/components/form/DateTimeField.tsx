import React, { Ref } from "react";
import { HTMLFieldProps, connectField, filterDOMProps } from "uniforms";

export type DateFieldProps = HTMLFieldProps<
  Date,
  HTMLDivElement,
  { inputRef?: Ref<HTMLInputElement>; max?: Date; min?: Date }
>;
