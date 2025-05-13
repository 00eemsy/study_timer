import './timer.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Timer = (() => {

    const [minute, setMinute] = useState(25);
    const [second, setSecond] = useState(0);

    const [buttonBool, setButtonBool] = useState(false);
    const [buttonName, setButtonName] = useState('Start');

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
            <div id='editPopupBody'>
                <div className='editPopupRow'>
                    <div className='editPopupInput'>
                        <label for='minuteInput'>Minutes:</label>
                        <input id='minuteInput' type='number'></input>
                    </div>

                    <div className='editPopupInput'>
                        <label for='secondInput'>Seconds:</label>
                        <input id='secondInput' type='number'></input>
                    </div>
                </div>

                <div className='editPopupRow'>
                    <button id='saveButton'
                        onClick={() => {
                            let newMinute = document.getElementById('minuteInput').value;
                            let newSecond = document.getElementById('secondInput').value;

                            if (newMinute >= 0 && newSecond >= 0 && newSecond <= 59) {
                                setMinute(newMinute);
                                setSecond(newSecond);
                            } else {
                                throw console.error('Invalid input');
                            }
                    }}>Save</button>
                </div>
            </div>
        )
    };

    return (
        <div id='body'>
            <h2>goal: revise tute ✨</h2>
            
            <h1>
                <span>{formattedMinute}:{formattedSecond}</span>
            </h1>

            <div id='buttonRow'>
                <button>
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

                {/* <Popup trigger={<button> Trigger</button>} position="right center">
                    <div>Popup content here !!</div>
                </Popup> */}

                <Popup 
                    onClick={() => {setButtonBool(false)}}
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