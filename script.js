const flex = document.querySelector('.flex');
const form = document.getElementById('form');
const addNew = document.querySelector('body > button');
const dialog = document.querySelector('dialog');
const add = document.querySelector('.add');
const closeDialog = document.querySelector('.close');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readStatusCheckbox = document.querySelector('#read-status');

const myLibrary = [];

let bookIDCounter = 0;

class Book {
	id = bookIDCounter++;
	title;
	author;
	pages;
	read;

	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	toggleStatus(readStatusDiv, readStatus) {
		if (this.read == true) {
			this.read = false;
			readStatusDiv.style.backgroundColor = 'red';
			readStatus.textContent = 'Incomplete';
		} else if (this.read == false) {
			this.read = true;
			readStatusDiv.style.backgroundColor = 'green';
			readStatus.textContent = 'Completed';
		}
	}
}

function addBookToList(book) {
	myLibrary.push(book);
}

function display() {
	myLibrary.forEach(book => {
		let newCard = document.createElement('div');
		newCard.setAttribute('class', 'card');
		newCard.setAttribute('name', 'card');
		let newCardTitle = document.createElement('p');
		let newCardAuthor = document.createElement('p');
		let newCardPages = document.createElement('p');
		newCardTitle.textContent = book.title;
		newCardAuthor.textContent = book.author;
		newCardPages.textContent = `${book.pages} pages`;
		let readStatusDiv = document.createElement('div');
		let readStatus = document.createElement('p');
		if (book.read == true) {
			readStatusDiv.style.backgroundColor = 'green';
			readStatus.textContent = 'Completed';
		} else if (book.read == false) {
			readStatusDiv.style.backgroundColor = 'red';
			readStatus.textContent = 'Incomplete';
		}
		let removeBtn = document.createElement('button');
		removeBtn.textContent = 'Remove';
		removeBtn.setAttribute('class', 'remove');
		let statusToggleBtn = document.createElement('button');
		statusToggleBtn.textContent = 'Toggle Read Status';
		newCard.setAttribute('style', 'position: relative');
		statusToggleBtn.setAttribute(
			'style',
			'position: absolute; top: 0px; right: 0px; margin-top: 10px; margin-right: 10px;'
		);
		readStatusDiv.appendChild(readStatus);
		newCard.appendChild(newCardTitle);
		newCard.appendChild(newCardAuthor);
		newCard.appendChild(newCardPages);
		newCard.appendChild(readStatusDiv);
		newCard.appendChild(removeBtn);
		newCard.appendChild(statusToggleBtn);
		flex.appendChild(newCard);

		removeBtn.addEventListener('click', () => {
			myLibrary.splice(
				myLibrary.findIndex(b => b.id == book.id),
				1
			);
			flex.removeChild(newCard);
		});

		statusToggleBtn.addEventListener('click', () => {
			book.toggleStatus(readStatusDiv, readStatus);
		});
	});
}

function refreshDisplay() {
	while (flex.lastElementChild) {
		flex.removeChild(flex.lastElementChild);
	}
}

addNew.addEventListener('click', () => {
	dialog.showModal();
});

form.addEventListener('submit', () => {
	let read;
	if (readStatusCheckbox.checked) read = true;
	else if (!readStatusCheckbox.checked) read = false;
	myLibrary.push(new Book(`${title.value}`, `${author.value}`, `${pages.value}`, read));
	if (flex.hasChildNodes()) {
		refreshDisplay();
	}
	display();
	clear();
});

closeDialog.addEventListener('click', () => {
	dialog.close();
	clear();
});

function clear() {
	title.value = '';
	author.value = '';
	pages.value = '';
	readStatusCheckbox.checked = false;
}
