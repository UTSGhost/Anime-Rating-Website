/* 
  Author: UTSGhost
*/

var meanscore = 0
var meanscorediv = 0


$.getJSON('rating.json', function(data) {
  add();
  
  function renamestuff() {
    let arr = data.animes;
    for (var i = 0; i < arr.length; i++) {
        const a = arr[i].rating.objective
        const b = arr[i].rating.subjective

        a.characters.realistic = b.characters.realistic
        delete b.characters.realistic

        b.characters.waifus = a.characters.waifus
        delete a.characters.waifus

        b.characters.relationships = b.characters.balance_anta_protag
        delete b.characters.balance_anta_protag

        a.writing.plot = a.writing.general_writing_style
        delete a.writing.general_writing_style

        b.emotions.vibe = b.emotions.multiple_no_focused
        b.emotions.climax = b.emotions.special_moments_episodes

        delete b.emotions.multiple_no_focused
        delete b.emotions.special_moments_episodes

        b.e = b.emotions
        
        b.s = b.content 
        delete b.content

        b.c = b.characters
        b.m = b.memory
        delete b.emotions
        delete b.characters
        delete b.memory



        b.emotions = b.e
        
        b.story = b. s
        delete b.s

        b.characters = b.c
        b.memory = b.m
        delete b.e
        delete b.c
        delete b.m


    }
    
    console.log("renamenewstuff: ", data);
  }
  


    //renamestuff()




    function newsort() {
        let arr = data.animes
        let newanime = {
            "img": "https://cdn.myanimelist.net/images/anime/1240/133638.jpg",
            "name": "Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken",
            "alt_name": "The Angel Next Door Spoils Me Rotten",
            "id": 50739,
            "season": "Winter 2023",
            "type": "TV",
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
                }
              }
        };
        for(let i=0;i<arr.length;i++){
            if(newanime.id<arr[i].id){
                arr.splice(i, 0, newanime);
                i = arr.length;
            }
        }
        if (arr[arr.length-1].id<newanime.id){
            arr.push(newanime)
        }
        console.log("sort", data)
    };


    newsort()




  function add() {
      for (i=1; i<=data.animes.length; i++) {
          addAnother(i,false);
          addAnothercounter(i);
      }
  }
  

  function addAnothercounter(counter) { 
    let currentDiv = document.getElementById("counterbody")
    let newRow = currentDiv.insertRow();
    newRow.innerHTML = `<td>${counter}</td>`;
  }

  $('#mainTable tbody tr .mal_rating').each(function() {
    let scores = $(this).html()
    meanscore += parseFloat(scores)
    meanscorediv++
    if (scores == 0){
        meanscorediv--
    }
    let meanscoredivision = meanscore / meanscorediv
    let meanscoreround = (Math.round((meanscoredivision + Number.EPSILON) * 100) / 100)
    document.getElementById("meanscoreplace").innerHTML = `<p>Mean Score: ${meanscoreround}</p>`
  });

  function addAnother(counter) { 
    let currentDiv = document.getElementById("foo")
    let newRow = currentDiv.insertRow();
    newRow.id = "number"+counter
    newRow.className = "mainrow"
    newRow.innerHTML = makeTable(counter + 1);
  }
  
  function makeTable(counter) {

    let dataarr = data.animes[counter - 2];
    let name = dataarr.name;
    let altname = dataarr.alt_name;
    let mal = `https://myanimelist.net/anime/${dataarr.id}`
    let id = dataarr.id
    let img = dataarr.img;
    let type = dataarr.type;
    let season = dataarr.season;

    let rating = dataarr.rating
    

    let objective = rating.objective
    

    let obj_character = objective.characters
    let obj_protag = obj_character.protagonist
    let obj_antag = obj_character.antagonist
    let obj_side = obj_character.side_characters
    let obj_real = obj_character.realistic
    let obj_character_rating = obj_protag + obj_antag + obj_side + obj_real

    let obj_writing = objective.writing
    let obj_plot = obj_writing.plot 
    let obj_logical = obj_writing.logical 
    let obj_ending = obj_writing.ending
    let obj_writing_rating = obj_plot + obj_logical + obj_ending

    let obj_sound = objective.music_sound
    let obj_op = obj_sound.op_ed 
    let obj_sfx = obj_sound.soundeffects 
    let obj_ost = obj_sound.ost_bgm
    let obj_va = obj_sound.voiceacting
    let obj_sound_rating = obj_op + obj_sfx + obj_ost + obj_va

    let obj_art = objective.animation_art
    let obj_animation = obj_art.fight_scenes_general_smooth_movement
    let obj_design = obj_art.character_design
    let obj_world = obj_art.world_building 
    let obj_art_rating = obj_animation + obj_design + obj_world

    let subjective = rating.subjective

    let subj_emotions = subjective.emotions
    let subj_comedic = subj_emotions.comedic_sad_thrilling
    let subj_vibe = subj_emotions.vibe
    let subj_climax = subj_emotions.climax
    let subj_emotions_rating = subj_comedic + subj_vibe + subj_climax 

    let subj_story = subjective.story
    let subj_ending = subj_story.satisfying_ending
    let subj_nobadscenes = subj_story.no_unnecessary_scenes
    let subj_enjoyable = subj_story.enjoyable_content
    let subj_story_rating = subj_ending + subj_nobadscenes + subj_enjoyable

    let subj_characters = subjective.characters
    let subj_like = subj_characters.likeable
    let subj_waifu = subj_characters.waifus
    let subj_relation = subj_characters.relationships
    let subj_characters_rating = subj_like + subj_waifu + subj_relation

    let subj_memory = subjective.memory
    let subj_addictive = subj_memory.addictive
    let subj_nostalgia = subj_memory.nostalgia
    let subj_aftertaste = subj_memory.aftertaste
    let subj_memory_rating = subj_addictive + subj_nostalgia + subj_aftertaste

    let subjectiver = subj_emotions_rating + subj_story_rating + subj_memory_rating + subj_characters_rating
    let objectiver = obj_character_rating + obj_writing_rating + obj_sound_rating + obj_art_rating
    let fullrate = objectiver + subjectiver
    let malrate = Math.round((fullrate + Number.EPSILON) * 100) / 1000

    return `<td colspan="7"><table class="celltable"><tbody><tr><td class="img"><img src="${img}" alt=""></td><td class="number"><a href="${mal}" target="_blank">${id}</a></td><td class="title">${name}</td><td class="alttitle">${altname}</td><td class="season">${season}</td><td class="type">${type}</td><td class="mal_rating">${malrate}</td></tr><tr class="ratingrow"><td colspan="7"><table class="green"><thead><tr><th class="content_score">Objective ${objectiver}/50</th><th class="feeling_score">Subjective ${subjectiver}/50</th></tr></thead><tbody><tr><td><table class="red"><thead><tr><td class="characters_score">Characters ${obj_character_rating}/15</td><td class="writing_score">Writing ${obj_writing_rating}/15</td><td class="sound_score">Sound/Music ${obj_sound_rating}/10</td><td class="art_score">Art ${obj_art_rating}/10</td></tr></thead><tbody><tr><td><table class="blue"><thead><tr><td>Protagonist</td><td>Antagonist</td><td>Side Characters</td><td>Realistic</td></tr></thead><tbody><tr><td class="protagonist_score">${obj_protag}</td><td class="antagonist_score">${obj_antag}</td><td class="side_characters_score">${obj_side}</td><td class="waifus_score">${obj_real}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td>Plot</td><td>Logical</td><td>Ending</td></tr></thead><tbody><tr><td class="writing_style_score">${obj_plot}</td><td class="logical_score">${obj_logical}</td><td class="ending_score">${obj_ending}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td>OP/ED</td><td>SFX</td><td>OST</td><td>VA</td></tr></thead><tbody><tr><td class="op_score">${obj_op}</td><td class="sfx_score">${obj_sfx}</td><td class="ost_score">${obj_ost}</td><td class="va_score">${obj_va}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td>Animation</td><td>Character Design</td><td>World-Building</td></tr></thead><tbody><tr><td class="animation_score">${obj_animation}</td><td class="character_design_score">${obj_design}</td><td class="world_building_score">${obj_world}</td></tr></tbody></table></td></tr></tbody></table></td><td><table class="red"><thead><tr><td class="emotions_score">Emotions ${subj_emotions_rating}/15</td><td class="content_f_score">Story ${subj_story_rating}/15</td><td class="characters_f_score">Characters ${subj_characters_rating}/10</td><td class="memory_score">Memory ${subj_memory_rating}/10</td></tr></thead><tbody><tr><td><table class="blue"><thead><tr><td>Strong Emotions</td><td>Vibe</td><td>Climax</td></tr></thead><tbody><tr><td class="strong_emotions_score">${subj_comedic}</td><td class="multiple_emotions_score">${subj_vibe}</td><td class="special_moments_score">${subj_climax}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td>Satisfying Ending</td><td>Meaningful Scenes</td><td>Enjoyable Content</td></tr></thead><tbody><tr><td class="satisfying_ending_score">${subj_ending}</td><td class="no_bad_scenes_score">${subj_nobadscenes}</td><td class="enjoyable_content_score">${subj_enjoyable}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td>Likeable</td><td>Waifus</td><td>Relationships</td></tr></thead><tbody><tr><td class="likeable_score">${subj_like}</td><td class="realistic_score">${subj_waifu}</td><td class="balanced_score">${subj_relation}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td>Addictive</td><td>Nostalgia</td><td>Aftertaste</td></tr></thead><tbody><tr><td class="addictive_score">${subj_addictive}</td><td class="nostalgia_score">${subj_nostalgia}</td><td class="aftertaste_score">${subj_aftertaste}</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td>`;
  }

  /////////////////////////


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        //comparexml(this);
        }
    };
    xhttp.open("GET", "animelist.xml", true);
    xhttp.send();

    var animelist = []

    function comparexml(xml) {
        var xmlDoc = xml.responseXML;
        var animeListLength = xmlDoc.getElementsByTagName('anime').length;
        for (var i = 0; i < animeListLength; i++){
            var z = xmlDoc.getElementsByTagName('my_status')[i].childNodes[0].nodeValue;
            if (z == "Completed"){

                var title = xmlDoc.getElementsByTagName('series_title')[i].childNodes[0].nodeValue;
                var id = xmlDoc.getElementsByTagName('series_animedb_id')[i].childNodes[0].nodeValue;
                var idnumber = parseInt(id)
                var type = xmlDoc.getElementsByTagName('series_type')[i].childNodes[0].nodeValue;

                animelist.push({
                    "z":z,
                    "i":i,
                    "name":title,
                    "id":idnumber,
                    "type":type
                })
                animelist.sort((a, b) => (a.id > b.id) ? 1 : -1) 
            }
        }

        console.log(animelist)
        console.log(data.animes)

        for(var i = 0; i < animelist.length; i++){
            if(animelist[i].id !== data.animes[i].id){
                console.log("xml",i,animelist[i].id)
                console.log("json",i,data.animes[i].id)
            }
        }
    } 
});//////////////////////////////////getJson



//sort

function sort(ascending, category) {
  console.log("start sorting " + ascending + " " + category);
  const tbody = document.getElementById("foo");
  const rows = tbody.getElementsByClassName("mainrow");

  const sortFn = (a, b) => {
      const aVal = getSortValue(a, category);
      const bVal = getSortValue(b, category);

      if (!isNaN(aVal) && !isNaN(bVal)) {
          if (aVal < bVal) {
              return ascending ? -1 : 1;
          } else if (aVal > bVal) {
              return ascending ? 1 : -1;
          }
          return 0;
      }

      return ascending
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
  };

  const sortedRows = Array.from(rows).sort(sortFn);

  for (let i = 0; i < sortedRows.length; i++) {
      tbody.appendChild(sortedRows[i]);
  }
  console.log("done sorting");
}

function getSortValue(row, category) {
  const valueEl = category === "number"
      ? row.getElementsByClassName(category)[0].children[0]
      : row.getElementsByClassName(category)[0];

  let value = valueEl.innerHTML;

  if (value === "") {
      return ""; // Return empty string if value is empty
  }

  if (
      [
          "characters_score",
          "writing_score",
          "emotions_score",
          "content_f_score",
          "feeling_score",
          "content_score",
          "sound_score",
          "art_score",
          "characters_f_score",
          "memory_score",
      ].includes(category)
  ) {
      const arrofreplace = [
          "/15",
          "/50",
          "Characters ",
          "Feeling ",
          "/10",
          "Writing ",
          "Sound/Music ",
          "Art ",
          "Emotions ",
          "Content ",
          "Memory ",
      ];

      for (let i = 0; i < arrofreplace.length; i++) {
          if (value.includes(arrofreplace[i])) {
              value = value.replace(arrofreplace[i], "");
          }
      }
  }

  if (!isNaN(value)) {
      return parseFloat(value);
  }

  return value;
}



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showsort() {
    document.getElementById("myDropdown").classList.toggle("show");
    }
    
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    } 


function testt(){
    console.log("a")
}
