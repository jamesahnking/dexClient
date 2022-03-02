import React, { useState } from 'react';

// onSelect: select a new token
// activeItem; Active Token
// items: list of tokens

function Dropdown({onSelect, activeItem, items}) {
    // define state for expanding the dropdown
    const [dropdownVisible, setDropdownVisible] = useState(false);


    //define selected Item 
    const selectItem = (e, item) => {
        e.preventDefault();
        setDropdownVisible(!dropdownVisible);
        onSelect(item);
    }

    return (
    <div className="dropdown ms-3">
        
        {/* Dropdown Button  */} 
        <button className="btn btn-secondary dropdown-toggle" 
            type="button" 
            onClick={() => setDropdownVisible(!dropdownVisible)}>
            
            {activeItem.label}
        </button>

        {/* Dropdown Menue  */} 
        <div className={`dropdown-menue ${dropdownVisible ? 'visible' : ''}}`}>
            
                    {/* iterate through the dropdown items array if not defined */}
            {items && items.map((item, i) => (
                <a
                    className={`dropdown-item ${item.value === activeItem.value ? 'active' : null}`}
                    href='https://www.google.com'
                    key={i}
                    onClick={e => selectItem(e, item.value)}
                >

                {item.label}
                </a>

            ))}
        </div>
    </div>//dropdown end 
    )
}

export default Dropdown;