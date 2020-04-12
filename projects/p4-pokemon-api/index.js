var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var pokeDataUtil = require("./poke-data-util");
var _ = require("underscore");
var app = express();

var PORT = 3000;

// Restore original data into poke.json.
pokeDataUtil.restoreOriginalData();

// Load contents of poke.json into global variable. 
var _DATA = pokeDataUtil.loadData().pokemon;

/// Setup body-parser.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
    var contents = "";
    
    _.each(_DATA, function(poke) {
        contents += `<tr><td>${poke.id}</td><td><a href="/pokemon/${poke.id}">${poke.name}</a></td></tr>\n`;
    });
    
    var html = `<html>\n<body>\n<table>${contents}</table>\n</body>\n</html>`;
    
    res.send(html);
});

app.get("/pokemon/:pokemon_id", function(req, res) {
    var id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, {id: id});
    var contents = ""

    if(!result) return res.send("Error: Pokemon not found");
    
    _.each(Object.entries(result), function(ele) {
	contents += `<tr><td>${ele[0]}</td><td>${JSON.stringify(ele[1])}</td></tr>\n`;
    });

    var html = `<html>\n<body>\n<table>${contents}</table>\n</body>\n</html>`;
    
    res.send(html);
});

app.get("/pokemon/image/:pokemon_id", function(req, res) {
    var id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, {id: id});

    if(!result) return res.send("Error: Pokemon not found");

    var contents = `<img src=${result.img} alt=${result.name}>`;
    
    var html = `<html>\n<body>\n${contents}\n</body>\n</html>`;
    
    res.send(html);
});

app.get("/api/id/:pokemon_id", function(req, res) {
    var id = parseInt(req.params.pokemon_id);
    var result = _.findWhere(_DATA, {id: id});
    
    if (!result) return res.json({});
    
    res.json(result);
});

app.get("/api/evochain/:pokemon_name", function(req, res) {
    var name = req.params.pokemon_name;
    var result = _.findWhere(_DATA, {name: name});
    var chain = [];
    
    if(!result) return res.json([]);
    
    chain.push(name);
    
    _.each(result.prev_evolution, function(evo) {
	chain.unshift(evo.name);
    });
    
    _.each(result.next_evolution, function(evo) {
	chain.push(evo.name);
    });
    
    res.json(chain);
});

app.get("/api/type/:type", function(req, res) {
    var type = req.params.type;
    var pokes = [];
    
    var filtered = _.filter(_DATA, function(poke) {
	if(poke.type.includes(type))
	    return true;
	else
	    return false;
    });
    
    var extract = _.each(filtered, function(poke){
	pokes.push(poke.name);
    });
    
    res.json(pokes);
});

app.get("/api/type/:type/heaviest", function(req, res) {
    var type = req.params.type;
    var pokes = [];
    
    var filtered = _.filter(_DATA, function(poke) {
	if(poke.type.includes(type))
	    return true;
	else
	    return false;
    });

    var tmp = 0.0
    var heaviest = {}
    
    _.each(filtered, function(poke) {
	if(tmp < parseFloat(poke.weight)) {
	    tmp = parseFloat(poke.weight);
	    heaviest = {name: poke.name, weight: tmp};
	}
    });
    
    res.json(heaviest);
});

app.post("/api/weakness/:pokemon_name/add/:weakness_name", function(req, res) {
    var name = req.params.pokemon_name;
    var weakness = req.params.weakness_name;
    var to_return = {};
    
    _DATA = _.map(_DATA, function(poke) {
	if(poke.name == name) {
	    if(!poke.weaknesses.includes(weakness))
		poke.weaknesses.push(weakness);
	    
	    to_return = {name: poke.name, weaknesses: poke.weaknesses};
	}

	return poke;
    });
    
    pokeDataUtil.saveData(_DATA);
    
    res.json(to_return);
});

app.delete("/api/weakness/:pokemon_name/remove/:weakness_name", function(req, res) {
    var name = req.params.pokemon_name;
    var weakness = req.params.weakness_name;
    var to_return = {};
    
    _DATA = _.map(_DATA, function(poke) {
	if(poke.name == name) {
	    weak_list = [];
	    
	    _.each(poke.weaknesses, function(weak) {
		if(weak != weakness)
		    weak_list.push(weak);
	    });

	    poke.weaknesses = weak_list;
	    to_return = {name: poke.name, weaknesses: weak_list};
	}

	return poke;
    });
    
    pokeDataUtil.saveData(_DATA);
    
    res.json(to_return);
});


// Start listening on port PORT
app.listen(PORT, function() {
    console.log('Server listening on port:', PORT);
});

// DO NOT REMOVE (for testing purposes)
exports.PORT = PORT
