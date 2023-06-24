import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import { invalidateString } from "../Utils/AppUtils";
import { apis } from '../Utils/Constants';



export default function FetchBooks() {

    const [title, setTitle] = React.useState("");
    const [author, setAuthor] = React.useState("");
    const [isbn, setIsbn] = React.useState("");
    const [publisher, setPublisher] = React.useState("");
    const [import_count, setImportCount] = React.useState("");
    const [each_book_count, setEachBookCount] = React.useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        if (validateFetchForm()) {
            axios.post(apis.FETCH_FRAPPE_BOOKS_URL, {
                title: title,
                author: author,
                isbn: isbn,
                publisher: publisher,
                import_count: import_count,
                each_book_count: each_book_count
            })
                .then((response) => {
                    if (response != null && response.data > 0) {
                        clearEntries();
                        Swal.fire(
                            response.data + 'Book Fetched!',
                            '', 'success'
                        )
                    } else {
                        Swal.fire(
                            'Error in Fetching and Saving Books!',
                            '', 'error'
                        )
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    Swal.fire(
                        'Error in Fetching and Saving Books!',
                        '', 'error'
                    )
                });
        }
    };

    function clearEntries() {
        setTitle("");
        setAuthor("");
        setIsbn("");
        setPublisher("");
        setImportCount("");
        setEachBookCount("");
    }

    function validateFetchForm() {
        if (invalidateString(title) && invalidateString(author) && (invalidateString(isbn) && isbn.trim().length !== 10) &&
            invalidateString(publisher)) {
            Swal.fire('Please enter Atleast One Field for Book Details!');
            return false;
        }
        if (invalidateString(import_count)) {
            Swal.fire('Please enter Import Count');
            return false;
        }
        if (invalidateString(each_book_count)) {
            Swal.fire('Please enter Each Book Count');
            return false;
        }
        return true;
    }

    return (
        <div id="customForm">
            <form onSubmit={submitHandler}>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Book Title"
                    maxLength="100"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    id="author"
                    name="author"
                    type="text"
                    placeholder="Book Author"
                    maxLength="30"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                />
                <input
                    id="isbn"
                    name="isbn"
                    type="text"
                    placeholder="ISBN"
                    maxLength="10"
                    value={isbn}
                    onChange={e => setIsbn(e.target.value)}
                />
                <input
                    id="publisher"
                    name="publisher"
                    type="text"
                    placeholder="Publisher"
                    maxLength="30"
                    value={publisher}
                    onChange={e => setPublisher(e.target.value)}
                />
                <input
                    id="import_count"
                    name="import_count"
                    type="number"
                    placeholder="Import Count"
                    maxLength="5"
                    min={1}
                    required
                    onChange={e => setImportCount(e.target.value)}
                />
                <input
                    id="each_book_count"
                    name="each_book_count"
                    type="number"
                    placeholder="Each Book Count"
                    maxLength="5"
                    min={1}
                    required
                    onChange={e => setEachBookCount(e.target.value)}
                />
                <input id="submit" type="submit" value="FETCH AND STORE" />
            </form>
        </div >
    );
}
