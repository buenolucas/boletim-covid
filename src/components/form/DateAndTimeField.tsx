import TimePicker, { TimePickerProps } from "antd/lib/time-picker";
import moment, { Moment } from "moment";
import React, { Ref } from "react";
import { connectField, FieldProps, filterDOMProps } from "uniforms";

import { wrapField } from "uniforms-antd";

export type TimeFieldProps = FieldProps<
  Date | Moment,
  TimePickerProps,
  // FIXME: Seems like DatePickerProps doesn't contain 'showTime'.
  { inputRef?: Ref<typeof TimePicker>; showTime?: boolean }
>;

const defaultStyle = { width: "100%" };

function DateAndTime({
  showTime = true,
  style = defaultStyle,
  ...props
}: TimeFieldProps) {
  return wrapField(
    props,
    <TimePicker
      disabled={props.disabled}
      name={props.name}
      onChange={(value) => {
        props.onChange(value ? value.toDate() : undefined);
      }}
      placeholder={props.placeholder}
      // @ts-ignore: `DatePicker` is an intersection.
      ref={props.inputRef}
      style={style}
      value={props.value && moment(props.value)}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField(DateAndTime, { kind: "leaf" });
