var PouchDB = require('pouchdb');

var db = new PouchDB('allAnime');


function deleteall(){
  db.destroy().then(function (response) {
    console.log(response)
  }).catch(function (err) {
    console.log(err);
  });
}
//deleteall()


function addall(){
  ratings = require("./rating.json")
  const array = ratings.animes
  

  for(var i = 0;i<array.length;i++){
    const anime = array[i]
    let theID = i.toString()
    
    db.get(theID).then(function (doc) {
      return db.put({
        "_id": theID,
        "_rev": doc._rev,
        "img": anime.img,
        "name":anime.name,
        "alt_name":anime.alt_name,
        "id":anime.id.toString(),
        "season":anime.season,
        "type":anime.type,
      }).then(function (result) {
        console.log(result)
      }).catch(function (err) {
        console.log(err);
      });
    }).catch(function () {
      db.put({
        "_id": theID,
        "img": anime.img,
        "name":anime.name,
        "alt_name":anime.alt_name,
        "id":anime.id.toString(),
        "season":anime.season,
        "type":anime.type,
      }).then(function (result) {
        console.log(result)
      }).catch(function (err) {
        console.log(err);
      });
    });
  }
}
//addall()




function checkDoc(id){
  db.get(id).then(function (doc) {
    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv")
    console.log(doc)
    console.log(typeof(doc))
    console.log(doc._id)
    console.log("-------------------------------------------")
  }).catch(function (err) {
    console.log(err);
  });
}
//checkDoc("0")


