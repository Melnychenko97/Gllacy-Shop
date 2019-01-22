class Slider {
	constructor (items, nav, background, delay) {
		this.items = items;
		this.nav = nav;
		this.delay = delay;
		this.bg = background;
	}

	get carouselInit () {
		const itemsList = this.items;
		const navList = this.nav;
		const bg = this.bg;
		const time = this.delay;
		let itemPositionCounter = 0;
		const FIRST_ITEM = 0;
		const LAST_ITEM = 2;

		navList.forEach((item, index) => {
			item.addEventListener('click',() => {
				itemsList[itemPositionCounter].classList.remove('visible');
		        itemsList[itemPositionCounter].classList.add('unvisible');
		        itemsList[index].classList.remove('unvisible');
		        itemsList[index].classList.add('visible');

		        navList[itemPositionCounter].classList.remove('visible');
		        navList[itemPositionCounter].classList.add('unvisible');
		        navList[index].classList.remove('unvisible');
		        navList[index].classList.add('visible');

		        bg.classList.remove(`bg-${itemPositionCounter}`);
			    bg.classList.add(`bg-${index}`);
				itemPositionCounter = index;
			});
		});

		setInterval( () => {
			if (itemPositionCounter === LAST_ITEM) {
		        itemsList[itemPositionCounter].classList.remove('visible');
		        itemsList[itemPositionCounter].classList.add('unvisible');

		        navList[itemPositionCounter].classList.remove('visible');
		        navList[itemPositionCounter].classList.add('unvisible');

		        itemsList[FIRST_ITEM].classList.remove('unvisible');
		        itemsList[FIRST_ITEM].classList.add('visible');

		        navList[FIRST_ITEM].classList.remove('unvisible');
		        navList[FIRST_ITEM].classList.add('visible');

		        bg.classList.remove(`bg-${itemPositionCounter}`);
			    bg.classList.add(`bg-0`);

		        itemPositionCounter = FIRST_ITEM;
		    } else {
			    itemsList[itemPositionCounter].classList.remove('visible');
			    itemsList[itemPositionCounter].classList.add('unvisible');

			    navList[itemPositionCounter].classList.remove('visible');
			    navList[itemPositionCounter].classList.add('unvisible');

			    itemsList[itemPositionCounter].nextElementSibling.classList.remove('unvisible');
			    itemsList[itemPositionCounter].nextElementSibling.classList.add('visible');

			    navList[itemPositionCounter].nextElementSibling.classList.remove('unvisible');
			    navList[itemPositionCounter].nextElementSibling.classList.add('visible');

			    bg.classList.remove(`bg-${itemPositionCounter}`);
			    bg.classList.add(`bg-${itemPositionCounter + 1}`);

			    itemPositionCounter++;
		    }
		}, time)
	}
}

const carouselsItems = document.querySelectorAll('.carousel__item');
const background = document.querySelector('body');
const nav = document.querySelectorAll('.nav__item');

const carousel = new Slider(carouselsItems, nav, background, 5000);
carousel.carouselInit;

class HiddenAreas {

	constructor(items, position) {
		this.items = items;
		this.position = position;
	}
	get onTrigger() {
		const position = this.position;
		this.items.forEach(item => item.addEventListener('mouseover', function() {
			this.children[position].classList.add('able');
		}));
	}

	get outTrigger() {
		const position = this.position;
		this.items.forEach(item => item.addEventListener('mouseout', function() {
			this.children[position].classList.remove('able');
		}));
	}
	get iconChange() {
		this.items.forEach(item => item.addEventListener('mouseover', function() {
			this.children[1].classList.remove('active');
			this.children[2].classList.add('active');
		}));
		this.items.forEach(item => item.addEventListener('mouseout', function() {
			this.children[1].classList.add('active');
			this.children[2].classList.remove('active');
		}));
	}
}
const navItems = document.querySelectorAll('.nav__list-item');
const navItemsAnimation = new HiddenAreas(navItems, 0, );

navItemsAnimation.onTrigger;
navItemsAnimation.outTrigger;

const logIn = document.querySelectorAll('.form__list-item');
const logInAnimation = new HiddenAreas(logIn, 0);

logInAnimation.onTrigger;
logInAnimation.outTrigger;
logInAnimation.iconChange;

const hitsItems = document.querySelectorAll('.hits__item');
const buttonAnimation = new HiddenAreas(hitsItems, 2);

buttonAnimation.onTrigger;
buttonAnimation.outTrigger;

class BasketFunctionality {

	constructor(buttons, listItems, total) {
		this.buttons = buttons;
		this.listItems = listItems;
		this.total = total;
	}
	get enableButton() {

		const triggers = this.buttons;
		const tasks = this.listItems;
		const result = this.total;

		triggers.forEach((item, index) => {

			item.addEventListener('click', () => {

				if(tasks[index].classList.contains('added')) {
					const orderInfo = tasks[index].children[3];
					const orderWeight = orderInfo.children[0];
					orderWeight.innerText = parseInt(orderWeight.innerText) + 1 + 'кг x';

					const orderPrice = +parseInt(orderInfo.children[1].innerText);
					const totalOrderPrice = +parseInt(orderInfo.nextElementSibling.innerText);
					orderInfo.nextElementSibling.innerText = totalOrderPrice + orderPrice + ' руб.';

					result.innerText = parseInt(result.innerText) + orderPrice + ' руб.';

				} else {
					tasks[index].classList.add('added');
					const price = parseInt(tasks[index].children[4].innerText);
					result.innerText = parseInt(result.innerText) + price + ' руб.';
				}
				const basketLabel = tasks[0].parentElement.parentElement.parentElement;
				const basketTitle =  basketLabel.children[3];

				if (parseInt(basketTitle.innerText)) {
					const newCount = parseInt(basketTitle.innerText) + 1;
					const unitsNum = newCount % 100;
					const tensNum = newCount % 10;

					if ( ( unitsNum >= 11 && unitsNum <= 14 )||( tensNum > 4 && tensNum <= 9)||( tensNum == 0 ) ) { 
						basketTitle.innerText = newCount + ` товаров`;
					} else if ( tensNum >= 2 && tensNum <= 4) { 
						basketTitle.innerText = newCount + ` товара`;
					}
				} else {
					basketTitle.innerText = `1 товар`;
				}

				const list = this.listItems[0].parentElement;
				const basketTable = list.parentElement;
				const waresCount = parseInt(basketTable.parentElement.innerText);
				
				if (waresCount) {
					basketTable.parentElement.addEventListener('mouseover', () => {
						basketTable.classList.add('activatos');
						// basketTable.classList.remove('able');
					});
					basketTable.parentElement.addEventListener('mouseout', () => {
						basketTable.classList.remove('activatos');
					});
				}
			});
		});
	}

	get enableClose() {

		const totalSum = this.total;

		this.listItems.forEach((item, index) => {
			item.children[0].addEventListener('click', (event) => {

				const currentItemSum = parseInt(item.lastElementChild.innerText);
				const totalCurrentSum = +parseInt(totalSum.innerText) - +currentItemSum;
				totalSum.innerText = `${totalCurrentSum} руб.`;
				item.children[3].children[0].innerText = 1 + 'кг x'
				item.lastElementChild.innerText = item.children[3].children[1].innerText;
				item.classList.remove('added');
			});
		});
	}

	get basketVisibility() {

			const list = this.listItems[0].parentElement;
			const basketTable = list.parentElement;
			const waresCount = parseInt(basketTable.parentElement.innerText);

			if (waresCount) {
				basketTable.parentElement.addEventListener('mouseover', () => {
					basketTable.classList.add('activatos');
				});
				basketTable.parentElement.addEventListener('mouseout', () => {
					basketTable.classList.remove('activatos');
				});
			}
	}
}

const form = document.querySelector('.header__form');

form.addEventListener('submit', (e) =>{
	e.preventDefault();
})

const busket = document.querySelectorAll('.form__basket');
const addToBusket = document.querySelectorAll('.hits__button');
const ListItems = document.querySelectorAll('.basket__list-item');
const basketResult = document.querySelector('.price');

const basket = new BasketFunctionality(addToBusket, ListItems, basketResult);
basket.enableButton;
basket.enableClose;
basket.basketVisibility;

