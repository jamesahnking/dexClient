import React, { useState } from 'react';

// onSelect: select a new token
// activeItem; Active Token
// items: list of tokens

function Dropdown({ items, activeItem, onSelect }) {
    
    // define state for expanding the dropdown
    const [dropdownVisible, setDropdownVisible] = useState(false);

    //define selected Item 
    const selectItem = (e, item) => {
        e.preventDefault(); // prevent from reloading hte page
        setDropdownVisible(!dropdownVisible);
        onSelect(item);
    }

    return (
    <div className='dropdown ml-3'>
        <button 
        className="btn btn-secondary dropdown-toggle" 
        type="button" 
        onClick={() => setDropdownVisible(!dropdownVisible)}>
        {activeItem.label}
        </button>

        <div className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>
            {items && items.map((item, i) => (
                <a
                    className={`dropdown-item ${item.value === activeItem.value ? 'active' : null}`}
                    href=''
                    key={i}
                    onClick={e => selectItem(e, item.value)}
                >
                {item.label}
                </a>
            ))}
        </div>
    </div>
    );
}

export default Dropdown;