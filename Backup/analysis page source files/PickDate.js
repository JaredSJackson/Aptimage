import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

render();
{
  return (
    <div>
      {/* <DatePicker onChange={onChange} />
      <br />
      <MonthPicker onChange={onChange} placeholder="Select month" />
      <br /> */}
      <RangePicker onChange={onChange} />
      {/* <br />
      <WeekPicker onChange={onChange} placeholder="Select week" /> */}
    </div>
  );
}

export default PickDate;
