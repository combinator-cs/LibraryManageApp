import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { apis } from '../Utils/Constants';


export default function IssueBook() {

    const [bookId, setBookId] = React.useState();
    const [memberId, setMemberId] = React.useState();
    const [rent_amt, setRentAmount] = React.useState();

    const submitHandler = (event) => {
        event.preventDefault();
        axios.post(apis.ISSUE_BOOK_URL, {
            bookId: bookId,
            memberId: memberId,
            rent_amt: rent_amt
        })
            .then((response) => {
                console.log(response.data)
                if (response != null && response.data === 'True') {
                    setBookId("")
                    setMemberId("")
                    setRentAmount("")
                    Swal.fire(
                        'Issue Successfull!',
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
                    "Error in Issuing Book",
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
                <input
                    id="rent_per_day"
                    name="rent_per_day"
                    type="number"
                    placeholder="Rent Amount"
                    maxLength="6"
                    min={1}
                    value={rent_amt}
                    required
                    onChange={e => setRentAmount(e.target.value)}
                />
                <input id="submit" type="submit" value="ISSUE" />
            </form>
        </div >
    );
}
