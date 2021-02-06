const gridBox = document.querySelector('.grid-container'); // grid container element
const action_pane = document.querySelector('#action-pane'); // action pane element
const fragment = document.createDocumentFragment(); // DOM Fragment

// helper methods

/**
 * returns the current order of cards
 */
const getGridItems = () => [...document.querySelectorAll('.grid-item')];

/**
 * appends the cards to the grid container
 */
const appendItemToGrid = (items) => { gridBox.append(...items) }


/**
 * shuffles the grid items using Math.random utility
 */
const shuffleGridItems = () => {
    appendItemToGrid(getGridItems().sort(() => Math.random() - 0.5));
    isShuffled = true;
}

/**
 * sorts the grid in original order
 */
const sortGridItems = () => {
    if (!isShuffled) {
        alert(`It's in sorted state already!`);
        return;
    }
    appendItemToGrid(getGridItems().sort((nodeA, nodeB) => nodeA.innerHTML - nodeB.innerHTML));
    isShuffled = false;
}

const event_mapper = {
    'sort': sortGridItems,
    'shuffle': shuffleGridItems
}

// classList for cards
const items = ['grid-item-1', 'grid-item-2', 'grid-item-3', 'grid-item-2',
    'grid-item-3', 'grid-item-4', 'grid-item-4', 'grid-item-1', 'grid-item-3']

let isShuffled = false; // flag to check whether the items are shuffle


/**
 * fires on click and triggers the respective action
 *  used "Event delegation" concept to optimize the performance
 * @param {*} e - click event
 */
const onBtnClick = (e) => {
    if (!e.target.className === 'btn') return;
    event_mapper[e.target.id]();
}

/**
 * using fragments to append grid items to gridbox.
 * Batch updates reduces the workload on DOM
 */
const createElem = () => {
    items.forEach((item, ind) => {
        const div = document.createElement('div');
        div.textContent = ind + 1;
        div.classList.add(...['grid-item', item]);
        fragment.appendChild(div);
    })
    gridBox.appendChild(fragment);
}

// util functions

/**
 * 
 * @param {*} target - target to attach the listener
 * @param {*} eventName - name of the event
 * @param {*} listener - listener callback
 */
const bindListener = (target, eventName, listener) => {
    target.addEventListener(eventName, listener);
}

// binding the listeners
bindListener(action_pane, 'click', onBtnClick);
bindListener(window, 'load', createElem);
