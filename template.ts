const container = document.querySelector('.container')!;

const appendSmallCard = (event: Api.Event) => {
	let content = document.querySelector<HTMLTemplateElement>(
		'#template-card-s'
	)!.content;
	let card = document.importNode(content, true);
	card.querySelector('.title')!.textContent = event.title;
	card.querySelector('.devices')!.textContent = event.source;
	card.querySelector('.time')!.textContent = event.time;
	card.querySelector<HTMLImageElement>('.icons')!.src = `assets/${
		event.icon
	}.svg`;
	if (event.description) {
		card.querySelector('.description_size-s')!.textContent =
			event.description;
	} else {
		card.querySelector<HTMLElement>('.card_bottom')!.style.display = 'none';
	}
	container.appendChild(card);
};

const appendMiddleCardThermal = (event: Api.Event) => {
    let content = document.querySelector<HTMLTemplateElement>('#template-card-m-thermal')!.content;
    let card = document.importNode(content, true);
	card.querySelector('.title')!.textContent = event.title;
	card.querySelector('.card-source')!.textContent = event.source;
	card.querySelector('.card-time')!.textContent = event.time;
	card.querySelector<HTMLImageElement>('.icons')!.src = `assets/${
		event.icon
		}.svg`;
	if (event.description) {
		card.querySelector('.description_size-m')!.textContent = event.description;
	} else {
		card.querySelector<HTMLElement>('.card_bottom')!.style.display = 'none';
	}
    if (event.data) {
		const data = event.data as Api.ThermalData;
		card.querySelector('.left_flex > .exact_data')!.textContent = `${data.temperature} C`;
		card.querySelector('.right_flex > .exact_data')!.textContent = `${data.humidity} %`;
    }
    container.appendChild(card);
};

const appendMiddleCardFridge = (event: Api.Event) => {
	let content = document.querySelector<HTMLTemplateElement>('#template-card-m-fridge')!.content;
	let card = document.importNode(content, true);
	card.querySelector('.title')!.textContent = event.title;
	card.querySelector('.card-source')!.textContent = event.source;
	card.querySelector('.card-time')!.textContent = event.time;
	card.querySelector<HTMLImageElement>('.icons')!.src = `assets/${
		event.icon
		}.svg`;
	if (event.description) {
		card.querySelector('.description_size-m')!.textContent = event.description;
	} else {
		card.querySelector<HTMLElement>('.card_bottom')!.style.display = 'none';
	}
	if (event.data) {
		const data = event.data as Api.FridgeData;
		card.querySelector('.button-yes > .choice')!.textContent = `${data.buttons[0]}`;
		card.querySelector('.button-no > .choice')!.textContent = `${data.buttons[1]}`;
	}
	container.appendChild(card);
};

const appendMiddleCardMusic = (event: Api.Event) => {
	let content = document.querySelector<HTMLTemplateElement>(
		'#template-card-m-music'
	)!.content;
	let card = document.importNode(content, true);
	card.querySelector('.title')!.textContent = event.title;
	card.querySelector('.card-source')!.textContent = event.source;
	card.querySelector('.card-time')!.textContent = event.time;
	card.querySelector<HTMLImageElement>('.icons')!.src = `assets/${
		event.icon
	}.svg`;
	if (event.description) {
		card.querySelector('.description_size-m')!.textContent =
			event.description;
	} else {
		card.querySelector<HTMLElement>('.card_bottom')!.style.display = 'none';
	}
	if (event.data) {
		const data = event.data as Api.MusicData;
		card.querySelector('.name_of_the_song')!.textContent = `${data.artist} - ${data.track.name}`;
		card.querySelector('.range_and_time > .details')!.textContent = `${data.track.length}`;
		card.querySelector('.control_panel > .details')!.textContent = `${data.volume} %`;
	}
	container.appendChild(card);
};

const appendMiddleCardAc = (event: Api.Event) => {
	let content = document.querySelector<HTMLTemplateElement>(
		'#template-card-m-ac'
	)!.content;
	let card = document.importNode(content, true);
	card.querySelector('.title')!.textContent = event.title;
	card.querySelector('.card-source')!.textContent = event.source;
	card.querySelector('.card-time')!.textContent = event.time;
	card.querySelector<HTMLImageElement>('.icons')!.src = `assets/${
		event.icon
		}.svg`;
	if (event.description) {
		card.querySelector('.description')!.textContent = event.description;
	} else {
		card.querySelector<HTMLElement>('.card_bottom')!.style.display = 'none';
	}
	container.appendChild(card);
};

const appendLargeCardCam = (event: Api.Event) => {
	let content = document.querySelector<HTMLTemplateElement>(
		'#template-card-l-cam'
	)!.content;
	let card = document.importNode(content, true);
	container.appendChild(card);
	card.querySelector('.title')!.textContent = event.title;
	card.querySelector('.card-source')!.textContent = event.source;
	card.querySelector('.card-time')!.textContent = event.time;
	if (event.description) {
		card.querySelector('.description')!.textContent = event.description;
	} else {
		card.querySelector<HTMLElement>('.corpus')!.style.display = 'none';
	}
};

const appendLargeCardStats = (event: Api.Event) => {
	let content = document.querySelector<HTMLTemplateElement>(
		'#template-card-l-stats'
	)!.content;
	let card = document.importNode(content, true);
	card.querySelector('.title')!.textContent = event.title;
	card.querySelector('.card-source')!.textContent = event.source;
	card.querySelector('.card-time')!.textContent = event.time;
	card.querySelector<HTMLImageElement>('.icons')!.src = `assets/${
		event.icon
		}.svg`;
	if (event.description) {
		card.querySelector('.description_size-l')!.textContent = event.description;
	} else {
		card.querySelector<HTMLElement>('.corpus')!.style.display = 'none';
	}
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

function addEvents(data: Api.Data) {
	data.events.forEach(event => {
		if (event.size === 's') {
			appendSmallCard(event);
        }
        else if(event.size === 'm') {
            if(event.icon === 'thermal') {
                appendMiddleCardThermal(event);
			}
			else if(event.icon === 'fridge') {
				appendMiddleCardFridge(event);
			}
			else if (event.icon === 'music') {
				appendMiddleCardMusic(event);
			}
			else if (event.icon === 'ac') {
				appendMiddleCardAc(event);
			}
		}
		if(event.size === 'l') {
			if(event.icon === 'cam') {
				appendLargeCardCam(event);
			}
			else if(event.icon === 'stats') {
				appendLargeCardStats(event);
			}
		}
	});
}

fetch('./events.json')
	.then(response => response.json())
	.then((data: Api.Data) => addEvents(data));
