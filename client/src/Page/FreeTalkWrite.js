import React from 'react';
import { useState } from 'react'

function FreeTalkWrite() {
    const [textContent, setTextContent] = useState({
        title: '',
        content: ''
    })

    const [saveContent, setSaveContent] = useState([]);

    // const getValue = e => {
    //     const { name, value } = e.target;
    //     setTextContent({
    //         ...textContent,
    //         [name]: value
    //     })
    // }
    return (
        <div className="write-board">
            <h1>FreeTalk</h1>
            <div className='wirte-container'>
                {saveContent.map(element =>
                    <div>
                        <h2>{element.title}</h2>
                        <div>
                            {element.content}
                        </div>
                    </div>
                )}
            </div>
            <div className='form-wrapper'>
                <input
                    className="title-input"
                    type='text'
                    placeholder='제목'
                    onChange={() => {
                    }}
                    name="title" />
                <textarea className="text-area" placeholder='내용'></textarea>
            </div>
            <button className="submit-button"
                onClick={() => {
                    setSaveContent(saveContent.concat({ ...textContent }));
                }}>입력</button>
        </div>
    );
}

export default FreeTalkWrite;