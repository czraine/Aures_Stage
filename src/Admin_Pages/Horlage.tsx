import React, { useState } from 'react';
import { Layout, TimePicker, theme } from 'antd';
import './App.css'; // Import your custom CSS for styling
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface'; // Import RangeValue type

const { Content } = Layout;

function Horlage() {

    const defaultTimeRange: RangeValue<Dayjs> = [dayjs().startOf('day'), dayjs().endOf('day')];
    const [firstdayStart, setFirstdayStart] = useState(dayjs().startOf('day'));
    const [secondayStart, setsecondayStart] = useState(dayjs().startOf('day'));
    const [thirdayStart, setthirdayStart] = useState(dayjs().startOf('day'));
    const [fourthdayStart, setfourthdayStart] = useState(dayjs().startOf('day'));
    const [fifthdayStart, setfifthdayStart] = useState(dayjs().startOf('day'));
    const [sixithdayStart, setsixithdayStart] = useState(dayjs().startOf('day'));
    const [seventhdayStart, setseventhdayStart] = useState(dayjs().startOf('day'));
    const [firstdayEnd, setFirstdayEnd] = useState(dayjs().endOf('day'));
    const [secondayEnd, setsecondayEnd] = useState(dayjs().endOf('day'));
    const [thirdayEnd, setthirdayEnd] = useState(dayjs().endOf('day'));
    const [fourthdayEnd, setfourthdayEnd] = useState(dayjs().endOf('day'));
    const [fifthdayEnd, setfifthdayEnd] = useState(dayjs().endOf('day'));
    const [sixithdayEnd, setsixithdayEnd] = useState(dayjs().endOf('day'));
    const [seventhdayEnd, setseventhdayEnd] = useState(dayjs().endOf('day'));
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleTimeRangeChange = (timeRange: Dayjs) => {
        setFirstdayStart(timeRange);
        console.log(timeRange);
    };
    return (
        <Content className="horlage-container">
            <div className="horlage-content" style={{ background: colorBgContainer }}>
                <div className="day">
                    <strong> weekDays </strong>
                    <div className="time-picker-container">
                        <div className="black-box" />
                        <div className='psst' ><strong > hours  </strong></div>

                    </div>
                </div>
                <div>
                    <strong>Monday</strong>
                    <TimePicker
                        value={firstdayStart}
                        onChange={handleTimeRangeChange}
                    />
                </div>
                <div>
                    <strong>Tuesday</strong> <TimePicker />
                </div>
                <div>
                    <strong>Wednesday</strong> <TimePicker />
                </div>
                <div>
                    <strong>Thursday</strong> <TimePicker />
                </div>
                <div>
                    <strong>Friday</strong> <TimePicker />
                </div>
                <div>
                    <strong>Saturday</strong> <TimePicker />
                </div>
                <div>
                    <strong>Sunday</strong> <TimePicker />
                </div>
            </div>
        </Content>
    );
}

export default Horlage;
