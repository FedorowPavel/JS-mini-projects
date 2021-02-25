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
        .map(a => a.value )
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
        })
    
}