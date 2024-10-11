PlantWallNut = function() {
    Plant.apply(this, arguments);
    this.color = '#666';
    this.price = 50;
    this.health = 400;

    this.image = $('img-wallnut'); // Charge l'image du WallNut
}
extend(PlantWallNut, Plant);

PlantWallNut.prototype.draw = function() {
    cxt.drawImage(this.image, this.x - this.w, this.y - 60, 80, 80);
}

PlantWallNut.prototype.update = function() {
	var t = new Date().getTime();
	this.checkDamage(t);
}
