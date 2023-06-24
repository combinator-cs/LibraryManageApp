from flask import Blueprint

views_bp = Blueprint('views', __name__)


@views_bp.route("/", methods=['GET'])
def default():
    return "Hello world"
