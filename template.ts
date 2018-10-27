const container = document.querySelector('.container')!;

const createCard = (
	event: Api.Event,
	templateSelector: string,
	descriptionSelector: string,
	corpusSelector: string
): DocumentFragment => {
	let content = document.querySelector<HTMLTemplateElement>(templateSelector)!
		.content;
	let card = document.importNode(content, true);
	card.querySelector('.title')!.textContent = event.title;
	if (event.source) {
		card.querySelector('#source')!.textContent = event.source;
	}
	card.querySelector('#time')!.textContent = event.time;
	if (event.icon) {
		card.querySelector<HTMLImageElement>('.icons')!.src = `assets/${
			event.icon
		}.svg`;
	}
	if (event.description) {
		card.querySelector(descriptionSelector)!.textContent =
			event.description;
	} else {
		card.querySelector<HTMLElement>(corpusSelector)!.style.display = 'none';
	}
	return card;
};

const appendSmallCard = (event: Api.Event): void => {
	let card = createCard(
		event,
		'#template-card-s',
		'.description_size-s',
		'.card_bottom'
	);
	container.appendChild(card);
};

const appendMiddleCardThermal = (event: Api.Event) : void => {
	let card = createCard(
		event,
		'#template-card-m-thermal',
		'.description_size-m',
		'.card_bottom'
	);
	if (event.data) {
		const data = event.data as Api.ThermalData;
		card.querySelector('.left_flex > .exact_data')!.textContent = `${
			data.temperature
		} C`;
		card.querySelector('.right_flex > .exact_data')!.textContent = `${
			data.humidity
		} %`;
	}
	container.appendChild(card);
};

const appendMiddleCardFridge = (event: Api.Event) : void => {
	let card = createCard(
		event,
		'#template-card-m-fridge',
		'.description_size-m',
		'.card_bottom'
	);
	if (event.data) {
		const data = event.data as Api.FridgeData;
		card.querySelector('.button-yes > .choice')!.textContent = `${
			data.buttons[0]
		}`;
		card.querySelector('.button-no > .choice')!.textContent = `${
			data.buttons[1]
		}`;
	}
	container.appendChild(card);
};

const appendMiddleCardMusic = (event: Api.Event): void  => {
	let card = createCard(
		event,
		'#template-card-m-music',
		'.description_size-m',
		'.card_bottom'
	);
	if (event.data) {
		const data = event.data as Api.MusicData;
		card.querySelector('.name_of_the_song')!.textContent = `${
			data.artist
		} - ${data.track.name}`;
		card.querySelector('.range_and_time > .details')!.textContent = `${
			data.track.length
		}`;
		card.querySelector('.control_panel > .details')!.textContent = `${
			data.volume
		} %`;
	}
	container.appendChild(card);
};

const appendMiddleCardAc = (event: Api.Event): void  => {
	let card = createCard(
		event,
		'#template-card-m-ac',
		'.description',
		'.card_bottom'
	);
	container.appendChild(card);
};

const appendLargeCardCam = (event: Api.Event): void => {
	let card = createCard(
		event,
		'#template-card-l-cam',
		'.description',
		'.corpus'
	);
	container.appendChild(card);
};

const appendLargeCardStats = (event: Api.Event): void  => {
	let card = createCard(
		event,
		'#template-card-l-stats',
		'.description_size-l',
		'.corpus'
	);
	container.appendChild(card);
};

namespace Api {
	export interface Event {
		type: string;
		title: string;
		time: string;
		description: string | null;
		icon: string;
		size: string;
		source: string | null;
		data: Object | null;
	}

	export interface ThermalData {
		temperature: number;
		humidity: number;
	}

	export interface FridgeData {
		buttons: Array<string>;
	}

	export interface MusicData {
		albumcover: string;
		artist: string;
		track: MusicTrackData;
		volume: number;
	}

	export interface MusicTrackData {
		name: string;
		length: string;
	}

	export interface CamData {
		image: string;
	}

	export interface Data {
		events: Array<Event>;
	}
}

function addEvents(data: Api.Data): void  {
	data.events.forEach(event => {
		if (event.size === 's') {
			appendSmallCard(event);
		} else if (event.size === 'm') {
			if (event.icon === 'thermal') {
				appendMiddleCardThermal(event);
			} else if (event.icon === 'fridge') {
				appendMiddleCardFridge(event);
			} else if (event.icon === 'music') {
				appendMiddleCardMusic(event);
			} else if (event.icon === 'ac') {
				appendMiddleCardAc(event);
			}
		}
		if (event.size === 'l') {
			if (event.icon === 'cam') {
				appendLargeCardCam(event);
			} else if (event.icon === 'stats') {
				appendLargeCardStats(event);
			}
		}
	});
}

fetch('./events.json')
	.then(response => response.json())
	.then((data: Api.Data) => addEvents(data));
