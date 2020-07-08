//просчёт завершённых занятий
var d = new Date(2019, 2, 5, 20, 0, 0);
var today = new Date();
var index = 0;
var cards = document.getElementsByClassName("card");
while (d <= today && index < cards.length) {
	cards[index].classList.add("card-done");
	index++;

	//переход по вторникам / четвергам
	if (index % 2) {
		d.setDate(d.getDate() + 2);
	}
	else {
		d.setDate(d.getDate() + 5);
	}
}
//если у нас есть активная карта (не все пройдены)
if (index < cards.length) {
	cards[index].classList.add("card-active");

	//прокрутка до активной карточки после загрузки страницы по клику,
	document.querySelector("#scrollto").addEventListener("click", function(){

		//длительность анимации и количество кадров
		animationTime = 200,
	    framesCount = 20;

	    // высчитываем координату Y = расстояние до активной карты + текущее положение
	    let coordY = cards[index].getBoundingClientRect().top + window.pageYOffset;

	    // считаем на сколько скроллить за 1 такт
	    let scrollBy = (coordY - window.pageYOffset) / framesCount;

	    // запускаем интервал, в котором будем скролить
	    let scroller = setInterval(function() {

		    // если к-во пикселей для скролла за 1 такт меньше расстояния до элемента
		    // и границы страницы не достигнуты
		    if(Math.abs(scrollBy) < Math.abs(window.pageYOffset - coordY) && window.innerHeight + window.pageYOffset + scrollBy <= document.body.offsetHeight && window.pageYOffset + scrollBy >= 0) {
		        // то скроллим на к-во пикселей, которое соответствует одному такту
		        window.scrollBy(0, scrollBy);
		    } else {
		        // иначе добираемся до элемента и выходим из интервала
		        window.scrollTo(0, coordY);
		        clearInterval(scroller);

		        //убираем кнопку через 200мс и выставляем появление по скролу страницы
				setTimeout(function(){
					document.querySelector("#scrollto").setAttribute("style", "display: none !important");
					window.addEventListener("scroll", showLabel);
				},200);
		    }
	    // время интервала равняется частному от времени анимации и к-ва кадров
	    }, animationTime / framesCount);
	});
}
else {
	//если же все карты пройдены, то просто убираем карту
	document.querySelector("#scrollto").setAttribute("style", "display: none !important");
}

//функция возврата кнопки при скроллинге
function showLabel(){
	document.querySelector("#scrollto").setAttribute("style", "display: flex !important");
	window.removeEventListener("scroll", showLabel);
};