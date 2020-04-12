function unique(names, passwords)
{
    let arr = [];
    for(var i in names)
    {
	for(var j in passwords)
	{
	    let obj = {name: names[i], password: passwords[i]}
	    arr.push(obj);
	}
    }

    return arr;
}

function add_sub(animals) {
    
}
