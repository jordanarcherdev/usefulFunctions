//Custom node functions

/*
 * Traverse file directory
 * Replace characters
 * isVideo - check if string ends with certain characters
 * alphaOrder - Sorts into alphabetical order
 * findEpisode - Checks object for 2 items
 * Search - Finds a value in an object
 * buildEpisode/buildSeason - Builds an object
 * Async find all in collections functions
 */

const path = require('path');
const util = require('util');
const fs = require('fs');
const mongoose = require('mongoose');

module.exports = {
  //Digs through directories until it finds files, builds an object
  traverse: function traverse(dir, result = []) {

      // list files in directory and loop through
      fs.readdirSync(dir).forEach((file) => {

          // builds full path of file
          const fPath = path.resolve(dir, file);

          // prepare stats obj
          const fileStats = { file, path: fPath };

          // is the file a directory ?
          // if yes, traverse it also, if no just add it to the result
          if (fs.statSync(fPath).isDirectory()) {
              fileStats.type = 'dir';
              fileStats.files = [];
              result.push(fileStats);
              return traverse(fPath, fileStats.files)
          }

          fileStats.type = 'file';
          result.push(fileStats);
      });
      return result;
  },
  replacer: function(direction, path){
    //Replaces characters in path for url parameter passing
    if (direction == 'in'){
      path = path.replace(/\//g, '~');
    }

    if (direction == 'out'){
      path = path.replace(/~/g, '/');
    }

    return path;
  },
  //Checks if file is a video
  isVideo: function(item){
      let video;
      if(item.endsWith('.mp4') || item.endsWith('.mov') || item.endsWith('.avi')){
        video = item;
      }
    return video;
  },
  //Sorts collection into alphabetical order for display
  alphaOrder: function(a, b) {
  var textA = a.title.toUpperCase();
  var textB = b.title.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  },
  //Finds an episode in the object
  findEpisode: function(seas, epis, arr){
    let foundEp;
    for(let i = 0; i < arr.length; i++){
      if(arr[i].season == seas && arr[i].number == epis){
        foundEp = arr[i]
      }
    }
    return foundEp;
  },
  //Searches for value in an array of objects
  search: function (nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].compareName === nameKey) {
            return myArray[i];
        }
    }
  },
  //Builds the episode object
  buildEpisode: function(episode, file){
    let newEpisode = {
      _id: mongoose.Types.ObjectId(episode.id),
      mazeid: show.id,
      title: episode.name,
      number: episode.number,
      season: episode.season,
      date: episode.airdate,
      duration: episode.runtime,
      poster: episode.image,
      description: episode.summary,
      forShow: file.title,
      videoPath: episPath,
      uniqueId: unique
    }

    return newEpisode;
  },
  //Builds the season object
  buildSeason: function(){

  },
  //Async get collections examples
  getCategoryDb: function(callback){
  Category.find({}, function(err, allCategories){
    if(err) return callback(err);
    categories = allCategories;
    callback(null,allCategories);

  })
  },
  getStarDb: function(callback){
    Star.find({}, function(err, allStars){
      if(err) return callback(err);
      stars = allStars;
      callback(null,allStars);
      })
  },
  getSponsorDb: function(callback){
    Sponsor.find({}, function(err, allSponsors){
      if(err) return callback(err);
      sponsors = allSponsors;
      callback(null,allSponsors);
      })
  },
  getVideoDb: function(callback){
    Video.find({}, function(err, allVideos){
      if(err) return callback(err);
      videos = allVideos;
      callback(null,allVideos);
      }).populate('categories').populate('sponsor').populate('starring')
  },


}
