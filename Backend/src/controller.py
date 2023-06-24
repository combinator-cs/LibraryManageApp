import datetime
import json
import logging

import requests
from flask import Blueprint, request
from flask_cors import cross_origin

from config import db
from models import Book, BookSchema, MemberSchema, Member, Transaction, RentInfo

controller_bp = Blueprint('controller', __name__)

# req_book_fields = ['bookId', 'title', 'authors', 'average_rating', 'publisher']
book_schema = BookSchema(many=False)
books_schema = BookSchema(many=True)

member_schema = MemberSchema(many=False)
members_schema = MemberSchema(many=True)


@controller_bp.route("/add-book", methods=['POST'])
@cross_origin()
def add_book():
    try:
        new_book = Book(**request.json)
        db.session.add(new_book)
        db.session.commit()
        return book_schema.jsonify(new_book)
    except RuntimeError as err:
        logging.error("Runtime error while adding new book: %s", err)
    except TypeError as typeErr:
        logging.error("Type error while adding new book: %s", typeErr)
    return "Error"


@controller_bp.route("/fetch-all-books", methods=['GET'])
@cross_origin()
def fetch_all_books():
    book_list = Book.query.all()
    return books_schema.jsonify(book_list)


@controller_bp.route("/fetch-books-from-frappe", methods=['POST'])
@cross_origin()
def fetch_books_from_frappe():
    _str = "?"
    if request.json['title']:
        _str += "title=" + request.json['title'] + "&"
    if request.json['author']:
        _str += "author=" + request.json['author'] + "&"
    if request.json['isbn']:
        _str += "isbn=" + request.json['isbn'] + "&"
    if request.json['publisher']:
        _str += "publisher=" + request.json['publisher'] + "&"

    import_count = request.json['import_count']
    each_book_count = request.json['each_book_count']
    if not import_count and not each_book_count:
        try:
            last_elems_count = import_count % 20
            max_api_call_count = (import_count / 20) + (0 if (last_elems_count == 0) else 1)
            itr = 0
            response_data = []
            while itr < max_api_call_count:
                _str += "page=" + (itr + 1).__str__()
                response = requests.get('https://frappe.io/api/method/frappe-library' + _str)
                data = json.loads(response.text)['message']
                if len(data) > last_elems_count:
                    data = data[:last_elems_count]
                response_data.append(data)
            book_list_data = []
            for book in response_data:
                book_already_present = Book.query.filter(Book.fetched_book_id == book['bookID']).first()
                if not book_already_present:
                    book_data = Book(fetched_book_id=book['bookID'], title=book['title'], authors=book['authors'],
                                     average_rating=book['average_rating'], isbn=book['isbn'], isbn13=book['isbn13'],
                                     language_code=book['language_code'], num_pages=int(book["  num_pages"]),
                                     ratings_count=book['ratings_count'], text_reviews_count=book['text_reviews_count'],
                                     publisher=book['publisher'], total_count=each_book_count,
                                     available_count=each_book_count,
                                     publication_date=datetime.datetime.strptime(book['publication_date'], "%m/%d/%Y"))
                else:
                    book_already_present.total_count += each_book_count
                    book_already_present.available_count += each_book_count
                    book_data = book_already_present
                book_list_data.append(book_data)
            db.session.add_all(book_list_data)
            db.session.commit()
            return len(book_list_data).__str__()
        except Exception as err:
            logging.error("Error while adding new books from Frappe Api: %s", err)
    return "0"


@controller_bp.route("/fetch-book-by-id", methods=['GET'])
def fetch_book_by_id():
    book = Book.query.get(request.args.get('book_id'))
    return book_schema.jsonify(book)


@controller_bp.route("/search-book", methods=['GET'])
@cross_origin()
def search_books():
    title = "%{}%".format(request.args.get('title'))
    author = "%{}%".format(request.args.get('author'))
    books = Book.query.filter(Book.title.like(title), Book.authors.like(author)).all()
    return books_schema.jsonify(books)


@controller_bp.route("/add-new-member", methods=['POST'])
def add_new_member():
    try:
        new_member = Member(**request.json)
        new_member.total_amt = 0
        new_member.due_amt = 0
        db.session.add(new_member)
        db.session.commit()
        return member_schema.jsonify(new_member)
    except Exception as err:
        logging.error("Error while adding new member: %s", err)
    return "Error"


@controller_bp.route("/search-member", methods=['GET'])
@cross_origin()
def search_members():
    name = "%{}%".format(request.args.get('name'))
    members = Member.query.filter(Member.name.like(name)).all()
    return members_schema.jsonify(members)


@controller_bp.route("/rent-book", methods=['POST'])
def rent_book():
    member = Member.query.get(request.json['memberId'])
    book = Book.query.get(request.json['bookId'])
    rent_amt = int(request.json['rent_amt'])

    try:
        if (member is not None) and (
                book is not None) and member.due_amt + rent_amt <= 500 and book.available_count > 0:
            already_issue = RentInfo.query.filter_by(memberId=member.memberId, bookId=book.bookId,
                                                     check_in_trn_id=None).first()
            if not already_issue:
                transaction = Transaction(member_id=member.memberId, book_id=book.bookId, time=datetime.datetime.now(),
                                          type="ISSUE")
                db.session.add(transaction)
                db.session.flush()
                rent_info = RentInfo(check_out_trn_id=transaction.transactionId, memberId=member.memberId,
                                     bookId=book.bookId, rent_amt=rent_amt)
                db.session.add(rent_info)
                book.available_count -= 1
                member.due_amt += rent_info.rent_amt
                member.total_amt += rent_info.rent_amt
                db.session.flush()
                if book.available_count < 0 or member.due_amt > 500:
                    db.session.rollback()
                    return "Book not available"
                db.session.commit()
                return "True"
            else:
                return "Book Already Issued to this Member"
        return "Incorrect Book or Member Id"
    except Exception as err:
        db.session.rollback()
        logging.error("Error while issuing book: %s", err)
        return "False"


@controller_bp.route("/return-book", methods=['POST'])
def return_book():
    member = Member.query.get(request.json['memberId'])
    book = Book.query.get(request.json['bookId'])

    try:
        if (member is not None) and (book is not None):
            rent_info = RentInfo.query.filter_by(memberId=member.memberId, bookId=book.bookId,
                                                 check_in_trn_id=None).first()
            if rent_info:
                transaction = Transaction(member_id=member.memberId, book_id=book.bookId, time=datetime.datetime.now(),
                                          type="RETURN")
                db.session.add(transaction)
                db.session.flush()
                rent_info.check_in_trn_id = transaction.transactionId
                member.due_amt -= rent_info.rent_amt
                book.available_count += 1
                db.session.flush()
                db.session.commit()
                return "True"
            else:
                return "Issue record not found!"
        else:
            return "Wrong Member or Book Id!"
    except Exception as err:
        db.session.rollback()
        logging.error("Error while returning book: %s", err)
        return "Error in Returning Book!"
