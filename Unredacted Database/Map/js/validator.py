import requests

validate_endpoint = 'http://geojsonlint.com/validate'


good_request = requests.post(validate_endpoint, data=good_geojson)
print good_request.json()