// import axios from "axios";
// import React from "react";
// import Select from 'react-select';
// import Swal from 'sweetalert2';
// import { lang_codes } from '../Utils/LanguageCodes';

// export default function AddBook() {

//     const colourStyles = {
//         control: styles => ({
//             ...styles,
//             marginBottom: "20px",
//             width: "100%",
//             height: "50px",
//             fontSize: "1em",
//             backgroundColor: "#f3f3f3"
//         }),
//         option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//             return {
//                 ...styles,
//             };
//         },
//     };

//     const [title, setTitle] = React.useState();
//     const [authors, setAuthors] = React.useState();
//     const [average_rating, setAverageRating] = React.useState();
//     const [isbn, setIsbn] = React.useState();
//     const [isbn13, setIsbn13] = React.useState();
//     const [language_code, setLanguageCode] = React.useState();
//     const [num_pages, setNumPages] = React.useState();
//     const [ratings_count, setRatingsCount] = React.useState();
//     const [text_reviews_count, setTextReviewsCount] = React.useState();
//     const [publisher, setPublisher] = React.useState();
//     const [publication_date, setPublicationDate] = React.useState();
//     const submitHandler = (event) => {
//         event.preventDefault();
//         if (validateForm()) {
//             axios.post("", {
//                 title: title,
//                 authors: authors,
//                 average_rating: average_rating,
//                 isbn: isbn,
//                 isbn13: isbn13,
//                 language_code: language_code,
//                 num_pages: num_pages,
//                 ratings_count: ratings_count,
//                 text_reviews_count: text_reviews_count,
//                 publication_date: publication_date,
//                 publisher: publisher,
//             })
//                 .then((response) => {
//                     console.log(response.data)
//                     setTitle("")
//                     setAuthors("")
//                     setAverageRating("")
//                     setIsbn("")
//                     setIsbn13("")
//                     setLanguageCode("")
//                     setNumPages("")
//                     setRatingsCount("")
//                     setTextReviewsCount("")
//                     setPublicationDate(Date())
//                     alert("Book Saved!")
//                 })
//                 .catch(function (error) {
//                     console.log(error);
//                 });
//         }
//     };

//     function validateForm() {
//         if (validateString(title)) {
//             Swal.fire('Please enter Book Title!');
//             return false;
//         }
//         if (validateString(authors)) {
//             Swal.fire('Please enter Authors!');
//             return false;
//         }
//         if (validateString(average_rating)) {
//             Swal.fire('Please enter Average rating!');
//             return false;
//         }
//         if (validateString(isbn) && isbn.trim().length !== 10) {
//             Swal.fire('Please enter ISBN!');
//             return false;
//         }
//         if (validateString(isbn13) && isbn13.trim().length === 13) {
//             Swal.fire('Please enter ISBN13!');
//             return false;
//         }
//         if (validateString(language_code)) {
//             Swal.fire('Please enter Language!');
//             return false;
//         }
//         if (num_pages == null) {
//             Swal.fire('Please enter Number of Pages!');
//             return false;
//         }
//         if (validateString(publisher)) {
//             Swal.fire('Please enter Publisher!');
//             return false;
//         }
//         if (validateString(publication_date)) {
//             Swal.fire('Please enter Publication Date!');
//             return false;
//         }
//         if (average_rating == null) {
//             Swal.fire('Please enter Average Rating!');
//             return false;
//         }
//         if (ratings_count == null) {
//             Swal.fire('Please enter Ratings Count!');
//             return false;
//         }
//         if (text_reviews_count == null) {
//             Swal.fire('Please enter Text Reviews Count!');
//             return false;
//         }
//     }

//     function validateString(str) {
//         if (str == null || str.trim().length < 1) {
//             return false;
//         }
//     }

//     return (
//         <div id="customForm">
//             <form onSubmit={submitHandler}>
//                 <input
//                     id="title"
//                     name="title"
//                     type="text"
//                     placeholder="Book Title"
//                     maxLength="100"
//                     value={title}
//                     onChange={e => setTitle(e.target.value)}
//                 />
//                 <input
//                     id="author"
//                     name="author"
//                     type="text"
//                     placeholder="Book Author"
//                     maxLength="30"
//                     value={authors}
//                     onChange={e => setAuthors(e.target.value)}
//                 />
//                 <input
//                     id="isbn"
//                     name="isbn"
//                     type="text"
//                     placeholder="ISBN"
//                     maxLength="10"
//                     value={isbn}
//                     onChange={e => setIsbn(e.target.value)}
//                 />
//                 <input
//                     id="isbn13"
//                     name="isbn13"
//                     type="text"
//                     placeholder="ISBN13"
//                     maxLength="13"
//                     value={isbn13}
//                     onChange={e => setIsbn13(e.target.value)}
//                 />
//                 <label>Language (code)</label>
//                 <Select
//                     id="language_code"
//                     name="language_code"
//                     placeholder={<div>Type to search</div>}
//                     options={lang_codes}
//                     value={language_code}
//                     onChange={setLanguageCode}
//                     styles={colourStyles}
//                     getOptionLabel={(option) => (option.name) + ' (' + (option.code) + ')'}
//                     getOptionValue={(option) => option.code}
//                 />
//                 <input
//                     id="num_pages"
//                     name="num_pages"
//                     type="number"
//                     placeholder="Number of Pages"
//                     maxLength="10"
//                     value={num_pages}
//                     onChange={e => setNumPages(e.target.value)}
//                 />
//                 <input
//                     id="publisher"
//                     name="publisher"
//                     type="text"
//                     placeholder="Publisher"
//                     maxLength="30"
//                     value={publisher}
//                     onChange={e => setPublisher(e.target.value)}
//                 />
//                 <input
//                     id="publication_date"
//                     name="publication_date"
//                     type="date"
//                     placeholder="Publication Date"
//                     value={publication_date}
//                     onChange={e => setPublicationDate(e.target.value)}
//                 />
//                 <input
//                     id="average_rating"
//                     name="average_rating"
//                     type="number"
//                     step="0.1"
//                     min="0"
//                     maxLength="5"
//                     placeholder="Average Rating"
//                     value={average_rating}
//                     onChange={e => setAverageRating(e.target.value)}
//                 />
//                 <input
//                     id="ratings_count"
//                     name="ratings_count"
//                     type="number"
//                     maxLength="10"
//                     min="0"
//                     placeholder="Ratings Count"
//                     value={ratings_count}
//                     onChange={e => setRatingsCount(e.target.value)}
//                 />
//                 <input
//                     id="text_reviews_count"
//                     name="text_reviews_count"
//                     type="number"
//                     maxLength="10"
//                     min="0"
//                     placeholder="Text Reviews Count"
//                     value={text_reviews_count}
//                     onChange={e => setTextReviewsCount(e.target.value)}
//                 />
//                 <input id="submit" type="submit" value="ADD BOOK" />
//             </form>
//         </div >
//     );
// }
