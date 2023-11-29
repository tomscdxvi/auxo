import React from 'react'
import { slide as Menu } from 'react-burger-menu';


export default function SideBar() {
    return (
        <Menu>
            <a href="/home" className='menu-item'>
                Home
            </a>

            <a href="/track" className='menu-item'>
                    Track Workout
            </a>

            <a href="/plan" className='menu-item'>
                <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                    View Plans
                </SignUpItem>
            </a>

            <a href="/calculate" className='menu-item'>
                <SignUpItem style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }}>
                    Calculate
                </SignUpItem>
            </a>

            <a style={{ color: 'white', borderBottom: '2px solid white', marginTop: '24px' }} onClick={handleLogOutModal}>
                Log Out
            </a>

            <Modal
                open={logOutModalOpen}
                onClose={handleLogOutModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Log Out
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Do you wish to log out of this account?
                    </Typography>
                    <div className="flex mt-12">
                        <Button theme="outline-white" text="Back" onClick={handleLogOutModalClose} className="mr-9" /> 
                        <Button theme="filled" text="Confirm" className="mr-9" onClick={handleLogOut} /> 
                    </div>
                </Box>
            </Modal>
        </Menu>
    )
}
