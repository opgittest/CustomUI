/*// Add missing javascript methods
Array.prototype.unique = function( b ) {
 var a = [], i, l = this.length;
 for( i=0; i<l; i++ ) {
  if( a.indexOf( this[i], 0, b ) < 0 ) { a.push( this[i] ); }
 }
 return a;
};

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};*/







// Define collection manipulation functions

function queryByCategory(collection, term){	
	return (collection.filter(function(element, index, array){
			return (element.category === term)
	}))
}

function queryByTags (collection, terms, method){
	switch (method){
		case 'inclusive':
			return(collection.filter(function(element, index, array){
				if(element.tags){
					if(element.tags.length > 0){
						//console.log(element.name);
						if(terms.some(function(e,i,a){
							if($.inArray(e, element.tags) > -1){
								//console.log(e+" found");
								return true
							}else{
								//console.log(e+" NOT found");
								return false
							}
						})){
							//console.log('Element has passed test as true');
							return element
						}
					}
				}
			}))
			break;
		case 'exclusive':
			return(collection.filter(function(element, index, array){
				//console.log(element);
				if(element.tags.length > 0){
					//console.log(element.name);
					if(terms.every(function(e,i,a){
						if($.inArray(e, element.tags) > -1){
							//console.log(e+" found");
							return true
						}else{
							//console.log(e+" NOT found");
							return false
						}
					})){
						//console.log('Element has passed test as true');
						return element
					}
				}
			}))
			break;
	}
}

function sortName(collection){
	return (collection.sort(function(a,b){
			var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
			if(nameA < nameB) //sort string ascending
				return -1
			if (nameA > nameB)
				return 1
			return 0 //default return value (no sorting)
	}))
}

function sortAlpha(collection){
	return (collection.sort())
}


function itemsByAttribute(collection, attribute, value){
	var Items = (collection.filter(function(element, index, array){
		if(element[attribute] === value){
			return element
		}
	}))
	return Items;
}

function optionalItems(collection){
	return (collection.filter(function(element, index, array){
			return (element.optional === true)
	}))
}

function getSkillList(skillprofileId){
	var skillProfile = itemById(assignments.skillprofiles, skillprofileId);
	//console.log(skillProfile[0].items);
	return skillProfile.items;
}

function selectionLaunch(id){
	var selection = itemById(library.items, id);
	var r = confirm('"'+selection.name+'" \r\n \r\n This selection has been added to your training content, you can find it in "My Training > Elective Learning." \r\n \r\n Would you like to play the selection now?');
	if(r == true){
		window.location = 'cellcast://action/assign/'+selection.selectionType+'/'+selection.id+'/true';
	} else {
		window.location = 'cellcast://action/assign/'+selection.selectionType+'/'+selection.id+'/false';
	}
}

(function ($){

$.fn.listItems = function(options){
	
	var defaults;
	var settings = $.extend(defaults, options);
	
	return this.each(function(){
		var $this = $(this);
		
		var render = function(collection, template){
			//console.log(collection);
			var that = this;
			$.each(collection, function(){
				var listItem = $(template).clone();
				
				listItem.find('[data-scurl="assignment"]').attr('href', "cellcast://"+this.assignType+"/"+this.id+"/true");
				listItem.find('[data-scurl="announcement"]').attr('href', "cellcast://announcement/"+this.id);
				listItem.find('[data-scurl="notification"]').attr('href', "cellcast://notification/"+this.id);
				listItem.find('[data-scurl="library"]').attr('href', "cellcast://action/assign/"+this.selectionType+"/"+this.id+"/true");
				
				listItem.find('[data-tmpl="launchBtn"]').attr('href', 'javascript: selectionLaunch('+this.id+')');
				
				listItem.find('[data-tmpl="title"]').html(this.name);
				listItem.find('[data-tmpl="description"]').html(this.description);
				listItem.find('[data-tmpl="status"]').html(this.status);
				listItem.find('[data-tmpl="duration"]').html(this.duration);
				if(this.metatags){
					listItem.find('[data-tmpl="metatags"]').html(this.metatags.join(" "));
				}
				
				if(this.image != null){
					listItem.find('[data-tmpl="thumb"]').attr('src', imgpath+"/"+this.image);
				} else {
					listItem.find('[data-tmpl="thumb"]').attr('src', "img/content_images/default.png");
				}
				
				
				//If this is a message
				listItem.find('[data-tmpl="msg_title"]').html(this.title);
				if(this.viewed){
					if(this.viewed == true){
						listItem.find('[data-tmpl="msg_status"]').attr('src', 'img/icons/message_read.png');
					} else {
						listItem.find('[data-tmpl="msg_status"]').attr('src', 'img/icons/message_unread.png');
					}
				}
				
				//if this is a status item
				if(this.status == 2){
					listItem.find('[data-tmpl="status_icon"]').attr('src', 'img/icons/completed.png');
				}
				if(this.status == 4){
					listItem.find('[data-tmpl="status_icon"]').attr('src', 'img/icons/incomplete.png');
				}
				if(this.status == 6){
					listItem.find('[data-tmpl="status_icon"]').attr('src', 'img/icons/not_attempted.png');
				}
				
				listItem.children().appendTo($this); 
			});
		}
	
		var filter = function(settings, collection){
			//console.log(collection);
			if (settings.category || settings.tags){
				if(settings.category && settings.tags){
					//console.log("both detected!");
					var catArray = queryByCategory(collection, settings.category);
					var tagArray = queryByTags(catArray, [settings.tags], settings.rule);
					var filtered = tagArray;
				}
				if(settings.category && !settings.tags){
					//console.log("JUST category detected");
					var filtered = queryByCategory(collection, settings.category)	;
				}
				if(!settings.category && settings.tags){
					//console.log("JUST tags detected");
					var filtered = queryByTags(collection, [settings.tags], settings.rule);
				}
				//filtered = sortName(filtered);
				render(filtered, settings.template);
			} else {
				render(collection, settings.template);
			}
			 
		}
			
		var process = function(settings){
			if(settings.collection){
				switch (settings.collection){
					case 'library':
						var collection = library.items;
						break;
					case 'catalog':
						var collection = library.items.concat(assignments.assignments);
						break;
					case 'assignments':
						if(settings.subset){
							var collection = assignments[settings.subset];
						} else {
							var collection = assignments.assignments;
						}
						break;
					case 'announcements':
						var collection = messages.announcements;
						break;
					case 'notifications':
						var collection = messages.notifications;
						break;
					case 'status':
						if(settings.subset){
							switch(settings.subset){
								case 'nuggets':
									var collection = mystatus.nuggets;
									break;
								case 'courses':
									var collection = mystatus.courses;
									break;
								case 'assessments':
									var collection = mystatus.assessments;
									break;
								case 'skillprofiles':
									var collection = mystatus.skillprofiles;
									break;
							}
						} else {
							var collection = mystatus.items;
						}
						break;
				}
			}
			if(settings.skillprofile){
				var spList = getSkillList(settings.skillprofile);
				var collection = [];
				$.each(spList, function(){
					var temp = itemById(assignments.assignments, this.id);
					collection.push(temp);
				});
			}
			if(settings.optional == true){
				var collection = optionalItems(assignments.assignments);
			}
			
			
			
			filter(settings, collection);
		}
		
		var init = function(){
			process(settings);
		};
		
		var clear = function(){
			console.log('Clear called');
			($this).html('');
		};
		
		init();
	});
	
};
/*function(options){
	$.extend(this, options);
	
	var that = this;
	
	this.render = function(){
		//console.log("SP: "+this.skillprofile+" | Category: "+this.category+" | Tag: "+this.tag);
		$(this.el).html('').hide();
		if (this.skillprofile){
			//console.log('beginning SP approach');
			var skillArray = getSkillList(this.skillprofile)			
			$.each(skillArray, function(){
				var skill = itemById(assignments.assignments, this.id);
				//console.log(skill);
				var skillItem = $(that.template).clone();
				skillItem.find('[data-tmpl="scurl"]').attr('href', "cellcast://"+skill.assignType+"/"+skill.id+"/true");
				skillItem.find('[data-tmpl="title"]').html(skill.name);
				skillItem.find('[data-tmpl="description"]').html(skill.description);
				skillItem.find('[data-tmpl="status"]').html(skill.status);
				skillItem.find('[data-tmpl="duration"]').html(skill.duration);
				if(skill.image != null){
					skillItem.find('[data-tmpl="thumb"]').attr('src', imgpath+"/"+skill.image);
				} else {
					skillItem.find('[data-tmpl="thumb"]').attr('src', "img/content_images/default.png");
				}
				skillItem.children().appendTo(that.el); 
			});
		}
		
		if (this.category){
			console.log('beginning category approach');
			var catArray = queryByCategory(assignments.assignments, this.category);
			//console.log(catArray);
			$.each(catArray, function(){
				var listItem = $(that.template).clone();
				listItem.find('[data-tmpl="scurl"]').attr('href', "cellcast://"+this.assignType+"/"+this.id+"/true");
				listItem.find('[data-tmpl="title"]').html(this.name);
				listItem.find('[data-tmpl="description"]').html(this.description);
				listItem.find('[data-tmpl="status"]').html(this.status);
				listItem.find('[data-tmpl="duration"]').html(this.duration);
				if(this.image != null){
					listItem.find('[data-tmpl="thumb"]').attr('src', imgpath+"/"+this.image);
				} else {
					listItem.find('[data-tmpl="thumb"]').attr('src', "img/content_images/default.png");
				}
				listItem.children().appendTo(that.el); 
			});
		}
		
		if (this.tag){
			//console.log('beginning tag approach');
			var tagArray = queryByTags(assignments.assignments, [this.tag], 'inclusive');
			//console.log(tagArray);
			$.each(tagArray, function(){
				var listItem = $('#item_tmpl').clone();
				listItem.find('[data-tmpl="scurl"]').attr('href', "cellcast://"+this.assignType+"/"+this.id+"/true");
				listItem.find('[data-tmpl="title"]').html(this.name);
				listItem.find('[data-tmpl="description"]').html(this.description);
				listItem.find('[data-tmpl="status"]').html(this.status);
				listItem.find('[data-tmpl="duration"]').html(this.duration);
				if(this.image != null){
					listItem.find('[data-tmpl="thumb"]').attr('src', imgpath+"/"+this.image);
				} else {
					listItem.find('[data-tmpl="thumb"]').attr('src', "img/content_images/default.png");
				}
				listItem.children().appendTo(that.el); 
			});
		}
		
		if(this.collection === 'library'){
			console.log('beginning library approach');
			console.log(library.items);
			$.each(library.items, function(){
				console.log(this.name);
				var listItem = $(that.template).clone();
				listItem.find('[data-tmpl="scurl"]').attr('href', "cellcast://action/assign/"+this.selectionType+"/"+this.id+"/true");
				listItem.find('[data-tmpl="launchBtn"]').attr('href', 'javascript: selectionLaunch('+this.id+')');
				listItem.find('[data-tmpl="title"]').html(this.name);
				listItem.find('[data-tmpl="description"]').html(this.description);
				listItem.find('[data-tmpl="status"]').html(this.status);
				listItem.find('[data-tmpl="duration"]').html(this.duration);
				if(this.metatags){
					listItem.find('[data-tmpl="metatags"]').html(this.metatags.join(" "));
				}
				if(this.image != null){
					listItem.find('[data-tmpl="thumb"]').attr('src', imgpath+"/"+this.image);
				} else {
					listItem.find('[data-tmpl="thumb"]').attr('src', "img/content_images/default.png");
				}
				listItem.children().appendTo(that.el); 
				console.log('writing '+this.name+' to '+that.el);
			});
		}
		
		if (this.collection === 'announcements'){
			$.each(messages.announcements, function(){
				var listItem = $(that.template).clone();
				listItem.find('[data-tmpl="scurl"]').attr('href', "cellcast://announcement/"+this.id);
				listItem.find('[data-tmpl="msg_title"]').html(this.title);
				if(this.viewed == true){
					listItem.find('[data-tmpl="msg_status"]').attr('src', 'img/icons/message_read.png');
				} else {
					listItem.find('[data-tmpl="msg_status"]').attr('src', 'img/icons/message_unread.png');
				}
				listItem.find('[data-tmpl="msg_delete"]').css('display', 'none');
				listItem.children().appendTo(that.el);
			});
		}
		
		if (this.collection === 'notifications'){
			$.each(messages.notifications, function(){
				var listItem = $(that.template).clone();
				listItem.find('[data-tmpl="scurl"]').attr('href', "cellcast://notification/"+this.id);
				listItem.find('[data-tmpl="msg_title"]').html(this.title);
				if(this.viewed == true){
					listItem.find('[data-tmpl="msg_status"]').attr('src', 'img/icons/message_read.png');
				} else {
					listItem.find('[data-tmpl="msg_status"]').attr('src', 'img/icons/message_unread.png');
				}
				listItem.children().appendTo(that.el);
			});
		}
		
		if (this.optional == true){
			var optionalArray = optionalItems(assignments.assignments);
			$.each(optionalArray, function(){
				var listItem = $(that.template).clone();
				listItem.find('[data-tmpl="scurl"]').attr('href', "cellcast://"+this.assignType+"/"+this.id+"/true");
				listItem.find('[data-tmpl="title"]').html(this.name);
				listItem.find('[data-tmpl="description"]').html(this.description);
				listItem.find('[data-tmpl="status"]').html(this.status);
				listItem.find('[data-tmpl="duration"]').html(this.duration);
				if(this.image != null){
					listItem.find('[data-tmpl="thumb"]').attr('src', imgpath+"/"+this.image);
				} else {
					listItem.find('[data-tmpl="thumb"]').attr('src', "img/content_images/default.png");
				}
				listItem.children().appendTo(that.el); 
			});
		}
		$(this.el).fadeIn();
	}
	
	this.render();
}*/

})(jQuery);
