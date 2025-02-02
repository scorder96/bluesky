import { useEffect, useState } from "react";
import { Input } from "./input";

interface Props {
  onTimeSelect: (time: string) => void;
  time: string;
}
export default function TimePicker({ onTimeSelect, time }: Props) {
  return (
    <Input
      type="time"
      className="max-w-fit"
      value={time}
      onChange={(e) => onTimeSelect(e.target.value)}
      required
    ></Input>
  );
}
