from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/tasks')
def tasks():
    return render_template('tasks.html')

@app.route('/messenger')
def messenger():
    return render_template('messenger.html')

@app.route('/calendar')
def calendar():
    return render_template('calendar.html')

if __name__ == '__main__':
    app.run(debug=True)
