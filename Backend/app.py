from flask import request, jsonify
from config import app, db
from models import Learner, Mentor, Project
from flask_jwt_extended import get_jwt, get_jwt_identity, jwt_required, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/signup', methods=["POST"])
def signup():

    if not request.is_json:
        return jsonify(message="Request must be JSON"), 400
    
    check_registration = request.json.get("role")



    name = request.json.get('name')
    # email = request.json.get('email')
    tel = request.json.get('tel')
    image = request.json.get('image')
    password = request.json.get('password')

    if check_registration == "learner":
        check_name = db.session.execute(db.select(Learner).where(Learner.name==name)).scalar()

        if check_name:
            return jsonify(message="name already exists")
        
        learner = Learner(
            name = name,
            tel = tel,
            image = image,
            password = generate_password_hash(
                password,
                method="pbkdf2:sha256",
                salt_length= 8
            )
        )
        db.session.add(learner)
        db.session.commit()
        access_token = create_access_token(
            identity=name,
            additional_claims={"role":"learner"}
        )

        return jsonify(access_token=access_token), 200
    else:
        check_name = db.session.execute(db.select(Mentor).where(Mentor.name==name)).scalar()
        if check_name:
            return jsonify(message="name already exists")
        
        mentor = Mentor(
            name = name,
            tel = tel,
            email = request.json.get("email"),
            image = image,
            link = request.json.get("link"),
            password = generate_password_hash(
                password,
                method="pbkdf2:sha256",
                salt_length= 8
            )
        )
        db.session.add(mentor)
        db.session.commit()
        access_token = create_access_token(
            identity=name,
            additional_claims={"role":"mentor"}
        )

        return jsonify({"access_token":access_token}), 200
    
@app.route('/login', methods=["POST"])
def login():

    check_role = request.json.get("role")

    name = request.json.get("name")
    password = request.json.get("password")

    if check_role == "learner":
        check_name = db.session.execute(db.select(Learner).where(Learner.name==name)).scalar()

        if not check_name:
            return jsonify({"message": "User does not exit"}), 401

        if check_name and not check_password_hash(check_name.password, password):
            return jsonify({"message": "Incorrect password"}), 401
        
        if check_name and check_password_hash(check_name.password, password):
            access_token = create_access_token(
                identity=name,
                additional_claims={"role":"mentor", "id":check_name.id}
                )
            return jsonify(access_token=access_token), 200
    else:
        check_name = db.session.execute(db.select(Mentor)).where(Mentor.name==name).scalar()

        if not check_name:
            return jsonify({"message": "User does not exit"}), 401

        if check_name and not check_password_hash(check_name.password, password):
            return jsonify({"message": "Incorrect password"}), 401
        
        if check_name and check_password_hash(check_name.password, password):
            access_token = create_access_token(
                identity=name,
                additional_claims={"role":"mentor", "id":check_name.id}
                )
            return jsonify(access_token=access_token), 200

@app.route('/get-profile/<int:id>', methods=["GET"])
@jwt_required()
def view_profile(id):

    user_identity = get_jwt_identity()

    if user_identity.get("role") == "learner":
        if user_identity.get("id") != id:
            return jsonify (message="unauthorized"), 403
        
        learner = db.get_or_404(Learner, id)
        if learner:
            return jsonify({
                "message": "Learner profile retrieved successfully",
                "profile": learner.to_json()
            })
        return jsonify (message="Learner not found"), 404

    elif user_identity.get("role") == 'mentor':
        learner = Learner.query.get(id)
        if learner:
            return jsonify({
                "message": "Learner profile retrieved by mentor",
                "profile": learner.to_json()
            }), 200
        
        # If not a learner, check if mentor is viewing another mentor
        mentor = db.get_or_404(Mentor, id)
        if mentor:
            if id == user_identity.get("id"):
                return jsonify({
                    "message": "Mentor viewing own profile",
                    "profile": mentor.to_json()
                }), 200
            return jsonify({"message": "Mentors can only view learner profiles or their own profile"}), 403
        
        return jsonify({"message": "User not found"}), 404
    
    return jsonify({"message": "Invalid role"}), 400

@app.route('/projects', methods=['POST'])
@jwt_required()
def create_project():

    user_identity = get_jwt()

    mentor = db.get_or_404(Mentor, user_identity.get("id"))

    if not mentor:
        return jsonify(message="Mentor not found"), 404
    
    try:
        project = Project(
            title=request.json.get('title'),
            description=request.json.get('description'),
            mentor_id=user_identity.get("id")
        )
        db.session.add(project)
        db.session.commit()
        
        return jsonify({
            "message": "Project created successfully",
            "project": project.to_json()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to create project", "error": str(e)}), 500 





if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5002)