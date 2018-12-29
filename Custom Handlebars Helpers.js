//Custom handlebars helpers

/*
 * Times - displays certain amount of items from array
 * eachReverse - Displays array items in reverse
 * reverseTimes - Combination of times and eachReverse
 * seasonEpisodes - Displays items which match certain parameter
 * groupItems - Splits array items into groups
 * compare - same as seasonEpisodes
 * Truncate - shortens a string
 * stripTags - strips HTML tags
 * formatDate - Displays date in better format
 * select - Think it passes what's inside dropdown select but not sure
 * editIcon - Displays an icon only if user is logged in
 */

module.exports ={

  //Displays a certain amount of items from an array
  times: function(ary, max, options){
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
  },
  //Reverses everything in an array and displays
  eachReverse: function(context){
    var options = arguments[arguments.length - 1];
    var ret = '';

    if (context && context.length > 0) {
        for (var i = context.length - 1; i >= 0; i--) {
            ret += options.fn(context[i]);
        }
    } else {
        ret = options.inverse(this);
    }

return ret;
},
  //Displays everything in an array reversed, but limited to a certain amount
  reverseTimes: function(context, limit){
    var options = arguments[arguments.length - 1];
    var ret = '';

    if (context && context.length > 0) {
        var max = Math.min(context.length, limit);
        for (var i = max - 1; i >= 0; i--) {
            ret += options.fn(context[i]);
        }
    } else {
        ret = options.inverse(this);
    }

return ret;
},
  //Checks if item matches passed parameter number before displaying
  seasonEpisodes: function(eps, number, options){
    if(eps == number){
      return options.fn(this);
    }else{
      return options.inverse(this);
    }
  },

  //Displays an array but stops at a certain number, good for if you are using rows in html eg (3 per row)
  groupItems(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
},
//Checks to see if value matches conditional before displaying
compare: function(conditional, options){
  if (options.hash.value === conditional){
    return options.fn(this);
  } else{
    return options.inverse(this);
  }
},
//Shortens a string to a limited amount of letters for displaying eg (Harry potter and the phi...)
truncate: function(str, len){
  if (str.length > len && str.length > 0) {
    var new_str = str + " ";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(" "));
    new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
    return new_str + '...';
  }
  return str;
},
//Removes Html tags from input
stripTags: function(input){
  return input.replace(/<(?:.|\n)*?>/gm, '');
},
//Displays the date in a better format
formatDate: function(date, format){
  return moment(date).format(format);
},
//Get back to this one, probably useful
select: function(selected, options){
  return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
},
//Displays an icon if user is logged in
editIcon : function(storyUser, loggedUser, storyId, floating = true){
  if(storyUser == loggedUser){
    if(floating){
      return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
    }else{
      return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`;
    }
  }else{
    return '';
  }
}



}
