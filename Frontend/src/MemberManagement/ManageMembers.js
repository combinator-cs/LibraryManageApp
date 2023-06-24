import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { apis, modalStyle } from '../Utils/Constants';


export default function ManageMembers() {

    const [member_name, setMemberName] = React.useState("");
    const [members, setMembers] = React.useState([]);

    const [memberId, setMemberId] = React.useState();
    const [name, setName] = React.useState();
    const [mob_number, setMobNumber] = React.useState();
    const [email_id, setEmailId] = React.useState();
    const [address, setAddress] = React.useState();

    const [modal_submit_value, setModalSubmitValue] = React.useState("ADD MEMBER");

    const [open, setOpen] = React.useState(false);
    const handleEdit = (member) => {
        clearEarlierMemberDetails();
        if (member != null) {
            setMemberId(member.memberId)
            setName(member.name)
            setMobNumber(member.mob_number);
            setEmailId(member.email_id);
            setAddress(member.address);
            setModalSubmitValue("UPDATE MEMBER");
        } else {
            setModalSubmitValue("ADD MEMBER");
        }
        setOpen(true)
    };
    const handleDelete = (member) => {
    };
    const handleClose = () => setOpen(false);

    const submitSearchHandler = (event) => {
        event.preventDefault();
        axios.get(apis.SEARCH_MEMBERS_URL, {
            params: {
                name: member_name,
            }
        })
            .then((response) => {
                setMembers(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const submitAddHandler = (event) => {
        event.preventDefault();
        axios.post(apis.ADD_MEMBER_URL, {
            name: name,
            mob_number: mob_number,
            email_id: email_id,
            address: address
        })
            .then((response) => {
                clearEarlierMemberDetails();
                if (response != null && response.data.memberId != null) {
                    handleClose();
                    Swal.fire(
                        'Member Saved!',
                        '', 'success'
                    )
                } else {
                    Swal.fire(
                        'Error in Saving Member Details!',
                        '', 'error'
                    )
                }
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire(
                    'Error in Saving Member Details!',
                    '', 'error'
                )
            });
    };

    function clearEarlierMemberDetails() {
        setMemberId("");
        setName("");
        setMobNumber("");
        setEmailId("");
        setAddress("");
    }

    return (
        <>
            <div>
                <Button style={{ color: 'black', backgroundColor: 'cyan' }} onClick={() => handleEdit(null)}>ADD MEMBER</Button>
            </div>
            <div id="customForm">
                <form onSubmit={submitSearchHandler}>
                    <input
                        id="member_name"
                        name="member_name"
                        type="text"
                        placeholder="Member Name"
                        maxLength="100"
                        onChange={e => setMemberName(e.target.value)}
                    />
                    <input id="submit" type="submit" value="SEARCH" />
                </form>
            </div >

            <div>
                <table className="customTable">
                    <thead>
                        <tr>
                            <th>Member Id</th>
                            <th>Title</th>
                            <th>Mobile Number</th>
                            <th>Email</th>
                            <th>Due Amount</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    {members.map((item, index) => {
                        return (
                            <tbody>
                                <tr key={index}>
                                    <td>{item.memberId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.mob_number}</td>
                                    <td>{item.email_id}</td>
                                    <td>{item.due_amt}</td>
                                    <td colSpan="1"><Button onClick={() => handleEdit(item)}>Edit</Button></td>
                                    <td colSpan="1"><Button onClick={() => handleDelete(item)} style={{ color: 'red' }}>Delete</Button></td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-form">
                            <div id="customForm" >
                                <form onSubmit={submitAddHandler}>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Member Name"
                                        maxLength="100"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <input
                                        id="mob_number"
                                        name="mob_number"
                                        type="number"
                                        placeholder="Mobile Number"
                                        max={9999999999}
                                        min={0}
                                        value={mob_number}
                                        onChange={e => setMobNumber(e.target.value)}
                                    />
                                    <input
                                        id="email_id"
                                        name="email_id"
                                        type="text"
                                        placeholder="Email ID"
                                        maxLength="70"
                                        value={email_id}
                                        onChange={e => setEmailId(e.target.value)}
                                    />
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Address"
                                        maxLength="100"
                                        value={address}
                                        onChange={e => setAddress(e.target.value)}
                                    />
                                    <input id="submit" type="submit" value={modal_submit_value} />
                                </form>
                            </div >
                        </Typography>
                    </Box>
                </Modal>
            </div>

        </>
    );
}
