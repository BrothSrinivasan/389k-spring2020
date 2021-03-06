var states = ["Idaho", "South Dakota", "Hawaii", "Alaska", "Alabama", "New York"];

var abvMap = {
    "Alabama": "01",
    "Alaska": "02",
    "Arizona": "04",
    "Arkansas": "05",
    "California": "06",
    "Colorado": "08",
    "Connecticut": "09",
    "Delaware": "10",
    "District Of Columbia": "11",
    "Florida": "12",
    "Georgia": "13",
    "Hawaii": "15",
    "Idaho": "16",
    "Illinois": "17",
    "Indiana": "18",
    "Iowa": "19",
    "Kansas": "20",
    "Kentucky": "21",
    "Louisiana": "22",
    "Maine": "23",
    "Maryland": "24",
    "Massachusetts": "25",
    "Michigan": "26",
    "Minnesota": "27",
    "Mississippi": "28",
    "Missouri": "29",
    "Montana": "30",
    "Nebraska": "31",
    "Nevada": "32",
    "New Hampshire": "33",
    "New Jersey": "34",
    "New Mexico": "35",
    "New York": "36",
    "North Carolina": "37",
    "North Dakota": "38",
    "Ohio": "39",
    "Oklahoma": "40",
    "Oregon": "41",
    "Pennsylvania": "42",
    "Rhode Island": "44",
    "South Carolina": "45",
    "South Dakota": "46",
    "Tennessee": "47",
    "Texas": "48",
    "Utah": "49",
    "Vermont": "50",
    "Virginia": "51",
    "Washington": "53",
    "West Virginia": "54",
    "Wisconsin": "55",
    "Wyoming": "56",
}

var printed = []
var i = -2

$("#second_div").hide()

function button_click(e)
{
    $("#first_div").hide()
    $("#second_div").show()
    i = 20;
}

$("#state").on("keyup", function(e){
    var name = $("#state").val()
        
    $.each(states, function(k, v) {
	if(!printed.includes(k) && v.toUpperCase() == name.toUpperCase())
	{
	    if(printed.length == 0)
	    {
		$("#list").append("<h1>You Got</h1>")
	    }
	    
	    $("#list").append("<h2 class=\"answered\">" + v + "</h2>")
	    printed.push(k)
	}
    })
})

var clock = setInterval(function() {
    if(i >= 0)
    {
	$("#timer").text(i-- + " seconds")
    }

    if(printed.length == states.length)
    {
	clearInterval(clock)
	$("#state").prop("disabled", true)
	$("#timer").text("YOU WIN!!!")
    }
    else if(i == -1)
    {
	clearInterval(clock)
	$("#timer").text(Math.floor(printed.length / states.length * 100) + "% correct")
	$("#state").prop("disabled", true)
	$("#missed_list").append("<h1>You Missed</h1>")
	
	$.each(states, function(k, v) {	    
	    if(!printed.includes(k))
	    {
		$("#missed_list").append("<h2 class=\"answered\">" + v + "</h2>")
	    }
	})
    }
}, 1000)

$(".answered").on("mouseenter", "h2", function(e){
    var key = $(this).text()
    
    $.get("https://api.census.gov/data/2013/language?get=EST,LANLABEL,NAME&for=state:" + abvMap[key] +
	  "&LAN=625", function(data){
	      $("#state_spanish").text("State: " + key)
	      $("#number_spanish").text("Number of Spanish speakers: " +
					new Intl.NumberFormat('en-US').format(data[1][0]))
    })
})

$(".answered").on("mouseleave", "h2", function(e){
    $("#state_spanish").empty()
    $("#number_spanish").empty()
})
