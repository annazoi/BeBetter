import { FC, useState } from "react";
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput,
} from "semantic-ui-calendar-react";

const Calendar: FC = () => {
  const [value, setValue] = useState<any>();

  const handleDateChange = (e: any) => {
    setValue(e.target.vaue);
    console.log(e.target.value);
  };

  return (
    <>
      <DateInput inline name="date" value={value} onChange={handleDateChange} />
    </>
  );
};

export default Calendar;
