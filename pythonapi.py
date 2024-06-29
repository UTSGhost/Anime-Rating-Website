import json
#import time
from jikanpy import Jikan
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
import os
print("Current Working Directory:", os.getcwd())

# Function to get anime data and construct a dictionary
def get_anime_data(anime_id):
    jikan = Jikan()
    anime_data = jikan.anime(anime_id)

   # time.sleep(0.6)

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


# Function to handle adding anime and updating JSON file
def add_anime():
    anime_id_to_add = int(entry_anime_id.get())
    new_anime_data = get_anime_data(anime_id_to_add)
    
    with open(existing_json_file, 'r') as file:
        existing_data = json.load(file)
    
   # replaced_animes_count = 0
    #max_animes_to_replace = 5
    
    existing_anime_index = next((index for index, anime in enumerate(existing_data['animes']) if anime['id'] == new_anime_data['id']), None)
    
    if existing_anime_index is not None:
        if 'alt_name' not in existing_data['animes'][existing_anime_index] or existing_data['animes'][existing_anime_index]['alt_name'] == "":
            existing_data['animes'][existing_anime_index] = new_anime_data
            feedback_message = f"Replaced anime with ID {new_anime_data['id']} as it was missing or had an empty alt_name."
        else:
            feedback_message = f"Anime with ID {new_anime_data['id']} already exists. No action taken."
    else:
        existing_data['animes'].append(new_anime_data)
        feedback_message = f"Added new anime with ID {new_anime_data['id']}"
    
  #  for index, anime in enumerate(existing_data['animes']):
   #     if 'img' not in anime or not anime['img']:
    #        anime_data_without_img = get_anime_data(anime['id'])
     #       existing_data['animes'][index] = anime_data_without_img
      #      replaced_animes_count += 1
       #     if replaced_animes_count >= max_animes_to_replace:
        #        break
    
    existing_data['animes'] = sorted(existing_data['animes'], key=lambda x: x['id'])
    
    with open(existing_json_file, 'w') as file:
        json.dump(existing_data, file, indent=2)
    
    feedback_text = f"Feedback: {feedback_message}"
    print(feedback_text)
    
    # Display the message box with custom design
    messagebox.showinfo("Feedback", feedback_message)

# Create the main window
window = tk.Tk()
window.title("Anime ID Input")
window.configure(background='#353535')  # Set background color for the entire window

# Define font settings
font_style = ('Nunito', 12)

# Create a frame to hold the elements
frame = tk.Frame(window, bg='#353535')
frame.pack(padx=20, pady=20)

# Create a label and entry for entering anime ID
label_anime_id = tk.Label(frame, text="Enter Anime ID:", font=font_style, fg='#D3D3D3', bg='#353535')
label_anime_id.grid(row=0, column=0, padx=5, pady=5, sticky='w')

entry_anime_id = tk.Entry(frame, font=font_style, bg='#353535', fg='#D3D3D3')
entry_anime_id.grid(row=0, column=1, padx=5, pady=5)

# Create a button to add the anime
btn_add_anime = tk.Button(frame, text="Add Anime", command=add_anime, font=font_style, bg='#202020', fg='#D3D3D3', justify='center', anchor='center', width=10)
btn_add_anime.grid(row=1, column=0, columnspan=2, padx=5, pady=10, sticky='ew')  # Center the button horizontally and span across both columns

# Center the button text both horizontally and vertically
btn_add_anime.grid_configure(ipadx=20, ipady=10, pady=5) # Increase padding to center text vertically

# Center the window on the screen
window_width = 300
window_height = 150
screen_width = window.winfo_screenwidth()
screen_height = window.winfo_screenheight()
x = (screen_width - window_width) // 2
y = (screen_height - window_height) // 2
window.geometry(f"{window_width}x{window_height}+{x}+{y}")

# Run the GUI
window.mainloop()



