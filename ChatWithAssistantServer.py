from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import requests
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv('../.env')

# Define constants
client_id = 'cc09b075-ca33-4b8f-952c-ca3c78dc2630'
client_secret = 'ccb917129b204285a55cf02e3214893b'

# Define URLs
url_token = 'https://id.trimble.com/oauth/token'
url_epic_to_userstories = "https://agw.construction-integration.trimble.cloud/trimbledeveloperprogram/assistants/v1/agents/epic-to-userstories/messages"

# Define headers
headers_token = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic IGNjMDliMDc1LWNhMzMtNGI4Zi05NTJjLWNhM2M3OGRjMjYzMDpjY2I5MTcxMjliMjA0Mjg1YTU1Y2YwMmUzMjE0ODkzYg=='
}
headers_epic_to_userstories = {
    'Content-Type': 'application/json'
}

# Define data
data_token = {
    'grant_type': 'client_credentials',
    'scope': 'trimble-assistant-hackathon'
}

def send_message(url, headers, request_body):
    response = requests.post(url, headers=headers, data=json.dumps(request_body))
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

@app.route('/sendmessage', methods=['POST'])
def send_message_api():
    request_body_epic = request.get_json()
    # Get token
    response_token = requests.post(url_token, headers=headers_token, data=data_token)
    token = response_token.json()['access_token']

    # Update headers for assistant with the token
    headers_epic_to_userstories['Authorization'] = 'Bearer ' + token

    # Send message for epic to user stories
    response_data_epic = send_message(url_epic_to_userstories, headers_epic_to_userstories, request_body_epic)
    return jsonify(response_data_epic)

if __name__ == "__main__":
    app.run(debug=True)