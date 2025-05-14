import './timer.css';
import React from 'react';
import { useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import { Cursor, set } from 'mongoose';

const Timer = (() => {

    const [ogMinute, setOGMinute] = useState(25);
    const [ogSecond, setOGSecond] = useState(0);

    const [minute, setMinute] = useState(25);
    const [second, setSecond] = useState(0);

    const [buttonBool, setButtonBool] = useState(false);
    const [buttonName, setButtonName] = useState('Start');

    const [goal, setGoal] = useState('click the pencil to set a goal! ✏️');

    useEffect(() => {
        if (buttonBool == true) {
            const intervalID = setInterval(() => {
                if (second == 0) {
                    if (minute == 0) {
                        clearInterval(intervalID);
                    } else {
                        setMinute(minute - 1);
                        setSecond(59);
                    }
                } else {
                    setSecond(second - 1);
                }
    
            }, 1000);
    
            return() => clearInterval(intervalID);
        }
    }, [buttonBool, minute, second])

    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedSecond = second.toString().padStart(2, '0');

    const editPopup = () => {
        return (
            <div className='PopupBody'>
                <div className='editPopupRow' id='inputRow'>
                    <div className='PopupInput'>
                        <label for='minuteInput'>Minutes:</label>
                        <input id='minuteInput' type='number'></input>
                    </div>

                    <div className='PopupInput'>
                        <label for='secondInput'>Seconds:</label>
                        <input id='secondInput' type='number'></input>
                    </div>
                </div>

                <div className='editPopupRow'>
                    <button className='saveButton'
                        onClick={() => {
                            let newMinute = document.getElementById('minuteInput').value;
                            let newSecond = document.getElementById('secondInput').value;

                            if (newMinute >= 0 && newSecond >= 0 && newSecond <= 59) {
                                setOGMinute(newMinute);
                                setOGSecond(newSecond);
                                setMinute(newMinute);
                                setSecond(newSecond);
                            } else {
                                throw console.error('Invalid input');
                            }

                            setButtonBool(false);
                            setButtonName('Start');
                    }}>Save</button>
                </div>
            </div>
        )
    };

    const goalPopup = () => {
        return (
            <div className='PopupBody'>
                <div className='PopupInput'>
                    <label for='goalInput'>Goal:</label>
                    <input id='goalInput' type='text'></input>
                </div>

                <button className='saveButton'
                    onClick={() => {
                        let newGoal = document.getElementById('goalInput').value;

                        if (newGoal.length <= 63) {
                            setGoal(newGoal);
                        } else {
                            throw console.error('Invalid input');
                        }
                }}>Save</button>
            </div>
        )
    }

    return (
        <div id='body'>
            <div id= 'goalRow'>
                <h2>goal: study timer build sess 🤖</h2>
                <Popup
                    trigger={
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>
                    }
                    modal>
                {goalPopup}</Popup>
            </div>

            <h1>
                <span>{formattedMinute}:{formattedSecond}</span>
            </h1>

            <div id='buttonRow'>
                <button onClick={() => {
                    setButtonBool(false);
                    if (buttonName == 'Pause') {
                        setButtonName('Start');
                    }
                    setMinute(ogMinute);
                    setSecond(ogSecond);
                }}>
                    Reset
                </button>

                <button 
                    onClick={() => {setButtonBool(!buttonBool)
                        if (buttonName == 'Start') {
                            setButtonName('Pause');
                        } else {
                            setButtonName('Start');
                        }
                }}>{buttonName}</button>

                <Popup 
                    trigger={<button>
                        Edit
                    </button>}
                    modal>
                {editPopup}</Popup>
                
            </div>
            
        </div>
    )
});

export default Timer;