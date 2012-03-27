// JavaScript Document

var jsonpath = "";
var imgpath = "";
var platform = "";

function getPaths (){
	window.location = "cellcast://data/getpaths/setpaths";
}

function setpaths(jsonPath, imgPath, Platform){
	jsonpath = jsonPath;
	imgpath = imgPath;
	platform = Platform;
	
	init();
}

/*if (typeof console  != "undefined") 
    if (typeof console.log != 'undefined')
        console.olog = console.log;
    else
        console.olog = function() {};

console.log = function(message) {
    console.olog(message);
    $('#debug').append('<p>' + message + '</p>');
};
console.error = console.debug = console.info =  console.log*/




/*	
var environment = "";	
var nuggets_assignments = "";
var course_assignments = "";
var scorm_courses = "";
var skillprofiles = "";
var assessments = "";
var notifications = "";
var announcements = "";
var phonenumbers = "";
var playlists = "";
var branding = "";
var languages = "";
var accesshours = "";
var testset_assignments = "";
var activities = "";
*/

var Nuggets = function (){
	//Set "this" to point to top
	var that = this;
	
	//Set render function
	this.render = function(data){
		$(".total > span").html(data.total_items);
		$(".new > span").html(data.new_items);
		$.each(data.nuggets, function(){
			if (this.metatags) {
			var tags = this.metatags.split("|");
			var destination = tags[1];
			}
			console.log(tags+" - "+destination);
			//clone nugget list item
			var nuggetItem = $("#tmpl_nugget").clone();
			
			//fill in with data
			nuggetItem.find("h3").html(this.name);
			nuggetItem.find(".thumb").attr("src","img/thumbNugget.png");
			nuggetItem.find(".status").text("Status: "+this.status);
			nuggetItem.find(".duration").text("Duration: "+this.duration+" mins");
			nuggetItem.find(".nugget").attr("rel", this.type);
			nuggetItem.find("a").attr("href", "cellcast://nugget/"+this.id+"/true");
			
			//append to page
			//nuggetItem.children().appendTo("#nuggetList");
			if(destination == "Continued Learning"){
				nuggetItem.children().appendTo("#continued_learning");
			}
			if(destination == "Build: Influence Management"){
				nuggetItem.children().appendTo("#build_influence_management");
			}
			if(destination == "MDP Training"){
				nuggetItem.children().appendTo("#mdp_training");
			}
			if(destination == "NSM Training"){
				nuggetItem.children().appendTo("#nsm_training");
			}
			if(destination == "Product Launches"){
				nuggetItem.children().appendTo("#product_launches");
			}
			
		});
	};
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = function(){
		//console.log("JSON Path: "+jsonpath+"nuggets_assignments.json");
		$.ajax({
			url: jsonpath+"nugget_assignments.json",
			//url: "nugget_assignments.json",
			beforeSend: function (xhr, settings){
				console.log("ReadyState: "+xhr.readyState);
			},
			dataType: 'json',
			success: function(data){
				console.log(data);
				//var data = $.parseJSON(data);
				console.log("parsed: "+data);
				that.render(data);
			},
			error: function (xhr, ajaxOptions, thrownError){
            	console.log('xhr.status: '+xhr.status);
              console.log('thrownError: '+thrownError);
            }    
		});
	};
}

var Assessments = function (){
	//Set "this" to point to top
	var that = this;
	
	//Set render function
	this.render = function(data){
		$(".total > span").html(data.total_items);
		$(".new > span").html(data.new_items);
		$.each(data, function(){
			//Split Meta tags into an array and save the first one(always category) as a variable
			if (this.metatags) {
			var tags = this.metatags.split("|");
			var destination = tags[1];
			}
			
			//clone nugget list item
			var assessmentItem = $("#tmpl_assessment").clone();
			
			//fill in with data
			assessmentItem.find("h3").html(this.name);
			assessmentItem.find(".thumb").attr("src","img/thumbTestset.png");
			assessmentItem.find(".status").text("Status: "+this.status);
			assessmentItem.find(".duration").text("Duration: "+this.duration+" mins");
			assessmentItem.find(".assessment").attr("rel", this.id);
			assessmentItem.find("a").attr("href", "cellcast://assessment/"+this.id+"/true");
			
			//append to page
			//assessmentItem.children().appendTo("#assessmentList");
			if(destination == "Continued Learning"){
				assessmentItem.children().appendTo("#continued_learning");
			}
			if(destination == "Build: Influence Management"){
				assessmentItem.children().appendTo("#build_influence_management");
			}
			if(destination == "MDP Training"){
				assessmentItem.children().appendTo("#mdp_training");
			}
			if(destination == "NSM Training"){
				assessmentItem.children().appendTo("#nsm_training");
			}
			if(destination == "Product Launches"){
				assessmentItem.children().appendTo("#product_launches");
			}
		});
	};
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = function(){
		//console.log("JSON Path: "+jsonpath+"nuggets_assignments.json");
		$.ajax({
			url: jsonpath+"assessments.json",
			//url: "assessments.json",
			beforeSend: function (xhr, settings){
				console.log("ReadyState: "+xhr.readyState);
			},
			dataType: 'json',
			success: function(data){
				console.log(data);
				//var data = $.parseJSON(data);
				console.log("parsed: "+data);
				that.render(data);
			},
			error: function (xhr, ajaxOptions, thrownError){
            	console.log('xhr.status: '+xhr.status);
              console.log('thrownError: '+thrownError);
            }    
		});
	};
}


var Courses = function (){
	//Set "this" to point to top
	var that = this;
	
	//Set render function
	this.render = function(data){
		$.each(data.courses, function(){
			
			//Split Meta tags into an array and save the first one(always category) as a variable
			if (this.metatags) {
			var tags = this.metatags.split("|");
			var destination = tags[1];
			}
			
			//clone nugget list item
			var courseItem = $("#tmpl_course").clone();
			
			//fill in with data
			courseItem.find("h3").html(this.name);
			courseItem.find(".thumb").attr("src","img/thumbCourse.png");
			courseItem.find(".status").text("Status: "+this.status);
			courseItem.find(".duration").text("Duration: "+this.duration+" mins");
			courseItem.find(".course").attr("rel", this.id);
			courseItem.find("a").attr("href", "cellcast://course/"+this.id+"/true");
			
			//append to page
			//courseItem.children().appendTo("#courseList");
			if(destination == "Continued Learning"){
				courseItem.children().appendTo("#continued_learning");
			}
			if(destination == "Build: Influence Management"){
				courseItem.children().appendTo("#build_influence_management");
			}
			if(destination == "MDP Training"){
				courseItem.children().appendTo("#mdp_training");
			}
			if(destination == "NSM Training"){
				courseItem.children().appendTo("#nsm_training");
			}
			if(destination == "Product Launches"){
				courseItem.children().appendTo("#product_launches");
			}
		});
	};
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = function(){
		console.log("Getting Courses");
		$.ajax({
			url: jsonpath+"course_assignments.json",
			//url: "course_assignments.json",
			beforeSend: function (xhr, settings){
				console.log("ReadyState: "+xhr.readyState);
			},
			dataType: 'json',
			success: function(data){
				//console.log($.parseJSON(data));
				//var data = $.parseJSON(data);
				console.log("Courses Successful");
				that.render(data);
			},
			error: function (xhr, ajaxOptions, thrownError){
            	console.log('xhr.status: '+xhr.status);
              console.log('thrownError: '+thrownError);
            }    
		});
	};
}


var Skillprofiles = function (){
	//Set "this" to point to top
	var that = this;
	
	//Set render function
	this.render = function(data){
		$.each(data, function(){
			//Split Meta tags into an array and save the first one(always category) as a variable
			if (this.metatags) {
			var tags = this.metatags.split("|");
			var destination = tags[1];
			}

			//clone nugget list item 
			var skillItem = $("#tmpl_skill").clone();
			
			//fill in with data
			skillItem.find("h3").html(this.name);
			skillItem.find(".thumb").attr("src","img/thumbSkill.png");
			skillItem.find(".status").text("Status: "+this.status);
			skillItem.find(".duration").text("Duration: "+this.duration+" mins");
			skillItem.find(".skillprofile").attr("rel", this.id);
			skillItem.find("a").attr("href", "cellcast://skillprofile/"+this.id+"/false");
			
			//append to page
			//skillItem.children().appendTo("#skillprofileList");
			if(destination == "Continued Learning"){
				skillItem.children().appendTo("#continued_learning");
			}
			if(destination == "Build: Influence Management"){
				skillItem.children().appendTo("#build_influence_management");
			}
			if(destination == "MDP Training"){
				skillItem.children().appendTo("#mdp_training");
			}
			if(destination == "NSM Training"){
				skillItem.children().appendTo("#nsm_training");
			}
			if(destination == "Product Launches"){
				skillItem.children().appendTo("#product_launches");
			}
		});	
	};
	
	//Set refresh method
	this.refresh = function(){
		that.get();
	}
	
	//Set get method
	this.get = function(){
		//console.log("JSON Path: "+jsonpath+"skillprofiles.json");
		$.ajax({
			url: jsonpath+"skillprofiles.json",
			//url: "skillprofiles.json",
			beforeSend: function (xhr, settings){
				console.log("ReadyState: "+xhr.readyState);
			},
			dataType: 'json',
			success: function(data){
				console.log(data);
				//var data = $.parseJSON(data);
				console.log("parsed: "+data);
				that.render(data.skillprofiles);
			},
			error: function (xhr, ajaxOptions, thrownError){
            	console.log('xhr.status: '+xhr.status);
                console.log('thrownError: '+thrownError);
            }    
		});
	};
	
}




function init(){
	 console.log("init function started");
	 console.log("JSON path: "+jsonpath+" | image path: "+imgpath+" | Platform: "+platform);
	
	var nuggets = new Nuggets();
	nuggets.get();

	var skillprofiles = new Skillprofiles();
	skillprofiles.get();
	
	var assessments = new Assessments();
	assessments.get();
	
	var courses = new Courses();
	courses.get();

}
