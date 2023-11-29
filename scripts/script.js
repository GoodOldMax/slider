const entities = [
    {
        name: 'Rostov-on-Don, Admiral',
        description: {
            city: 'Rostov-on-Don LCD admiral',
            repairTime: '3.5 months',
            apartmentArea: '81 m2',
            repairCost: 'Upon request'
        },
        photo: 'url(images/rostov-on-don_admiral.png)'
    },
    {
        name: 'Sochi Thieves',
        description: {
            city: 'Sochi Thieves',
            repairTime: '4 months',
            apartmentArea: '105 m2',
            repairCost: 'Upon request'
        },
        photo: 'url(images/sochi_thieves.png)'
    },
    {
        name: 'Rostov-on-Don Patriotic',
        description: {
            city: 'Rostov-on-Don Patriotic',
            repairTime: '3 months',
            apartmentArea: '93 m2',
            repairCost: 'Upon request'
        },
        photo: 'url(images/rostov-on-don_patriotic.png)'
    }
];

class Description {
    constructor(entities) {
        this.entities = entities;
        this.root = document.querySelector('#slider-description');
        this.root.innerHTML = '<ul class="slider-description__items"></ul>';    
    }

    set(newIndex) {
        const description = this.entities[newIndex].description;
        this.root.querySelector('ul').innerHTML = [
            `<li><h2 class="subtitle">City:</h2><p>${description.city}</p></li>`,
            `<li><h2 class="subtitle">Apartment area:</h2><p>${description.apartmentArea}</p></li>`,
            `<li><h2 class="subtitle">Repair time:</h2><p>${description.repairTime}</p></li>`,
            `<li><h2 class="subtitle">Repair cost:</h2><p>${description.repairCost}</p></li>`,
        ].join('');
    }
}

class Pager {
    constructor(entities) {
        this.entities = entities;
        this.root = document.querySelector('#slider-pager');

        const elements = this.entities.map((entity, index) => {
            return `<button onclick="slider.set(${index});" class="pager__button"></button>`;
        });
        elements.unshift('<button onclick="slider.prev();" class="pager__button pager_backward"></button>');
        elements.push('<button onclick="slider.next();" class="pager__button pager_forward"></button>');

        this.root.innerHTML = elements.join('');
    }

    set(newIndex) {
        this.root.querySelectorAll(':not(:first-child):not(:last-child)').forEach((element, index) => {
            element.classList.remove('slider_selected');
            if (index === newIndex) {
                element.classList.add('slider_selected');
            }
        });    
    }
}

class Name {
    constructor(entities) {
        this.entities = entities;
        this.root = document.querySelector('#slider-name');
        const elements = this.entities.map((entity, index) => `<span onclick="slider.set(${index})">${entity.name}</span>`);
        this.root.innerHTML = elements.join('');    
    }

    set(newIndex) {
        this.root.querySelectorAll('*').forEach((element, index) => {
            element.classList.remove('slider_selected');
            if (index === newIndex) {
                element.classList.add('slider_selected');
            }
        });
    }
}

class Photo {
    constructor(entities) {
        this.entities = entities;
        this.root = document.querySelector('#slider-photo');
    }

    set(newIndex) {
        this.root.style.backgroundImage = entities[newIndex].photo;
    }
}

class Slider {
    #index = 0
    #components = []

    constructor(components) {
        this.#components = components;
    }

    set(newIndex) {
        this.#index = newIndex < 0 ? entities.length - 1 : newIndex % entities.length;
        this.#components.forEach(component => {
            component.set(this.#index);
        });
    }

    next() {
        this.set(this.#index + 1);
    }

    prev() {
        this.set(this.#index - 1);
    }
}

const slider = new Slider([
    new Description(entities),
    new Pager(entities),
    new Name(entities),
    new Photo(entities),
]);
slider.set(0);
