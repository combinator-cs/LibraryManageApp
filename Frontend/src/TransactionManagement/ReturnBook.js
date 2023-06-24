import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { apis } from '../Utils/Constants';


export default function ReturnBook() {

    const [bookId, setBookId] = React.useState();
    const [memberId, setMemberId] = React.useState();

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(apis.RETURN_BOOK_URL, {
            bookId: bookId,
            memberId: memberId
        })
            .then((response) => {
                console.log(response.data)
                if (response != null && response.data === 'True') {
                    setBookId("")
                    setMemberId("")
                    Swal.fire(
                        'Return Successfull!',
                        '', 'success'
                    )
                } else {
                    Swal.fire(
                        response.data,
                        '', 'error'
                    )
                }
            })
            .catch(function (error) {
                console.log(error);
                Swal.fire(
                    "Error in Returning Book",
                    '', 'error'
                )
            });
    };

    return (
        <div id="customForm">
            <form onSubmit={submitHandler}>
                <input
                    id="bookId"
                    name="bookId"
                    type="text"
                    placeholder="Book Id"
                    maxLength="30"
                    value={bookId}
                    required
                    onChange={e => setBookId(e.target.value)}
                />
                <input
                    id="memberId"
                    name="memberId"
                    type="text"
                    placeholder="Member Id"
                    maxLength="30"
                    value={memberId}
                    required
                    onChange={e => setMemberId(e.target.value)}
                />
                <input id="submit" type="submit" value="RETURN" />
            </form>
        </div >
    );
}
