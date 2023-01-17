import React, {useState} from 'react'

const Row = ({ defaultValue, placeholder }) => {
    
    const [value, setValue] = useState(defaultValue);
    const [disabled, setDisabled] = useState(true);    

    const handleEditClick = () => {
        setDisabled(false);
      };
    
      const handleSaveClick = () => {
        setDisabled(true);
        console.log(">> " + value);
        // save logic goes here
      };

    return (
        <div>
             <label className="col">
                <div className="row">
                    <p className="bold nowrap inline-value-title">Test Name:&nbsp; </p>
                    <input
                    type="text"
                    className="form-reset inline-input"
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    />
                    {disabled && (
                    <button
                        type="button"
                        onClick={handleEditClick}
                        className="inline-button edit-val-btn prokaBtn"
                    >
                        edit
                    </button>
                    )}
                    {!disabled && (
                    <button
                        type="button"
                        onClick={handleSaveClick}
                        className="hidden inline-button save-val-btn prokaBtn">
                        save
                    </button>
                    )}
                </div>
            </label>
        </div>
    )
}

export default Row
