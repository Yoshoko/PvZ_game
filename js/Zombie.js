Zombie = function(line, options) {
    var levelOffset = Plants.levelOffset;
    options = options || {};

    this.line = line;
    this.x = options['x'] || 600;
    this.y = line * 60 + levelOffset + 60 * 2 / 3;
    this.w = 90;
    this.h = 90;

    this.health = options['health'] || 100;
    this.damage = options['damage'] || 40;
    this.attackSpeed = options['attackSpeed'] || 3000;
    this.lastAttack = 0;
    this.lastMove = 0;
    this.moveInt = 50;

    this.isWalking = false;
    this.lastStepTime = 0;
    this.lastStepStarted = 0;

    if (typeof options['stepsDelay'] !== 'undefined') {
        this.stepsDelay = options['stepsDelay'];
    } else {
        this.stepsDelay = 1000;
    }

    this.stepDuration = options['stepDuration'] || 2000;
    this.speed = options['speed'] || 1;

    // Charger l'image du zombie
    this.image = $('img-zombie');
}


Zombie.prototype.update = function() {
    var t = new Date().getTime();

    if (!this.isAttacking) {
        if (!this.isWalking && t - this.stepsDelay > this.lastStepTime) {
            this.isWalking = true;
            this.lastStepStarted = t;
        }

        if (this.isWalking) {
            if (t - this.stepDuration > this.lastStepStarted) {
                this.isWalking = false;
                this.lastStepTime = t;
            } else {
                if (t - this.lastMove > this.moveInt) {
                    this.x -= this.speed;
                    this.lastMove = t;
                    this.nextCell = parseInt(this.x / 60) - 1;

                    // Vérifie si le zombie atteint la gauche du canvas
                    if (this.x <= 0) {
                        Plants.triggerGameOver(); // Déclenche la défaite
                    }

                    var checkPlant;
                    if (Plants.plants[this.line][this.nextCell]) {
                        checkPlant = Plants.plants[this.line][this.nextCell];
                    }

                    if (checkPlant) {
                        if (this.x - this.w / 2 < (this.nextCell + 1) * 60) {
                            this.enemy = checkPlant;
                            this.isAttacking = true;
                            this.x = (this.nextCell + 1) * 60 + this.w / 2;
                        }
                    }
                }
            }
        }
    } else {
        if (this.enemy.isAlive) {
            if (t - this.attackSpeed > this.lastAttack) {
                this.enemy.setDamage(this.damage);
                this.lastAttack = t;
            }
        } else {
            this.isAttacking = false;
            this.enemy = null;
        }
    }

    if (this.isDamaged) {
        if (t - 250 > this.damageTime) {
            if (this.health > 0) {
                this.isDamaged = false;
            } else {
                this.die();
            }
        }
    }
}


Zombie.prototype.draw = function() {
    // Dessine l'image du zombie
    cxt.drawImage(this.image, this.x - this.w / 2, this.y - this.h, this.w, this.h);

    // Affiche la santé du zombie au-dessus
    cxt.font = '16px Arial';
    cxt.fillStyle = '#fff';
    cxt.fillText(this.health, this.x - 10, this.y - 20);
}


Zombie.prototype.setDamage = function(damage) {
	this.health -= damage;
	this.isDamaged = true;
	this.damageTime = new Date().getTime();
}

Zombie.prototype.die = function(damage) {
	var newZombies = [];
	var zombiesLeftOnLine = false;
	for( var i = 0; i < Plants.zombies.length; i++ ) {
		if( Plants.zombies[i] !== this) {
			newZombies.push(Plants.zombies[i]);
			if( Plants.zombies[i].line == this.line ) {
				zombiesLeftOnLine = true;
			}
		}
	}
	Plants.zombies = newZombies;

	Plants.zombedLines[this.line] = zombiesLeftOnLine;
	
	delete this;

}

PlantsVsZombies.prototype.triggerGameOver = function() {
    this.isPaused = true; // Arrête le jeu

    // Afficher le message de défaite
    cxt.save();
    cxt.globalAlpha = 0.7;
    cxt.fillStyle = '#333';
    cxt.fillRect(0, 0, this.width, this.height);

    cxt.globalAlpha = 1;
    cxt.fillStyle = '#fff';
    cxt.font = '40px Impact';
    var text = 'GAME OVER';
    cxt.fillText(text, this.width / 2 - cxt.measureText(text).width / 2, this.height / 2 + 20);
    cxt.restore();

    // Stop the game loop by stopping the animation
    cancelAnimationFrame(this.animationFrameId);
}
