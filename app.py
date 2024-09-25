from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from models import db, User, Task

app = Flask(__name__)
app.secret_key = 'swag'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/tasks/add', methods=['POST'])
def add_task():
    data = request.get_json()
    new_task = Task(
        title=data['name'],
        description=data['description'],
        status=data['status'],
        created_by=session.get('username')
    )
    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        'name': new_task.title,
        'description': new_task.description,
        'status': new_task.status
    })

@app.route('/login', methods=['POST'])
def login():

    username = request.form['username']
    password = request.form['password']

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        session['username'] = username
        return redirect(url_for('home'))
    else:
        return redirect(url_for('home'))

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()
    if user:
        return redirect(url_for('home'))    
    else:
        new_user = User(username=username)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        session['username'] = username
        return redirect(url_for('home'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

@app.route('/')
@app.route('/home')
def home():  
    return render_template('home.html', isLoggedIn='username' in session)

@app.route('/tasks')
def tasks():
    if 'username' not in session:
        return redirect(url_for('home'))
    
    tasks = Task.query.filter_by(created_by=session.get('username')).all()

    return render_template('tasks.html', tasks=tasks)

@app.route('/messenger')
def messenger():
    if 'username' not in session:
        return redirect(url_for('home'))
    return render_template('messenger.html')

@app.route('/calendar')
def calendar():
    if 'username' not in session:
        return redirect(url_for('home'))
    return render_template('calendar.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)