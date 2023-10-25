import React, { useState, useEffect } from 'react';
import { Layout, TimePicker, message, theme } from 'antd';
import './App.css'; // Import your custom CSS for styling
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface'; // Import RangeValue type
import "./style.css";
import { Button } from 'react-bootstrap';

function Horlage2() {
    const [workingHours, setWorkingHours] = useState({
        lundi: { debut: "", fin: "", number: "1" },
        Mardi: { debut: "", fin: "", number: "2" },
        Mercredi: { debut: "", fin: "", number: "3" },
        Jeudi: { debut: "", fin: "", number: "4" },
        Vendredi: { debut: "", fin: "", number: "5" },
        Samedi: { debut: "", fin: "", number: "6" },
        Dimanche: { debut: "", fin: "", number: "0" },
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:5000/Settings`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    console.error('Failed to fetch data');
                    return;
                }

                const data = await response.json();
                setWorkingHours(data.parametre.travailHoraire);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        fetchData();
    }, []);
    const handleTimeChange = (day: string, field: string, time: string) => {
        setWorkingHours(prevHours => ({
            ...prevHours,
            [day]: {
                ...prevHours[day],
                [field]: time,
            },
        }));
        console.log(time);
    };
    const onSubmitForm = async () => {
        try {
            const parametre = {
                travailHoraire: workingHours
            };
            const body = { parametre };

            const response = await fetch(`http://localhost:5000/Settings`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            message.success("Data updated successfully");
        } catch (err) {
            console.log("Something went wrong", err);
        }
    };
    return (
        <div className="frame">
            <div className="text-wrapper">Lundi</div>
            <div className="div">Mardi</div>
            <div className="text-wrapper-2">Mercredi</div>
            <div className="text-wrapper-3">Jeudi</div>
            <div className="text-wrapper-4">Vendredi</div>
            <div className="text-wrapper-5">Samedi</div>
            <div className="text-wrapper-6">Dimanche</div>
            <div className="component-wrapper">
                <th className="TH-instance"  ><div className="design-component-instance-node" >Working&nbsp;&nbsp;hours</div></th>
            </div>
            <div className="TABLE">

                <div className="TR">
                    <div className="text-wrapper-7">De</div>
                    <TimePicker
                        value={dayjs(workingHours.lundi.debut, 'HH:mm')}
                        onChange={(time) => handleTimeChange("lundi", "debut", time.format('HH:mm'))}
                        size="large"
                    />
                    <div className="text-wrapper-8">A</div>
                    <TimePicker
                        value={dayjs(workingHours.lundi.fin, 'HH:mm')}
                        onChange={(time) => handleTimeChange("lundi", "fin", time.format('HH:mm'))}
                        size="large"
                    />
                </div>
                <div className="TR">
                    <div className="text-wrapper-7">De</div>
                    <TimePicker
                        value={dayjs(workingHours.Mardi.debut, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Mardi", "debut", time.format('HH:mm'))}
                        size="large"
                    />
                    <div className="text-wrapper-8">A</div>
                    <TimePicker
                        value={dayjs(workingHours.Mardi.fin, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Mardi", "fin", time.format('HH:mm'))}
                        size="large"
                    />
                </div><div className="TR">
                    <div className="text-wrapper-7">De</div>
                    <TimePicker
                        value={dayjs(workingHours.Mercredi.debut, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Mercredi", "debut", time.format('HH:mm'))}
                        size="large"
                    />
                    <div className="text-wrapper-8">A</div>
                    <TimePicker
                        value={dayjs(workingHours.Mercredi.fin, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Mercredi", "fin", time.format('HH:mm'))}
                        size="large"
                    />
                </div>
                <div className="TR">
                    <div className="text-wrapper-7">De</div>
                    <TimePicker
                        value={dayjs(workingHours.Jeudi.debut, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Jeudi", "debut", time.format('HH:mm'))}
                        size="large"
                    />
                    <div className="text-wrapper-8">A</div>
                    <TimePicker
                        value={dayjs(workingHours.Jeudi.fin, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Jeudi", "fin", time.format('HH:mm'))}
                        size="large"
                    />
                </div><div className="TR">
                    <div className="text-wrapper-7">De</div>
                    <TimePicker
                        value={dayjs(workingHours.Vendredi.debut, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Vendredi", "debut", time.format('HH:mm'))}
                        size="large"
                    />
                    <div className="text-wrapper-8">A</div>
                    <TimePicker
                        value={dayjs(workingHours.Vendredi.fin, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Vendredi", "fin", time.format('HH:mm'))}
                        size="large"
                    />
                </div>
                <div className="TR">
                    <div className="text-wrapper-7">De</div>
                    <TimePicker
                        value={dayjs(workingHours.Samedi.debut, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Samedi", "debut", time.format('HH:mm'))}
                        size="large"
                    />
                    <div className="text-wrapper-8">A</div>
                    <TimePicker
                        value={dayjs(workingHours.Samedi.fin, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Samedi", "fin", time.format('HH:mm'))}
                        size="large"
                    />
                </div>
                <div className="TR">
                    <div className="text-wrapper-7">De</div>
                    <TimePicker
                        value={dayjs(workingHours.Dimanche.debut, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Dimanche", "debut", time.format('HH:mm'))}
                        size="large"
                    />
                    <div className="text-wrapper-8">A</div>
                    <TimePicker
                        value={dayjs(workingHours.Dimanche.fin, 'HH:mm')}
                        onChange={(time) => handleTimeChange("Dimanche", "fin", time.format('HH:mm'))}
                        size="large"
                    />
                </div>


                <Button variant="outline-secondary" onClick={onSubmitForm}>Submit</Button>{' '}
            </div>
        </div>

    );
};

export default Horlage2;
