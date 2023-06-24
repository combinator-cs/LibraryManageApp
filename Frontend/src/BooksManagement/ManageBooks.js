import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from "axios";
import React from "react";
import Select from 'react-select';
import Swal from 'sweetalert2';
import { invalidateString } from '../Utils/AppUtils';
import { apis, modalStyle } from '../Utils/Constants';
import { lang_codes } from '../Utils/LanguageCodes';


export default function ManageBooks() {

    const colourStyles = {
        control: styles => ({
            ...styles,
            marginBottom: "20px",
            width: "100%",
            height: "50px",
            fontSize: "1em",
            backgroundColor: "#f3f3f3"
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
            };
        },
    };


    const [searchTitle, setSearchTitle] = React.useState("");
    const [searchAuthor, setSearchAuthor] = React.useState("");
    const [books, setBooks] = React.useState([]);

    const [bookId, setBookId] = React.useState();
    const [title, setTitle] = React.useState();
    const [authors, setAuthors] = React.useState();
    const [average_rating, setAverageRating] = React.useState();
    const [isbn, setIsbn] = React.useState();
    const [isbn13, setIsbn13] = React.useState();
    const [language_code, setLanguageCode] = React.useState();
    const [num_pages, setNumPages] = React.useState();
    const [ratings_count, setRatingsCount] = React.useState();
    const [text_reviews_count, setTextReviewsCount] = React.useState();
    const [publisher, setPublisher] = React.useState();
    const [publication_date, setPublicationDate] = React.useState();

    const [modal_submit_value, setModalSubmitValue] = React.useState("ADD BOOK");

    const [open, setOpen] = React.useState(false);
    const handleEdit = (book) => {
        clearEarlierBookDetails();
        if (book != null) {
            setBookId(book.bookId)
            setTitle(book.title);
            setAuthors(book.authors);
            setAverageRating(book.average_rating);
            setIsbn(book.isbn);
            setIsbn13(book.isbn13);
            setLanguageCode(book.language_code);
            setNumPages(book.num_pages);
            setRatingsCount(book.ratings_count);
            setTextReviewsCount(book.text_reviews_count);
            setPublisher(book.publisher);
            setPublicationDate(book.publication_date);
            setModalSubmitValue("UPDATE BOOK");
        } else {
            setModalSubmitValue("ADD BOOK");
        }
        setOpen(true)
    };
    const handleDelete = (book) => {
    };
    const handleClose = () => setOpen(false);


    const getLanguageLabel = language_code => {
        if (language_code != null && language_code.length > 0) {
            const selected = lang_codes.filter(option => option.alpha3 === language_code);
            return selected[0].English + " (" + selected[0].alpha3 + ")";
        } else {
            return "Type to search"
        }
    };


    const submitSearchHandler = (event) => {
        event.preventDefault();
        axios.get(apis.SEARCH_BOOKS_URL, {
            params: {
                title: searchTitle,
                author: searchAuthor
            }
        })
            .then((response) => {
                console.log(response.data)
                setBooks(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    };



    const submitAddHandler = (event) => {
        event.preventDefault();
        if (validateAddForm()) {
            axios.post(apis.ADD_BOOK_URL, {
                title: title,
                authors: authors,
                average_rating: average_rating,
                isbn: isbn,
                isbn13: isbn13,
                language_code: language_code,
                num_pages: num_pages,
                ratings_count: ratings_count,
                text_reviews_count: text_reviews_count,
                publication_date: publication_date,
                publisher: publisher,
            })
                .then((response) => {
                    clearEarlierBookDetails();
                    if (response != null && response.data.bookId != null) {
                        handleClose();
                        Swal.fire(
                            'Book Saved!',
                            '', 'success'
                        )
                    } else {
                        Swal.fire(
                            'Error in Saving Book!',
                            '', 'error'
                        )
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    Swal.fire(
                        'Error in Saving Book!',
                        '', 'error'
                    )
                });
        }
    };

    function clearEarlierBookDetails() {
        setBookId("")
        setTitle("");
        setAuthors("");
        setAverageRating("");
        setIsbn("");
        setIsbn13("");
        setPublisher("");
        setLanguageCode("");
        setNumPages("");
        setRatingsCount("");
        setTextReviewsCount("");
        setPublicationDate(Date());
    }   

    function validateAddForm() {
        if (invalidateString(title)) {
            Swal.fire('Please enter Book Title!');
            return false;
        }
        if (invalidateString(authors)) {
            Swal.fire('Please enter Authors!');
            return false;
        }
        if (invalidateString(average_rating)) {
            Swal.fire('Please enter Average rating!');
            return false;
        }
        if (invalidateString(isbn) && isbn.trim().length !== 10) {
            Swal.fire('Please enter ISBN!');
            return false;
        }
        if (invalidateString(isbn13) && isbn13.trim().length !== 13) {
            Swal.fire('Please enter ISBN13!');
            return false;
        }
        if (invalidateString(language_code)) {
            Swal.fire('Please enter Language!');
            return false;
        }
        if (invalidateString(num_pages)) {
            Swal.fire('Please enter Number of Pages!');
            return false;
        }
        if (invalidateString(publisher)) {
            Swal.fire('Please enter Publisher!');
            return false;
        }
        if (publication_date == null) {
            Swal.fire('Please enter Publication Date!');
            return false;
        }
        if (invalidateString(average_rating)) {
            Swal.fire('Please enter Average Rating!');
            return false;
        }
        if (invalidateString(ratings_count)) {
            Swal.fire('Please enter Ratings Count!');
            return false;
        }
        if (invalidateString(text_reviews_count)) {
            Swal.fire('Please enter Text Reviews Count!');
            return false;
        }
        return true;
    }


    return (
        <>
            <div>
                <Button style={{ color: 'black', backgroundColor: 'cyan' }} onClick={() => handleEdit(null)}>ADD BOOK</Button>
            </div>
            <div id="customForm">
                <form onSubmit={submitSearchHandler}>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Book Title"
                        maxLength="100"
                        onChange={e => setSearchTitle(e.target.value)}
                    />
                    <input
                        id="author"
                        name="author"
                        type="text"
                        placeholder="Book Author"
                        maxLength="30"
                        onChange={e => setSearchAuthor(e.target.value)}
                    />
                    <input id="submit" type="submit" value="SEARCH" />
                </form>
            </div>


            <div>
                <table className="customTable">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Rating</th>
                            <th>Publisher</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    {books.map((item, index) => {
                        return (
                            <tbody>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.authors}</td>
                                    <td>{item.average_rating}</td>
                                    <td>{item.publisher}</td>
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
                                        value={authors}
                                        onChange={e => setAuthors(e.target.value)}
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
                                        id="isbn13"
                                        name="isbn13"
                                        type="text"
                                        placeholder="ISBN13"
                                        maxLength="13"
                                        value={isbn13}
                                        onChange={e => setIsbn13(e.target.value)}
                                    />
                                    <label>Language (code)</label>
                                    <Select
                                        id="language_code"
                                        name="language_code"
                                        placeholder={<div>Type to search</div>}
                                        options={lang_codes}
                                        value={{ English: getLanguageLabel(language_code) }}
                                        onChange={item => setLanguageCode(item.alpha3)}
                                        styles={colourStyles}
                                        getOptionLabel={option => { return option.English }}
                                        getOptionValue={option => { return option.alpha3 }}
                                    />

                                    <input
                                        id="num_pages"
                                        name="num_pages"
                                        type="number"
                                        placeholder="Number of Pages"
                                        maxLength="10"
                                        value={num_pages}
                                        onChange={e => setNumPages(e.target.value)}
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
                                        id="publication_date"
                                        name="publication_date"
                                        type="date"
                                        asp-format="{0:yyyy-MM-dd}"
                                        placeholder="Publication Date"
                                        value={publication_date}
                                        onChange={e => setPublicationDate(e.target.value)}
                                    />
                                    <input
                                        id="average_rating"
                                        name="average_rating"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        maxLength="5"
                                        placeholder="Average Rating"
                                        value={average_rating}
                                        onChange={e => setAverageRating(e.target.value)}
                                    />
                                    <input
                                        id="ratings_count"
                                        name="ratings_count"
                                        type="number"
                                        maxLength="10"
                                        min="0"
                                        placeholder="Ratings Count"
                                        value={ratings_count}
                                        onChange={e => setRatingsCount(e.target.value)}
                                    />
                                    <input
                                        id="text_reviews_count"
                                        name="text_reviews_count"
                                        type="number"
                                        maxLength="10"
                                        min="0"
                                        placeholder="Text Reviews Count"
                                        value={text_reviews_count}
                                        onChange={e => setTextReviewsCount(e.target.value)}
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
