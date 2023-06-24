from config import app
from controller import controller_bp
from models import db, Book
from views import views_bp

app.register_blueprint(views_bp)
app.register_blueprint(controller_bp)


@app.route("/create", methods=['POST'])
def create_db():
    # db.drop_all()
    db.create_all()
    return "done"


if __name__ == '__main__':
    app.run(debug=True)
