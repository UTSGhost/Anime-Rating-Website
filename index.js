
/* 
  function testbutton(){
    for(let i=0;i<arr.length;i++){
        if (arrnumber<arr[i]){
            arr.splice(i, 0, arrnumber);
            i = arr.length;
        }
    }
    console.log(arr)
};
let arrnumber = 9;
let arr = [1,2,3,4,5,6,7,8,10];
testbutton()
*/
var meanscore = 0
var meanscorediv = 0
$.getJSON('rating.json', function(data) {
  add();

    function renamestuff(){
        let arr = data.animes
        for(var i=0;i<arr.length;i++){
            arr[i].rating.feeling.content.enjoyable_content = arr[i].rating.feeling.content.multiple_good_episodes
            delete arr[i].rating.feeling.content.multiple_good_episodes
        }
        console.log("renamenewstuff", data)
    }
    renamestuff()



    function newsort(){
        let arr = data.animes
        let arrnumber = {
            "img": "https://cdn.myanimelist.net/images/anime/1160/99995.jpg",
            "name": "Toaru Kagaku no Accelerator",
            "alt_name": "A Certain Scientific Accelerator",
            "id": 38480,
            "season": "Summer 2019",
            "type": "TV",
            "rating": {
                "content": {
                    "characters": {
                        "protagonist": 7,
                        "antagonist": 3,
                        "side_characters": 0,
                        "waifus": 1
                    },
                    "writing": {
                        "ending": 2,
                        "general_writing_style": 3,
                        "logical": 4
                    },
                    "music_sound": {
                        "ost_bgm": 3,
                        "voiceacting": 2,
                        "op_ed": 0,
                        "soundeffects": 1
                    },
                    "animation_art": {
                        "fight_scenes_general_smooth_movement": 2,
                        "character_design": 2,
                        "world_building": 4
                    }
                },
                "feeling": {
                    "emotions": {
                        "comedic_sad_thrilling": 3,
                        "multiple_no_focused": 2,
                        "special_moments_episodes": 3
                    },
                    "content": {
                        "satisfying_ending": 2,
                        "no_unnecessary_scenes": 4,
                        "enjoyable_content": 5
                    },
                    "characters": {
                        "likeable": 0,
                        "not_biased": 3,
                        "balance_anta_protag": 3
                    },
                    "memory": {
                        "able_to_memorize": 2,
                        "wanting_to_memorize": 4,
                        "fullfilled": 3
                    }
                }
            }
        };
        for(let i=0;i<arr.length;i++){
            if (arrnumber.id<arr[i].id){
                arr.splice(i, 0, arrnumber);
                i = arr.length;
            }
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
    

    let content = rating.content
    

    let Cchar = content.characters
    let Cprotag = Cchar.protagonist
    let Canta = Cchar.antagonist
    let Cside = Cchar.side_characters
    let Cwaifu = Cchar.waifus
    let Ccharr = Cprotag + Canta + Cside + Cwaifu

    let Cwri = content.writing
    let Corig = Cwri.general_writing_style //new
    let Creal = Cwri.logical //new
    let Cend = Cwri.ending
    let Cwrir = Corig + Creal + Cend

    let Csound = content.music_sound
    let Cop = Csound.op_ed //new
    let Ced = Csound.soundeffects //new
    let Cbgm = Csound.ost_bgm
    let Cva = Csound.voiceacting
    let Csoundr = Cop + Ced + Cbgm + Cva

    let Cart = content.animation_art
    let Cfight = Cart.fight_scenes_general_smooth_movement
    let Ccharades = Cart.character_design
    let Cgart = Cart.world_building //new
    let Cartr = Cfight + Ccharades + Cgart

    let feeling = rating.feeling
    

    let Femo = feeling.emotions
    let Fsad = Femo.comedic_sad_thrilling
    let Fmul = Femo.multiple_no_focused
    let Fspecial = Femo.special_moments_episodes
    let Femor = Fsad + Fmul + Fspecial 

    let Fcont = feeling.content
    let Fsatis = Fcont.satisfying_ending
    let Fnou = Fcont.no_unnecessary_scenes
    let Fmult = Fcont.enjoyable_content
    let Fcontr = Fmult + Fnou + Fsatis

    let Fchar = feeling.characters
    let Flike = Fchar.likeable
    let Fnonbiased = Fchar.not_biased
    let Fbalance = Fchar.balance_anta_protag
    let Fcharr = Fbalance + Fnonbiased + Flike

    let Fmem = feeling.memory
    let Fablem = Fmem.able_to_memorize
    let Fwantm = Fmem.wanting_to_memorize
    let Ffull = Fmem.fullfilled
    let Fmemr = Ffull + Fwantm + Fablem

    let feelingr = Femor + Fcontr + Fcharr + Fmemr
    let contentr = Ccharr + Cwrir + Csoundr + Cartr
    let fullrate = contentr + feelingr
    let malrate = Math.round((fullrate + Number.EPSILON) * 100) / 1000

    return `<td colspan="7"> <table class="celltable"> <tr> <td class="img"><img src="${img}"> <td class="number"><a href="${mal}" target="_blank">${id}</a></td> </td> <td class="title">${name}</td> <td class="alttitle">${altname}</td> <td class="season">${season}</td> <td class="type">${type}</td> <td class="mal_rating">${malrate}</td> </tr> <tr> <td colspan="7"> <table class="green"> <thead> <tr> <th>Content ${contentr}/50</th> <th>Feeling ${feelingr}/50</th> </tr> </thead> <tbody> <tr> <td> <table class="red"> <thead> <tr> <td>Characters ${Ccharr}/15</td> <td>Writing ${Cwrir}/15</td> <td>Sound/Music ${Csoundr}/10</td> <td>Animation ${Cartr}/10</td> </tr> </thead> <tbody> <tr> <td> <table class="blue"> <thead> <tr> <td>Protagonist</td> <td>Antagonist</td> <td>Side Characters</td> <td>Waifus</td> </tr> </thead> <tbody> <tr> <td>${Cprotag}</td> <td>${Canta}</td> <td>${Cside}</td> <td>${Cwaifu}</td> </tr> </tbody> </table> </td> <td> <table class="blue"> <thead> <tr> <td>Writing Style</td> <td>Logical</td> <td>Ending</td> </tr> </thead> <tbody> <tr> <td>${Corig}</td> <td>${Creal}</td> <td>${Cend}</td> </tr> </tbody> </table> </td> <td> <table class="blue"> <thead> <tr> <td>OP/ED</td> <td>SFX</td> <td>OST</td> <td>VA</td> </tr> </thead> <tbody> <tr> <td>${Cop}</td> <td>${Ced}</td> <td>${Cbgm}</td> <td>${Cva}</td> </tr> </tbody> </table> </td> <td> <table class="blue"> <thead> <tr> <td>General</td> <td>Character Design</td> <td>World-Building</td> </tr> </thead> <tbody> <tr> <td>${Cfight}</td> <td>${Ccharades}</td> <td>${Cgart}</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> <td> <table class="red"> <thead> <tr> <td>Emotions ${Femor}/15</td> <td>Content ${Fcontr}/15</td> <td>Characters ${Fcharr}/10</td> <td>Memory ${Fmemr}/10</td> </tr> </thead> <tbody> <tr> <td> <table class="blue"> <thead> <tr> <td>Strong Emotions</td> <td>Multiple Emotions</td> <td>Special Moments</td> </tr> </thead> <tbody> <tr> <td>${Fsad}</td> <td>${Fmul}</td> <td>${Fspecial}</td> </tr> </tbody> </table> </td> <td> <table class="blue"> <thead> <tr> <td>Satisfying Ending</td> <td>No bad Scenes</td> <td>Enjoyable Content</td> </tr> </thead> <tbody> <tr> <td>${Fsatis}</td> <td>${Fnou}</td> <td>${Fmult}</td> </tr> </tbody> </table> </td> <td> <table class="blue"> <thead> <tr> <td>Likeable</td> <td>Realistic</td> <td>Balanced</td> </tr> </thead> <tbody> <tr> <td>${Flike}</td> <td>${Fnonbiased}</td> <td>${Fbalance}</td> </tr> </tbody> </table> </td> <td> <table class="blue"> <thead> <tr> <td>Able To Memorize</td> <td>Nostalgia</td> <td>Fullfilled</td> </tr> </thead> <tbody> <tr> <td>${Fablem}</td> <td>${Fwantm}</td> <td>${Ffull}</td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </table></td>`;
  }
});


//sort
function sort(ascending, columnClassName, tableId)
		{
			var tbody = document.getElementById(tableId).getElementsByTagName("tbody")[0];
			var rows = tbody.getElementsByClassName("mainrow");
			var unsorted = true;
			
			while(unsorted)
			{
				unsorted = false
				
				for (var r = 0; r < rows.length - 1; r++)
				{
					var row = rows[r];
					var nextRow = rows[r+1];
					//console.log(nextRow)
                    if (columnClassName=="number"){
                        var value = row.getElementsByClassName(columnClassName)[0].children[0].innerHTML;
                        var nextValue = nextRow.getElementsByClassName(columnClassName)[0].children[0].innerHTML;
                    } else {
                        var value = row.getElementsByClassName(columnClassName)[0].innerHTML;
                        var nextValue = nextRow.getElementsByClassName(columnClassName)[0].innerHTML;
                    }
					value = value.replace(',', ''); // in case a comma is used in float number
					nextValue = nextValue.replace(',', '');
					
					if(!isNaN(value))
					{
						value = parseFloat(value);
						nextValue = parseFloat(nextValue);
					}
					
					//console.log(value);
					
					if (ascending ? value > nextValue : value < nextValue)
					{
						tbody.insertBefore(nextRow, row);
						unsorted = true;
					}
				}
			}
		};


// xml
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
    }
};
xhttp.open("GET", "animelist.xml", true);
xhttp.send();

var animelist = []

function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var animeListLength = xmlDoc.getElementsByTagName('anime').length;
    for (var i = 0; i < animeListLength; i++){
      var z = xmlDoc.getElementsByTagName('my_status')[i].childNodes[0].nodeValue;
      if (z == "Completed"){
        var title = xmlDoc.getElementsByTagName('series_title')[i].childNodes[0].nodeValue;
        var id = xmlDoc.getElementsByTagName('series_animedb_id')[i].childNodes[0].nodeValue;
        var idnumber = parseInt(id)
        var type = xmlDoc.getElementsByTagName('series_type')[i].childNodes[0].nodeValue;
        animelist.push(
          {
            "img":"",
            "name":title,
            "alt_name":"",
            "id":idnumber,
            "season":"",
            "type":type,
            "rating": {
                "content": {
                    "characters": {
                        "protagonist": 0,
                        "antagonist": 0,
                        "side_characters": 0,
                        "waifus": 0
                    },
                    "writing": {
                        "ending": 0,
                        "general_writing_style": 0,
                        "logical": 0
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
                "feeling": {
                    "emotions": {
                        "comedic_sad_thrilling": 0,
                        "multiple_no_focused": 0,
                        "special_moments_episodes": 0
                    },
                    "content": {
                        "satisfying_ending": 0,
                        "no_unnecessary_scenes": 0,
                        "enjoyable_content": 0
                    },
                    "characters": {
                        "likeable": 0,
                        "not_biased": 0,
                        "good_antagonist": 0
                    },
                    "memory": {
                        "able_to_memorize": 0,
                        "wanting_to_memorize": 0,
                        "fullfilled": 0
                    }
                }
            }
          } //object
        ) // after push
        animelist.sort((a, b) => (a.id > b.id) ? 1 : -1) 
      } // if completed
    } //for i
}
console.log("xml", animelist) //copy into rating.json


//new json 
/*
var rerate = [
    
]
function rerating(){
    for (var i = 0; i < rerate.length; i++){
        var rate = rerate[i].rating
        var ratec = rate.content
        var ratef = rate.feeling
        delete rerate[i].mal
        ratec.writing.general_writing_style = ratec.writing.original
        delete ratec.writing.original
        ratec.writing.logical = ratec.writing.realistic
        delete ratec.writing.realistic
        ratec.music_sound.op_ed = ratec.music_sound.opening
        delete ratec.music_sound.opening
        ratec.music_sound.soundeffects = ratec.music_sound.ending
        delete ratec.music_sound.ending
        ratec.animation_art.world_building = ratec.animation_art.general_art_background
        delete ratec.animation_art.general_art_background
        delete ratef.characters.realistic
    } console.log (rerate)
}
rerating()



//minecraft stuff idk



function tttaevas() {
    let idkman = ""
    for(i=60;i>0;i--){
        let titlemc = `\n      - 'console_command: title @a actionbar {"text":"${i}"}'\n      - 'wait: 1'`
        idkman = idkman + titlemc
    }
    console.log(idkman)
}
tttaevas()

*/
