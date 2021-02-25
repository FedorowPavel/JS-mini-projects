const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Waren Bufett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amanico Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
]

const listItems = [];

let dragStartIndex;

createList();

//insert list items into DOm
function createList() {
    [...richestPeople]
        //для каждого элемента создаем свойства 
        //с именем и номером рандомным
        .map(a => ({ value: a, sort: Math.random() }))
        //сортируем в соответсвии с рандомными значениями
        //которые получены выше дял каждого элемента
        .sort((a, b) => a.sort - b.sort)
        //возращаем знаечения каждого элемента массива
        .map(a => a.value)
        .forEach((person, index) => {

            const listItem = document.createElement('li');
                

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
            `

            listItems.push(listItem);

            draggableList.appendChild(listItem)
        });
    
    addEventListeners();
    
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');  
    this.classList.add('over');
}

function dragleave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}

function dragOver(event) {
    // console.log('Event: ', 'dragover');   
    event.preventDefault();
}

function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');

    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');

    console.log(dragEndIndex);
}


//swap list items that are darg nad drop
function swapItems(from, to) {
    const itemOne = listItems[from].querySelector('.draggable');
    const itemTwo = listItems[to].querySelector('.draggable');

    listItems[from].appendChild(itemTwo);
    listItems[to].appendChild(itemOne);
}


//check the order of list items 
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}



function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');


    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragleave);
    })
}


check.addEventListener('click', checkOrder)