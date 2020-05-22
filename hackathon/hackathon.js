var arrow1;
var arrow2;


window.onload = function() {

	arrow1 = document.getElementById('arrow1');
	arrow2 = document.getElementById('arrow2');

	rotatePeriod();
}

function rotateArrows() {
	arrow1.style.transform = 'rotate(' + ((Math.random() * 100) - 50) + 'deg)';
	arrow2.style.transform = 'rotate(' + ((Math.random() * 100) + 300) + 'deg)';
}

function rotatePeriod() {
	setTimeout(function() {
		rotateArrows();
		rotatePeriod();
	}, (Math.random() * 10000) + 15000);
}