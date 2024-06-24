import json
import re

def parse_input(input_text):
    features = re.split(r'### Feature:', input_text)
    result = {"epics": [], "user_stories": []}

    for feature in features[1:]:
        feature_lines = feature.strip().split('\n')
        feature_name = feature_lines[0].strip()

        epics = re.split(r'\*\*Epics:|\*\*Epic:|#### Epic:|#### Epics:|#### Epic', feature)
        for epic in epics[1:]:
            epic_title_match = re.search(r'(.+?)(?=\*\*)', epic)
            epic_title = epic_title_match.group(1).strip() if epic_title_match else ""
            epic_description = re.search(r'\*\*Description:\*\* (.+)|\*\*Epic Description:\*\* (.+)', epic)
            # epic_description = re.search(r'\*\*Description:\*\* (.+)', epic)
            epic_description = epic_description.group(1) if epic_description else ""

            acceptance_criteria = re.search(r'\*\*Acceptance Criteria:\*\*\n\s*-\s*(.*?)(?=\s*\*\*)', epic, re.DOTALL)
            acceptance_criteria = acceptance_criteria.group(1).strip().replace('\n- ', '\n') if acceptance_criteria else ""

            dependencies = re.search(r'\*\*Dependencies:\*\* (.+)', epic)
            dependencies = dependencies.group(1) if dependencies else ""

            priority = re.search(r'\*\*Priority:\*\* (.+)', epic)
            priority = priority.group(1) if priority else ""

            estimation = re.search(r'\*\*Estimation:\*\* (.+)', epic)
            estimation = estimation.group(1) if estimation else ""

            architectural_implications = re.search(r'\*\*Architectural Implications:\*\* (.+)', epic)
            architectural_implications = architectural_implications.group(1) if architectural_implications else ""

            impacted_features = feature_name

            user_stories = re.split(r'\*\*User Story:', epic)
            for user_story in user_stories[1:]:
                user_story_title_match = re.search(r'(.+?)(?=\*\*)', user_story)
                user_story_title = user_story_title_match.group(1).strip() if user_story_title_match else ""

                user_story_description = re.search(r'\*\*Description:\*\* (.+)', user_story)
                user_story_description = user_story_description.group(1) if user_story_description else ""

                user_story_acceptance_criteria = re.search(r'\*\*Acceptance Criteria:\*\*\n\s*-\s*(.*?)(?=\s*\*\*)', user_story, re.DOTALL)
                user_story_acceptance_criteria = user_story_acceptance_criteria.group(1).strip().replace('\n- ', '\n') if user_story_acceptance_criteria else ""

                user_story_dependencies = re.search(r'\*\*Dependencies:\*\* (.+)', user_story)
                user_story_dependencies = user_story_dependencies.group(1) if user_story_dependencies else ""

                user_story_priority = re.search(r'\*\*Priority:\*\* (.+)', user_story)
                user_story_priority = user_story_priority.group(1) if user_story_priority else ""

                user_story_estimation = re.search(r'\*\*Estimation:\*\* (.+)', user_story)
                user_story_estimation = user_story_estimation.group(1) if user_story_estimation else ""

                user_story_diagram_type_match = re.search(r'\*\*Diagram Type:\*\* (.+)', user_story)
                user_story_diagram_type = user_story_diagram_type_match.group(1) if user_story_diagram_type_match else ""

                diagram_search = re.search(r'\*\*(UI Flow Diagram|Sequence Diagram|Architecture Diagram|Deployment Diagram):\*\*\n```\n(.+?)\n```', user_story, re.DOTALL)
                user_story_diagram_code = diagram_search.group(2).strip() if diagram_search else ""

                user_story_data = {
                    "title": user_story_title,
                    "description": user_story_description,
                    "workflow": user_story_diagram_code,
                    "acceptance_criteria": user_story_acceptance_criteria,
                    "dependencies": user_story_dependencies,
                    "priority": user_story_priority,
                    "Impacted_Features": impacted_features,
                    "estimation": user_story_estimation
                }

                result["user_stories"].append(user_story_data)

            epic_data = {
                "title": epic_title,
                "description": epic_description,
                "workflow": "",  # Epics do not have a direct diagram, it's associated with user stories
                "acceptance_criteria": acceptance_criteria,
                "dependencies": dependencies,
                "priority": priority,
                "Impacted_Features": impacted_features,
                "estimation": estimation,
                "Architectural Implications": architectural_implications
            }

            result["epics"].append(epic_data)

    return result

# Function to read input from a text file
def read_input_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Main function
def main(input_file_path, output_file_path):
    # Read input from the text file
    input_text = read_input_file(input_file_path)

    # Parse the input text and get the JSON output
    parsed_result = parse_input(input_text)
    json_output = json.dumps(parsed_result, indent=4)

    # Write the JSON output to a file
    with open(output_file_path, 'w') as file:
        file.write(json_output)

    print(f"JSON output has been written to {output_file_path}")
    return json_output

# Specify the input and output file paths
input_file_path = r'C:\Users\aramana\Documents\Trimble_Assistant_Hackathon\response.txt'  # Replace this with your input file path
output_file_path = 'output.json'  # Replace this with your desired output file path

# Run the main function
if __name__ == "__main__":
    main(input_file_path, output_file_path)
