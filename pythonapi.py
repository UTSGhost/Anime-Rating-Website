import json
import os
import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
from jikanpy import Jikan, JikanException

# --- SICHERHEIT 1: Pfad relativ zur Script-Datei ---
# Das garantiert, dass rating.json gefunden wird, egal von wo du das Script startest
script_dir = os.path.dirname(os.path.abspath(__file__))
existing_json_file = os.path.join(script_dir, 'rating.json')

print(f"Script Location: {script_dir}")
print(f"JSON Target: {existing_json_file}")

def get_anime_data(anime_id):
    jikan = Jikan()
    
    # --- SICHERHEIT 2: API Fehler abfangen ---
    try:
        anime_data = jikan.anime(anime_id)
    except Exception as e:
        messagebox.showerror("API Error", f"Konnte ID {anime_id} nicht laden.\nFehler: {e}")
        return None

    data = anime_data.get('data', {})
    
    # Daten holen mit Fallbacks
    img = data.get('images', {}).get('jpg', {}).get('image_url', 'Image Not Found')
    name = data.get('title', 'Title Not Found')
    alt_name = data.get('title_english') # Kann None sein
    mal_id = data.get('mal_id', anime_id)
    season = data.get('season')
    year = data.get('year')
    anime_type = data.get('type', 'Type Not Found')

    # Formatting
    if alt_name is None:
        alt_name = name
    
    season_str = 'Season Not Found'
    if season and year:
        season_str = f"{season.capitalize()} {year}"
    elif year:
        season_str = f"{year}"

    print(f"Fetched: {name} ({season_str})")

    # Deine exakte JSON Struktur
    anime_dict = {
        "img": img,
        "name": name,
        "alt_name": alt_name,
        "id": mal_id,
        "season": season_str,
        "type": anime_type,
        "rating": {
            "objective": {
                "characters": {
                    "protagonist": 0, "antagonist": 0, "side_characters": 0, "realistic": 0
                },
                "writing": {
                    "ending": 0, "logical": 0, "plot": 0
                },
                "music_sound": {
                    "ost_bgm": 0, "voiceacting": 0, "op_ed": 0, "soundeffects": 0
                },
                "animation_art": {
                    "fight_scenes_general_smooth_movement": 0, "character_design": 0, "world_building": 0
                }
            },
            "subjective": {
                "emotions": {
                    "comedic_sad_thrilling": 0, "vibe": 0, "climax": 0
                },
                "story": {
                    "satisfying_ending": 0, "no_unnecessary_scenes": 0, "enjoyable_content": 0
                },
                "characters": {
                    "likeable": 0, "waifus": 0, "relationships": 0
                },
                "memory": {
                    "aftertaste": 0, "addictive": 0, "nostalgia": 0
                }
            },
            "explain": "No review written yet"
        }
    }

    return anime_dict

def add_anime():
    user_input = entry_anime_id.get()
    if not user_input.isdigit():
        messagebox.showwarning("Input Error", "Bitte eine gültige Nummer eingeben.")
        return

    anime_id_to_add = int(user_input)
    
    # Deaktiviere Button während des Ladens (einfacher Freeze-Schutz)
    btn_add_anime.config(state="disabled", text="Loading...")
    window.update()

    new_anime_data = get_anime_data(anime_id_to_add)
    
    # Button wieder aktivieren
    btn_add_anime.config(state="normal", text="Add Anime")
    
    if new_anime_data is None:
        return # Abbruch bei Fehler

    # --- SICHERHEIT 3: UTF-8 Encoding ---
    # Lesen
    if os.path.exists(existing_json_file):
        with open(existing_json_file, 'r', encoding='utf-8') as file:
            existing_data = json.load(file)
    else:
        existing_data = {"animes": []}
    
    existing_anime_index = next((index for index, anime in enumerate(existing_data['animes']) if anime['id'] == new_anime_data['id']), None)
    
    if existing_anime_index is not None:
        # Check ob alt_name fehlt, dann Update
        current_entry = existing_data['animes'][existing_anime_index]
        if 'alt_name' not in current_entry or not current_entry['alt_name']:
            # Wir behalten die alten Ratings, updaten nur Metadaten!
            # (Optional: Wenn du das Rating komplett resetten willst, nimm die Zeile unten raus und nimm new_anime_data komplett)
            new_anime_data['rating'] = current_entry.get('rating', new_anime_data['rating'])
            
            existing_data['animes'][existing_anime_index] = new_anime_data
            feedback_message = f"Updated Metadata for ID {new_anime_data['id']} (Name/Image updated)."
        else:
            feedback_message = f"Anime ID {new_anime_data['id']} exists. No changes made."
    else:
        existing_data['animes'].append(new_anime_data)
        feedback_message = f"Added NEW Anime: {new_anime_data['name']}"
    
    # Sortieren
    existing_data['animes'] = sorted(existing_data['animes'], key=lambda x: x['id'])
    
    # Schreiben mit UTF-8
    with open(existing_json_file, 'w', encoding='utf-8') as file:
        json.dump(existing_data, file, indent=2, ensure_ascii=False) # ensure_ascii=False lässt Kanji lesbar im JSON
    
    print(feedback_message)
    messagebox.showinfo("Success", feedback_message)

# GUI Setup (unverändert, nur cleanup)
window = tk.Tk()
window.title("Anime Adder Tool")
window.configure(background='#353535')

font_style = ('Nunito', 12)

frame = tk.Frame(window, bg='#353535')
frame.pack(padx=20, pady=20)

label_anime_id = tk.Label(frame, text="Enter MAL ID:", font=font_style, fg='#D3D3D3', bg='#353535')
label_anime_id.grid(row=0, column=0, padx=5, pady=5, sticky='w')

entry_anime_id = tk.Entry(frame, font=font_style, bg='#353535', fg='#D3D3D3')
entry_anime_id.grid(row=0, column=1, padx=5, pady=5)
entry_anime_id.bind('<Return>', lambda event: add_anime()) # Enter Taste drückt Button

btn_add_anime = tk.Button(frame, text="Add Anime", command=add_anime, font=font_style, bg='#202020', fg='#D3D3D3', width=15)
btn_add_anime.grid(row=1, column=0, columnspan=2, padx=5, pady=15)

# Center Window
window.update_idletasks()
width = window.winfo_width()
height = window.winfo_height()
x = (window.winfo_screenwidth() // 2) - (width // 2)
y = (window.winfo_screenheight() // 2) - (height // 2)
window.geometry('{}x{}+{}+{}'.format(width, height, x, y))

window.mainloop()