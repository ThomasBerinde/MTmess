import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState, useEffect } from 'react';

const UserBar = ({ user, setAddButton }) => {

    // Toggles the friend search bar
    const wrapperHandler = () => {
        setAddButton(1);
    }

    return (
        <div className={'userbar'}>
            <h2>{user}
                <PersonAddIcon id="addButton" onClick={wrapperHandler}/>
            </h2>
        </div>
    )
}

export default UserBar
