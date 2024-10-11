PlantTallNut = function() {
    Plant.apply(this, arguments);
    this.color = '#333';
    this.price = 150;
    this.h = 75;
    this.health = 900;

    this.image = $('img-tallnut'); 
}
extend(PlantTallNut, Plant);

PlantTallNut.prototype.draw = function() {
    cxt.drawImage(this.image, this.x - this.w, this.y - 75, 80, 100);
}

PlantTallNut.prototype.update = function() {
	var t = new Date().getTime();
	this.checkDamage(t);
}
