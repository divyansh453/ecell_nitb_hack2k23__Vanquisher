
# import json
# from math import sqrt

# dataFrame = json.load(open('data.json'))


# def sim_distance(reqirements_json, prefs, person1, person2):
#     si = {}
#     for item in reqirements_json[person1]:
#         if item in prefs[person2]:
#             si[item] = 1
#     if len(si) == 0: return 0

#     sum_of_squares = sum(
#         [pow(reqirements_json[person1][item] - prefs[person2][item], 2) for item in reqirements_json[person1] if
#          item in prefs[person2]])
#     return 1 / (1 + sum_of_squares)


# def topMatches(reqirements_json, prefs, person, n, similarity=sim_distance):
#     scores = [(similarity(reqirements_json, prefs, person, other), other) for other in prefs if other != person]
#     scores.sort()
#     scores.reverse()
#     print(scores)

#     return scores[0:n]
