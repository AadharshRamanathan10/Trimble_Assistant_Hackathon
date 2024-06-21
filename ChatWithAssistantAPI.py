import os
import json
import requests
from dotenv import load_dotenv
from requests.auth import HTTPBasicAuth

# Load environment variables
load_dotenv('../.env')

# Define constants
client_id = 'cc09b075-ca33-4b8f-952c-ca3c78dc2630'
client_secret = 'ccb917129b204285a55cf02e3214893b'

# Define URLs
url_token = 'https://id.trimble.com/oauth/token'
url_epic_to_userstories = "https://agw.construction-integration.trimble.cloud/trimbledeveloperprogram/assistants/v1/agents/epic-story-diagram-provider/messages"

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

# Define request body for epic to user stories
request_body_epic = {
    "message": "Epic: Food Delivery App Epic Title: Food Delivery App Epic Description: The Food Delivery App epic focuses on providing users with the ability to browse restaurants, place orders, track deliveries, and manage their profiles. This includes searching for restaurants, viewing menus, adding items to the cart, and checking out. It aims to offer a seamless and efficient food ordering experience. Acceptance Criteria: Users can browse a list of available restaurants. Users can view restaurant menus and item details. Users can add items to their cart and place orders. Users can track the status of their orders in real-time. Users can manage their profile information and order history. Stakeholders: Customers (End Users) Restaurant Partners Delivery Personnel Product Manager Developers (Frontend and Backend) QA Testers System Administrators Project Components: Frontend: UI Design Restaurant Browsing Page Menu Viewing Page Cart Management Component Order Tracking Dashboard Profile Management Page Backend: API Design for Restaurant and Order Management Restaurant and Menu Data Models Order Processing and Tracking User Authentication and Authorization Payment Gateway Integration Database Integration for Restaurant and Order Information Database: Restaurant Information Table Menu Items Table Order Information Table User Profile Data Storage Testing: Unit Testing for App Components Integration Testing for Order Management User Acceptance Testing for Food Ordering Functionality Security Testing Priority: High Priority: This epic is crucial for enhancing the user experience and ensuring efficient food delivery service, making it a high-priority item in the project backlog. User Story 1: Browse Restaurants Title: Browse Restaurants Description: As a user, I want to browse a list of available restaurants so that I can choose where to order food from. Acceptance Criteria: Users can access the restaurant browsing page. Users can see a list of restaurants with basic details like name, rating, and cuisine type. Users can filter and sort restaurants based on various criteria (e.g., distance, rating, cuisine). Dependencies: None Priority: High Estimation: 3 story points User Story 2: View Restaurant Menu Title: View Restaurant Menu Description: As a user, I want to view the menu of a restaurant so that I can decide what to order. Acceptance Criteria: Users can access the menu page of a selected restaurant. Menu page displays details of each item, including name, description, price, and image. Users can filter and sort menu items by categories (e.g., appetizers, main course, desserts). Dependencies: Browse Restaurants Priority: High Estimation: 4 story points User Story 3: Add Items to Cart Title: Add Items to Cart Description: As a user, I want to add items to my cart so that I can place an order. Acceptance Criteria: Users can add menu items to their cart from the restaurant menu page. Users can view and edit the cart contents, including item quantity and special instructions. The total price is updated as items are added or removed from the cart. Dependencies: View Restaurant Menu Priority: High Estimation: 3 story points User Story 4: Place Order Title: Place Order Description: As a user, I want to place an order so that I can get the food delivered to my location. Acceptance Criteria: Users can proceed to checkout from the cart page. Users can enter delivery details and payment information. The order is processed, and users receive a confirmation with estimated delivery time. Dependencies: None Priority: High Estimation: 5 story points User Story 5: Track Order Status Title: Track Order Status Description: As a user, I want to track the status of my order in real-time so that I know when to expect my food. Acceptance Criteria: Users can access an order tracking page after placing an order. The tracking page shows the current status of the order (e.g., order confirmed, food being prepared, out for delivery). Users receive notifications for status updates (e.g., when the order is out for delivery). Dependencies: Place Order Priority: High Estimation: 5 story points User Story 6: Manage Profile Information Title: Manage Profile Information Description: As a user, I wantTrimble Assistant to manage my profile information so that I can keep my account details up-to-date. Acceptance Criteria: Users can access their profile management page. Users can edit personal information such as name, email, phone number, and address. Changes to profile information are saved and reflected in the user’s account. Dependencies: None Priority: Medium Estimation: 3 story points User Story 7: View Order History Title: View Order History Description: As a user, I want to view my past orders so that I can reorder items or check previous order details. Acceptance Criteria: Users can access their order history page. The order history page displays a list of past orders with details such as date, items ordered, and total cost. Users can reorder items from past orders. Dependencies: Place Order Priority: Medium Estimation: 3 story points User Story 8: Set Delivery Preferences Title: Set Delivery Preferences Description: As a user, I want to set my delivery preferences so that I can receive my orders in a way that suits me. Acceptance Criteria: Users can access delivery preferences from their profile management page. Users can set preferences such as delivery time windows, contactless delivery, and preferred delivery instructions. Preferences are saved and applied to future orders. Dependencies: Manage Profile Information Priority: Medium Estimation: 4 story points User Story 9: Provide Feedback on Orders Title: Provide Feedback on Orders Description: As a user, I want to provide feedback on my orders so that I can share my experience with the service. Acceptance Criteria: Users can access a feedback form from their order history page.",
    "stream": False,
    "model_id": "gpt-4"
}

# Function to send message
def send_message(url, headers, request_body):
    response = requests.post(url, headers=headers, data=json.dumps(request_body))
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error {response.status_code}: {response.text}")

# Main function
def main():
    # Get token
    response_token = requests.post(url_token, headers=headers_token, data=data_token)
    token = response_token.json()['access_token']

    # Update headers for assistant with the token
    headers_epic_to_userstories['Authorization'] = 'Bearer ' + token

    # Send message for epic to user stories
    response_data_epic = send_message(url_epic_to_userstories, headers_epic_to_userstories, request_body_epic)
    with open('response.json', 'w') as json_file:
        json.dump(response_data_epic, json_file, indent=4)
    print("The response has been saved to 'response.json'")

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(e)