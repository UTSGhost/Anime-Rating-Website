import json
import time
from jikanpy import Jikan

# Function to get anime data and construct a dictionary
def get_anime_data(anime_id):
    jikan = Jikan()
    anime_data = jikan.anime(anime_id)

    time.sleep(0.6)

    img = anime_data['data']['images']['jpg'].get('image_url', 'Image Not Found')
    name = anime_data['data'].get('title', 'Title Not Found')
    alt_name = anime_data['data'].get('title_english', 'Alt Name Not Found')
    anime_id = anime_data['data'].get('mal_id', 'ID Not Found')
    season = anime_data['data'].get('season', 'Season Not Found')
    year = anime_data['data'].get('year', 'Year Not Found')
    anime_type = anime_data['data'].get('type', 'Type Not Found')
    alt_name = name if alt_name is None else alt_name
    season = season.capitalize() if season is not None else 'Season Not Found'


    try:
        print(alt_name)
    except UnicodeEncodeError:
        print(f"Error: Unable to display alt_name due to Unicode characters.")

    # Create a dictionary
    anime_dict = {
        "img": img,
        "name": name,
        "alt_name": alt_name,
        "id": anime_id,
        "season": f"{season} {year}",
        "type": anime_type,
        "rating": {
            "objective": {
                "characters": {
                    "protagonist": 0,
                    "antagonist": 0,
                    "side_characters": 0,
                    "realistic": 0
                },
                "writing": {
                    "ending": 0,
                    "logical": 0,
                    "plot": 0
                },
                "music_sound": {
                    "ost_bgm": 0,
                    "voiceacting": 0,
                    "op_ed": 0,
                    "soundeffects": 0
                },
                "animation_art": {
                    "fight_scenes_general_smooth_movement": 0,
                    "character_design": 0,
                    "world_building": 0
                }
            },
            "subjective": {
                "emotions": {
                    "comedic_sad_thrilling": 0,
                    "vibe": 0,
                    "climax": 0
                },
                "story": {
                    "satisfying_ending": 0,
                    "no_unnecessary_scenes": 0,
                    "enjoyable_content": 0
                },
                "characters": {
                    "likeable": 0,
                    "waifus": 0,
                    "relationships": 0
                },
                "memory": {
                    "aftertaste": 0,
                    "addictive": 0,
                    "nostalgia": 0
                }
            },
            "explain": "No review written yet"
        }
    }

    return anime_dict

# Specify the existing JSON file (assuming it's in the same folder as the script)
existing_json_file = 'rating.json'

# Specify the anime ID you want to add
anime_id_to_add = 53887

# Get anime data
new_anime_data = get_anime_data(anime_id_to_add) ###################################################


# Read existing JSON data
with open(existing_json_file, 'r') as file:
    existing_data = json.load(file)

replaced_animes_count = 0
max_animes_to_replace = 5


existing_anime_index = next((index for index, anime in enumerate(existing_data['animes']) if anime['id'] == new_anime_data['id']), None)

# Check if an anime with the same ID exists
if existing_anime_index is not None:
    # Check if alt_name is missing or empty
    if 'alt_name' not in existing_data['animes'][existing_anime_index] or existing_data['animes'][existing_anime_index]['alt_name'] == "":
        existing_data['animes'][existing_anime_index] = new_anime_data
        feedback_message = f"Replaced anime with ID {new_anime_data['id']} as it was missing or had an empty alt_name."
    else:
        feedback_message = f"Anime with ID {new_anime_data['id']} already exists. No action taken."
else:
    # If an anime with the same ID does not exist, proceed to add it
    existing_data['animes'].append(new_anime_data)
    feedback_message = f"Added new anime with ID {new_anime_data['id']}"





# Loop through existing animes and replace those without an image using their IDs
for index, anime in enumerate(existing_data['animes']):
    if 'img' not in anime or not anime['img']:
        anime_data_without_img = get_anime_data(anime['id'])

        # Replace the entire entry
        existing_data['animes'][index] = anime_data_without_img
        replaced_animes_count += 1

        # Check if the maximum number of replacements is reached
        if replaced_animes_count >= max_animes_to_replace:
            break

# Sort the "animes" array based on the 'id' attribute
existing_data['animes'] = sorted(existing_data['animes'], key=lambda x: x['id'])

# Write the updated data back to the JSON file
with open(existing_json_file, 'w') as file:
    json.dump(existing_data, file, indent=2)

# Provide feedback
print(feedback_message)

