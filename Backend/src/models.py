from config import db, ma


class Book(db.Model):
    __tablename__ = "books"
    bookId = db.Column(db.Integer, primary_key=True)
    fetched_book_id = db.Column(db.Integer)
    title = db.Column(db.String(300))
    authors = db.Column(db.String(100))
    average_rating = db.Column(db.Float)
    isbn = db.Column(db.String(15))
    isbn13 = db.Column(db.String(20))
    language_code = db.Column(db.String(20))
    num_pages = db.Column(db.Integer)
    ratings_count = db.Column(db.Integer)
    text_reviews_count = db.Column(db.Integer)
    publication_date = db.Column(db.DateTime(timezone=True))
    publisher = db.Column(db.String(100))
    total_count = db.Column(db.Integer)
    available_count = db.Column(db.Integer)

    def __repr__(self):
        return f'<Book {self.title}>'

    def __str__(self) -> str:
        return super().__str__()


class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book


class Member(db.Model):
    __tablename__ = "members"
    memberId = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    mob_number = db.Column(db.String(10))
    email_id = db.Column(db.String(50))
    address = db.Column(db.String(100))
    total_amt = db.Column(db.Integer)
    due_amt = db.Column(db.Integer)

    def __repr__(self):
        return f'<Member {self.memberId}>'


class MemberSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Member


class Transaction(db.Model):
    __tablename__ = "transactions"
    transactionId = db.Column(db.Integer, primary_key=True)
    member_id = db.Column(db.Integer)
    book_id = db.Column(db.Integer)
    time = db.Column(db.DateTime(timezone=True))
    type = db.Column(db.String(20))

    def __repr__(self):
        return f'<Transaction {self.transactionId}>'


class RentInfo(db.Model):
    __tablename__ = "rent_info"
    rentId = db.Column(db.Integer, primary_key=True)
    memberId = db.Column(db.Integer)
    bookId = db.Column(db.Integer)
    check_out_trn_id = db.Column(db.Integer)
    check_in_trn_id = db.Column(db.Integer)
    rent_amt = db.Column(db.Integer)

    def __repr__(self):
        return f'<RentInfo {self.rentId}>'
