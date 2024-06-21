from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import requests
from dotenv import load_dotenv

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
url_story_diagram_provider = "https://agw.construction-integration.trimble.cloud/trimbledeveloperprogram/assistants/v1/agents/epic-story-diagram-provider/messages"

# Define headers
headers_token = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic IGNjMDliMDc1LWNhMzMtNGI4Zi05NTJjLWNhM2M3OGRjMjYzMDpjY2I5MTcxMjliMjA0Mjg1YTU1Y2YwMmUzMjE0ODkzYg=='
}
headers_epic_to_userstories = {
    'Content-Type': 'application/json'
}
headers_story_diagram_provider = {
    'Content-Type': 'application/json'
}

# Define data
data_token = {
    'grant_type': 'client_credentials',
    'scope': 'trimble-assistant-hackathon'
}

def send_message(url, headers, request_body):
    response = requests.post(url, headers=headers, data=json.dumps(request_body))
    response.raise_for_status()
    message = response.json().get('message')  # Get 'message' from the response text
    return message  # Return 'message' instead of the whole response
# .json()

@app.route('/sendmessage', methods=['POST'])
def send_message_api():
    print("Received a request to send a message.")
    request_body_epic = request.get_json()
    request_body_diagram = request_body_epic
    print("Request body parsed.")

    try:
        # Get token
        print("Getting token...")
        response_token = requests.post(url_token, headers=headers_token, data=data_token)
        response_token.raise_for_status()
        token = response_token.json().get('access_token')
        if not token:
            raise Exception("No access token found in token response.")
        print("Token received.")

        # Update headers for assistant with the token
        headers_epic_to_userstories['Authorization'] = 'Bearer ' + token
        headers_story_diagram_provider['Authorization'] = 'Bearer ' + token
        print("Headers updated with the token.")

        # Send message for epic to user stories
        print("Sending message for epic to user stories...")
        response_data_epic = send_message(url_epic_to_userstories, headers_epic_to_userstories, request_body_epic)
        print("Received response from epic to user stories agent.")
        print("Response from epic: ", response_data_epic)

        # Use the response from the first agent to send a message to the second agent
        request_body_diagram['message'] = response_data_epic
        print("Sending message to epic story diagram provider...")
        response_data_diagram = send_message(url_story_diagram_provider, headers_story_diagram_provider, request_body_diagram)
        print("Received response from epic story diagram provider agent.")
        print("Response for diagram: ", response_data_diagram)

        return jsonify(response_data_diagram)
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

