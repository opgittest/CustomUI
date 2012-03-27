// Add missing javascript methods
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
};

// Declare Global Variables
var jsonpath = "";
var imgpath = "";
var platform = "";
var nuggets;
var courses;
var assessments;
var skillprofiles;
var scorm;
var playlists;
var notifications;
var announcements;
var assignments;
var messages;
var library;
var mystatus;



// Define SCURL Function
function getPaths (){
	//alert('getPaths called');
	window.location = "cellcast://data/getpaths/setpaths";
}

function getLibrary(){
	//alert('library method called');
	window.location = 'cellcast://data/library/libraryReady';
}

function getStatus(){
	//alert('status method called');
	window.location = 'cellcast://data/mystatus/statusReady';
}


// Define Callback Function
function setpaths(jsonPath, imgPath, Platform){
	jsonpath = jsonPath;
	imgpath = imgPath;
	platform = Platform;
	
	//console.log("init function started");
	//console.log("JSON path: "+jsonpath+" | image path: "+imgpath+" | Platform: "+platform);
	smartInit();
	//pageInit();
	//getLibrary();
	//getStatus();

}

function libraryReady(){
		//alert('library.json ready for template');
		$.ajax({
			url: jsonpath+'library.json',
			dataType: 'json',
			async: false,
			success: function(data){
				//alert('library success');
				
				library = new Library(data);
				//console.log(typeof library);
				libraryInit();
			},
			error: function(jqXHR, textStatus, errorThrown){
				//alert('ajax error:'+errorThrown);
				//console.log(jqXHR);
				//console.log(textStatus);
				//console.log(errorThrown);
		}
		});
}

function statusReady(){
		//alert('status.json ready for template');
		$.ajax({
			url: jsonpath+'my_status.json',
			dataType: 'json',
			async: false,
			success: function(data){
				//alert('status success');
				//console.log(typeof data);
				//alert('status call successful');
				mystatus = new myStatus(data);
				//console.log(typeof mystatus);
				statusInit();
			},
			error: function(jqXHR, textStatus, errorThrown){
				//alert('ajax error:'+errorThrown);
				//console.log(jqXHR);
				//console.log(textStatus);
				//console.log(errorThrown);
		}
		});
}




// Define Assignment constructors
var Nuggets = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	
	
	//Set get method
	this.get = $.ajax({
		url: jsonpath+"nugget_assignments.json",
		dataType: 'json',
		async: false,
		success: function(data){
			//console.log("Nuggets Successful");
			that.model = data;
		}
	});
}

var Assessments = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = $.ajax({
		url: jsonpath+"testset_assignments.json",
		dataType: 'json',
		async: false,
		success: function(data){
			//console.log("Assessments Successful");
			that.model = data;
		}
	});
}


var Courses = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = $.ajax({
		url: jsonpath+"course_assignments.json",
		dataType: 'json',
		async: false,
		success: function(data){
			//console.log("Courses Successful");
			that.model = data;
		}
	});
}


var Skillprofiles = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = $.ajax({
		url: jsonpath+"skillprofiles.json",
		dataType: 'json',
		async: false,
		success: function(data){
			//console.log('Skill Profiles Successful');
			that.model = data.skillprofiles;
		},
		error: function(jqXHR, textStatus, errorThrown){
			that.model = null;
			//console.log(jqXHR);
			//console.log(textStatus);
			//console.log(errorThrown);
		}
	});
}

var Scorm = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = $.ajax({
			url: jsonpath+"scorm_courses.json",
			dataType: 'json',
			async: false,
			success: function(data){
				//console.log('Scorm Courses Successful');
				that.model = data;
			},
			error: function(jqXHR, textStatus, errorThrown){
				that.model = null;
				//console.log(jqXHR);
				//console.log(textStatus);
				//console.log(errorThrown);
			}
		});
}

var Playlists = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = $.ajax({
		url: jsonpath+"playlists.json",
		dataType: 'json',
		async: false,
		success: function(data){
			//console.log('playlists Successful');
			that.model = data;
		}
	});	
}


var Announcements = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	
	
	//Set get method
	this.get = $.ajax({
		url: jsonpath+"announcements.json",
		dataType: 'json',
		async: false,
		success: function(data){
			//console.log("Announcements Successful");
			that.model = data;
		}
	});
}

var Notifications = function (){
	//Set "this" to point to top
	var that = this;
	this.model;
	
	//Set render function
	this.render;
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = $.ajax({
		url: jsonpath+"notifications.json",
		dataType: 'json',
		async: false,
		success: function(data){
			//console.log("Notifications Successful");
			that.model = data;
		}
	});
}

var Assignments = function(){
	var that = this;
	
	this.categories = [];
	this.tags = [];
	
	this.newItems = nuggets.model.new_items +
		courses.model.new_items + 
		assessments.model.new_items + 
		scorm.model.new_items;
		
	this.totalItems = nuggets.model.total_items +
		courses.model.total_items + 
		assessments.model.total_items + 
		scorm.model.total_items;
		
	 
	this.nuggets = nuggets.model.nuggets;
	this.courses = courses.model.courses;
	this.assessments = assessments.model.testsets;
	this.scorm = scorm.model.courses;
	this.skillprofiles = skillprofiles.model;
	
	
		$.each(this.nuggets, function(){
			this.assignType = "nugget";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				that.categories.push(this.category);
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){
						tags.push(value);
						that.tags.push(value);
					}
				});
				this.tags = tags;
			}
		});	

	

		$.each(this.courses, function(){
			this.assignType = "course";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});

	

		$.each(this.assessments, function(){
			this.assignType = "assessment";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});


		$.each(this.scorm, function(){
			this.assignType = "scorm";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});

	
		if(skillprofiles.model){
		$.each(this.skillprofiles, function(){
			this.assignType = "skillprofile";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});
		}

	
	
	this.assignments = this.nuggets.concat(this.courses, this.assessments, this.scorm, this.skillprofiles);
	
	this.categories = this.categories.unique();
	this.tags = this.tags.unique();

}

var Library = function(data){
	console.log(data);
	var that = this;
	
	this.model = data;
	
	if (data.courses){
		this.courses = data.courses;
	} else {
		this.courses = null;
	}
	if (data.nuggets){
		this.nuggets = data.nuggets;	
	} else {
		this.nuggets = null;
	}
	if (data.testsets){
		this.assessments = data.testsets;
	} else {
		this.assessments = null;
	}
	if (data.scorm){
		this.scorm = data.scorm;
	} else {
		this.scorm = null;
	}
	if(data.skillprofiles){
		this.skillprofiles = data.skillprofiles;
	} else {
		this.skillprofiles = null;
	}
	
	if(this.courses){
		$.each(this.courses, function(){
			this.selectionType = "course";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});
	}
	
	if(this.nuggets){
		$.each(this.nuggets, function(){
			this.selectionType = "nugget";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});
	}
	
	if(this.assessments){
		$.each(this.assessments, function(){
			this.selectionType = "assessment";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});
	}
	
	if(this.scorm){
		$.each(this.scorm, function(){
			this.selectionType = "scorm";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});
	}
	
	if(this.skillprofiles){
		$.each(this.skillprofiles, function(){
			this.selectionType = "skillprofile";
			if(this.metatags){
				this.metatags = this.metatags.split("|");
				this.category = this.metatags[0];
				var tags = [];
				$.each(this.metatags, function(i, value){
					//console.log(this);
					if(i>0){tags.push(value)}
				});
				this.tags = tags;
			}
		});
	}

	this.items = this.nuggets.concat(this.courses, this.assessments, this.scorm, this.skillprofiles);
	this.items.clean();

	//console.log('Library instance created');
}

var myStatus = function(data){
	//console.log(data);
	var that = this;
	
	this.model = data;
	
	if (data.courses){
		this.courses = data.courses;
	} else {
		this.courses = null;
	}
	if (data.nuggets){
		this.nuggets = data.nuggets;	
	} else {
		this.nuggets = null;
	}
	if (data.testsets){
		this.assessments = data.testsets;
	} else {
		this.assessments = null;
	}
	if (data.scorm){
		this.scorm = data.scorm;
	} else {
		this.scorm = null;
	}
	if(data.skillprofiles){
		this.skillprofiles = data.skillprofiles;
	} else {
		this.skillprofiles = null;
	}
	if(data.activities){
		this.activities = data.activities;
	} else {
		this.activities = null;
	}

	this.items = this.nuggets.concat(this.courses, this.assessments, this.scorm, this.skillprofiles, this.activities);
	this.items.clean();
	
	//console.log(this.items);
	
	//console.log('Status instance created');
}



var Messages = function(){
	
	var that = this;
	
	this.newItems = announcements.model.new_items +
		notifications.model.new_items;
		
	this.totalItems = announcements.model.total_items +
		notifications.model.total_items;
	 
	this.announcements = announcements.model.messages;
	this.notifications = notifications.model.messages;
}


function smartInit(){
	//console.log('smartInit called');
	nuggets = new Nuggets();
	courses = new Courses();
	assessments = new Assessments();
	skillprofiles = new Skillprofiles();
	scorm = new Scorm();
	
	assignments = new Assignments();

	announcements = new Announcements();
	notifications = new Notifications();
	messages = new Messages();
	
	pageInit();
}




