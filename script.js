/* 
  Author: UTSGhost
*/

var meanscore = 0
var meanscorediv = 0
var waiting = true

$.getJSON('rating.json', function(data) {
  add();
  
  function renamestuff() {
    let arr = data.animes;
    for (var i = 0; i < arr.length; i++) {
        const a = arr[i].rating.objective
        const b = arr[i].rating.subjective

        arr[i].rating.explain = "";


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
      } console.log("done")
      waiting = false;
  }

  $('#mainTable tbody tr .mal_rating').each(function() {
    let scores = $(this).html()
    let scoreMatch = scores.match(/-?\d+(\.\d+)?/)
    if (scoreMatch) {
      let score = parseFloat(scoreMatch[0])
      meanscore += score
      meanscorediv++
      if (score == 0){
        meanscorediv--
      }
      let meanscoredivision = meanscore / meanscorediv
      let meanscoreround = (Math.round((meanscoredivision + Number.EPSILON) * 100) / 100)
      document.getElementById("meanscoreplace").innerHTML = `<p>Mean Score: ${meanscoreround}</p>`
    }
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
    let explain = rating.explain

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

    return `<td id="counterbody" class="counterth"></td><td colspan="7"><table class="celltable"><tbody><tr><td class="img"><img src="${img}" alt=""></td><td class="number"><a href="${mal}" target="_blank">${id}</a></td><td class="title">${name}</td><td class="alttitle">${altname}</td><td class="season">${season}</td><td class="type">${type}</td><td class="mal_rating"><span class="review">${malrate}<div class="hoverrating">${explain}</div></span></td></tr><tr class="ratingrow"><td colspan="7"><table class="green"><thead><tr><th class="content_score">Objective ${objectiver}/50</th><th class="feeling_score">Subjective ${subjectiver}/50</th></tr></thead><tbody><tr><td><table class="red"><thead><tr><td><span class="characters_score">Characters ${obj_character_rating}/15<div class="explain_obj_character explain_all">This is about the writing of the Characters.</div></span></td><td><span class="writing_score">Writing ${obj_writing_rating}/15<div class="explain_all explain_writing">If someone asks me about the story quality, I'd show them this score.</div></span></td><td><span class="sound_score">Sound/Music ${obj_sound_rating}/10<div class="explain_all explain_sound">I don't really need to explain this do I... It's about the music and sound btw.</div></span></td><td><span class="art_score">Art ${obj_art_rating}/10<div class="explain_all explain_art">This includes more than just the animation. Just look below.</div></span></td></tr></thead><tbody><tr><td><table class="blue"><thead><tr><td><span class="hover_protag">Protagonist<div class="explain_all explain_protag">How well the protagonist is written. Sometimes there can be more than 1 protagonist and sometimes I count the main heroine as protagonist as well.</div></span></td><td><span class="hover_antag">Antagonist<div class="explain_all explain_antag">Same as protagonist, just with your antagonist. If there is no, then the other criterias in the category "Characters" will be rated higher.</div></span></td><td><span class="hover_side">Side Characters<div class="explain_all explain_side">Pretty self explanatory. Don't ever tell me that there are none.</div></span></td><td><span class="hover_real">Realistic<div class="explain_all explain_real">This is about the behaviour of the characters. It doesn't always mean that every character should think like how a modern human thinks, just that I'm at least able to understand them a tiny bit.</div></span></td></tr></thead><tbody><tr><td class="protagonist_score">${obj_protag}</td><td class="antagonist_score">${obj_antag}</td><td class="side_characters_score">${obj_side}</td><td class="waifus_score">${obj_real}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td><span class="hover_plot">Plot<div class="explain_all explain_plot">This refers to the general story writing, and nothing else...</div></span></td><td><span class="hover_logical">Logical<div class="explain_all explain_logical">And this refers to plot holes, if there are any. Basically, a good story has to make sense. Even Comedies.</div></span></td><td><span class="hover_ending">Ending<div class="explain_all explain_ending">How well-written is the ending?</div></span></td></tr></thead><tbody><tr><td class="writing_style_score">${obj_plot}</td><td class="logical_score">${obj_logical}</td><td class="ending_score">${obj_ending}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td><span class="hover_op">OP/ED<div class="explain_all explain_op">How much of a banger is the opening/ending song/songs of this Anime? If there are multiple songs, each of them being slightly above average, I'd still only score it a 3. This is because quality is more important than quantity. If an Anime has many bangers, the score still wouldn't be skyrocketing, because in the end, I'm rating the Anime, not the songs. So every additional opening or ending song is counted less than the previous one.</div></span></td><td><span class="hover_sfx">SFX<div class="explain_all explain_sfx">Rating the soundeffects. Not much to say and not much to rate. Will most likely give almost no points.</div></span></td><td><span class="hover_ost">OST<div class="explain_all explain_ost">The OST also includes the background music or whatever theme.</div></span></td><td><span class="hover_va">VA<div class="explain_all explain_va">How well the voice actors performed. Sadly, I'm very biased towards some VAs so this is more or less subjective, but getting points in this category is hard anyways.</div></span></td></tr></thead><tbody><tr><td class="op_score">${obj_op}</td><td class="sfx_score">${obj_sfx}</td><td class="ost_score">${obj_ost}</td><td class="va_score">${obj_va}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td><span class="hover_animation">Animation<div class="explain_all explain_animation">How good is the animation. How smooth are the characters, how do the fight scenes look like, if there are any. And how much do I like the general animation style. Yes, the last point really isn't objective anymore but whatever.</div></span></td><td><span class="hover_characterdesign">Character Design<div class="explain_all explain_characterdesign">Okay why is this even in "Objective"? Just kidding, this is not about: "How cute do I think this Anime girl is?" but more about:"How unique and cool are the designs?". They don't have to be unique, but they should still be fitting and not repetitive at least.</div></span></td><td><span class="hover_world">World-Building<div class="explain_all explain_world">Fantasy Animes love this criteria. Some Animes just don't need world building as much because they're not Isekais but school Rom-Coms. I will acknowledge that and rate the other criterias a bit higher if that's the case.</div></span></td></tr></thead><tbody><tr><td class="animation_score">${obj_animation}</td><td class="character_design_score">${obj_design}</td><td class="world_building_score">${obj_world}</td></tr></tbody></table></td></tr></tbody></table></td><td><table class="red"><thead><tr><td><span class="emotions_score">Emotions ${subj_emotions_rating}/15<div class="explain_all explain_emotions">This is not about what I feel (well kinda), but about how much I feel.</div></span></td><td><span class="content_f_score">Story ${subj_story_rating}/15<div class="explain_all explain_story">What do I personally think about the story? No idea if this category even makes sense.</div></span></td><td><span class="characters_f_score">Characters ${subj_characters_rating}/10<div class="explain_all explain_subj_characters">Not to be switched with "Characters" (but in "Objective"). How do I personally feel about each and every character, whose name I forgot after 1 day.</div></span></td><td><span class="memory_score">Memory ${subj_memory_rating}/10<div class="explain_all explain_memory">This is about how I remember the Anime. The ultimate "100% biased and subjective" category and the one where I try to cheese some Anime's scores up or down.</div></span></td></tr></thead><tbody><tr><td><table class="blue"><thead><tr><td><span class="hover_strongemotions">Strong Emotions<div class="explain_all explain_strongemotions">Look and the category above this and you'll get it.</div></span></td><td><span class="hover_vibe">Vibe<div class="explain_all explain_vibe">Well this one is rather hard to describe, but it is what it says: the vibe of the Anime overall. Affected by the atmosphere, and the characters, and basically how my attention span was during the Anime, because if I watched it while parallel watching TikTok, then the vibe would be rather bad.</div></span></td><td><span class="hover_climax">Climax<div class="explain_all explain_climax">The criteria "Strong Emotions" was about how strong my emotions were (who would have thought that), and this is about... well, how strong my emotions where at the parts when I felt the most, if that makes sense (no).</div></span></td></tr></thead><tbody><tr><td class="strong_emotions_score">${subj_comedic}</td><td class="multiple_emotions_score">${subj_vibe}</td><td class="special_moments_score">${subj_climax}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td><span class="hover_satisending">Satisfying Ending<div class="explain_all explain_satisending">Ladies and Gentleman, thank you for reading this far. We have now come to the best and worst criteria ever. This ruined way too many Animes. It's obviously about how much I liked the ending of the Anime, not to confused with how well the ending is written (which is another category in "Objective" - "Writing" - "Ending"). If the ending is bad, then everything is. Not only will this get no score or even negative score, but then I'm totally biased against it and I'll try to ruin the scores as much as possible. The "Memory" part will also be greatly negatively affected, for very obvious reasons.</div></span></td><td><span class="hover_scenes">Meaningful Scenes<div class="explain_all explain_scenes">If the anime is just good for one half of the Anime, then this score will be low. I will not watch the entirety of One Piece just for it to get good at Episode 945.</div></span></td><td><span class="hover_enjcontent">Enjoyable Content<div class="explain_all explain_enjcontent">How much I enjoyed it. That's all.</div></span></td></tr></thead><tbody><tr><td class="satisfying_ending_score">${subj_ending}</td><td class="no_bad_scenes_score">${subj_nobadscenes}</td><td class="enjoyable_content_score">${subj_enjoyable}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td><span class="hover_like">Likeable<div class="explain_all explain_like">Not about how "good" as in heroic the characters were, but how much I liked them. Or still do.</div></span></td><td><span class="hover_waifus">Waifus<div class="explain_all explain_waifus">Okay this is too obvious now. You can find my Waifu Tierlist<a target="_blank" href="https://tiermaker.com/user/15561215">here</a>, with all the scores for each tier. It's one of the few (or only?) stackable criterias, but of course it cannot exceed a certain amount of points for the entire category.</div></span></td><td><span class="hover_relation">Relationships<div class="explain_all explain_relation">If there's a super cute couple which makes my heart pound, this will get a high score. If the chemistry between all the characters is brilliant, then this will get a high score. Of course it's required to have good characters first.</div></span></td></tr></thead><tbody><tr><td class="likeable_score">${subj_like}</td><td class="realistic_score">${subj_waifu}</td><td class="balanced_score">${subj_relation}</td></tr></tbody></table></td><td><table class="blue"><thead><tr><td><span class="hover_addictive">Addictive<div class="explain_all explain_addictive">If I was able to watch this in one go, it deserves a high score. If I could not wait any longer each week for a new episode, it deserves a high score.</div></span></td><td><span class="hover_nostalgia">Nostalgia<div class="explain_all explain_nostalgia">How I think about the Anime after a LONG time.</div></span></td><td><span class="hover_aftertaste">Aftertaste<div class="explain_all explain_aftertaste">How I think about the Anime afte a SHORT time.</div></span></td></tr></thead><tbody><tr><td class="addictive_score">${subj_addictive}</td><td class="nostalgia_score">${subj_nostalgia}</td><td class="aftertaste_score">${subj_aftertaste}</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td>`;
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
  
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    } else {
      return ascending ? aVal - bVal : bVal - aVal;
    }
  };
  
  
  

  const sortedRows = Array.from(rows).sort(sortFn);

  for (let i = 0; i < sortedRows.length; i++) {
    tbody.appendChild(sortedRows[i]);
  }
  console.log("done sorting");
  numberleft()
}

function getSortValue(row, category) {
  const valueEl = category === "number"
    ? row.getElementsByClassName(category)[0].children[0]
    : row.getElementsByClassName(category)[0];

  let value = valueEl.textContent;

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
      "Story ",
    ];

    for (let i = 0; i < arrofreplace.length; i++) {
      if (value.includes(arrofreplace[i])) {
        value = value.replace(arrofreplace[i], "");
      }
    }
  }

  // Convert the value to a number if it is a valid number string
  const num = parseFloat(value);
  if (!isNaN(num)) {
    return num;
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


// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.opacity = "1";
    mybutton.style.cursor = "pointer";
  } else {
    mybutton.style.opacity = "0";
    mybutton.style.cursor = "initial";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 


function showinfo() {
    var infoBox = document.getElementById("infobox");
    if (infoBox.style.display === "none" || infoBox.style.display === "") {
      infoBox.style.display = "flex";
      setTimeout(function() {
        window.addEventListener("click", closeInfoBox);
      }, 0);
    } else {
      infoBox.style.display = "none";
      window.removeEventListener("click", closeInfoBox);
    }
}
  
function closeInfoBox(event) {
    var infoBox = document.getElementById("infobox");
    if (!infoBox.contains(event.target)) {
      infoBox.style.display = "none";
      window.removeEventListener("click", closeInfoBox);
    }
}


function discord(){
  navigator.clipboard.writeText("UTSGhost#4892");
  alert("Copied Discord Tag: UTSGhost#4892");
}

function numberleft(){
  var tbody = document.getElementById("foo");
  var rows = tbody.getElementsByClassName("mainrow");
  var count = 1;
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var cell = row.querySelector("#counterbody");
    cell.innerHTML = count++;
  }
}

function waitforload(){
  if(!waiting){
    numberleft();
    console.log("numbers on screeeeen")
  }
  else{
    setTimeout(function() {
      waitforload();
      console.log("wait")
    }, 1);
  }
}
waitforload()