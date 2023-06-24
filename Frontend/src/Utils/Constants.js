
const BASE_URL = "";

const SEARCH_BOOKS_URL = BASE_URL + "search-book";
const ADD_BOOK_URL = BASE_URL + "add-book";
const FETCH_FRAPPE_BOOKS_URL = BASE_URL + "fetch-books-from-frappe";
const ADD_MEMBER_URL = BASE_URL + "add-new-member";
const SEARCH_MEMBERS_URL = BASE_URL + "search-member";
const ISSUE_BOOK_URL = BASE_URL + "rent-book";
const RETURN_BOOK_URL = BASE_URL + "return-book";

export const apis = {
    SEARCH_BOOKS_URL,
    ADD_BOOK_URL,
    FETCH_FRAPPE_BOOKS_URL,
    ADD_MEMBER_URL,
    SEARCH_MEMBERS_URL,
    ISSUE_BOOK_URL,
    RETURN_BOOK_URL
};

export const modalStyle = {
    position: 'absolute',
    marginTop: '20px',
    top: '50%',
    left: '44%',
    transform: 'translate(-39%, -50%)',
    width: 500,
    p: 4,
};