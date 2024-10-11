
function rad( angle ) {
	var radians = (Math.PI / 180) * (angle - 90);
	return radians;
}


function $(id) {
	return document.getElementById(id);	
} 

function rand(){
	var from = 0,
	    to = 0;

	if( arguments.length == 1 ) {
		from = 0;
		to = arguments[0];
	} else {
		from = arguments[0];
		to = arguments[1];
	}

	return Math.floor( Math.random() * ( to - from + 1 ) + from );
}


function extend(Child, Parent) {
	var F = function() { }
	F.prototype = Parent.prototype
	Child.prototype = new F()
	Child.prototype.constructor = Child
	Child.superclass = Parent.prototype
}
