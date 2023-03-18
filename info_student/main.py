from flask import Flask, render_template, request
import recommender

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def hello_world():
    if request.method == 'POST':
        result = request.form
        requirement = {"REQUIREMENT": {
            "HTML": int(result['html']),
            "Python": int(result['python']),
            "Java": int(result['java']),
            "C": int(result['c']),
            "JavaScript": int(result['javascript'])}}
        num_of_candidate = int(result['candidate'])
        result = recommender.topMatches(requirement, recommender.dataFrame, "REQUIREMENT", num_of_candidate)
        print(result)
        return render_template("index.html", result=result)

    return render_template("index.html", result=[("name","Score")])