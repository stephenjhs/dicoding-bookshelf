class Book {
	constructor(judul, penulis, tahun, dibaca) {
		this.judul = judul
		this.penulis = penulis
		this.tahun = tahun
		this.dibaca = dibaca
		this.identifier = (Math.random() + 1).toString(36).substring(7);
	}
}

class Display {
	static books() {
		const books = Store.all()

		books.forEach(book => Display.listBooks(book))
	}

	static listBooks(book) {
		const listSudahDibaca = document.querySelector("#list-sudah-dibaca")
		const listBelumDibaca = document.querySelector("#list-belum-dibaca")

		if(book.dibaca) {
			listSudahDibaca.insertAdjacentHTML("beforeend", `
				<div class="flex items-center gap-4" data-identifier="${book.identifier}">
					<div class="p-4 border border-dashed border-white/60 w-full">
						<h3 class="font-semibold">${book.judul}</h3>
						<hr class="border-white/50 my-2" />
						<p class="text-sm mb-1">Tahun : ${book.tahun}</p>
						<p class="text-sm">Penulis : ${book.penulis}</p>
						<div class="flex gap-2 mt-10 justify-end">
							<span class="p-3 rounded bg-red-700 inline-block text-sm" onclick="deleteBook('${book.identifier}')" role="button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="feather feather-trash-2"
								>
									<polyline points="3 6 5 6 21 6"></polyline>
									<path
										d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
									></path>
									<line x1="10" y1="11" x2="10" y2="17"></line>
									<line x1="14" y1="11" x2="14" y2="17"></line>
								</svg>
							</span>
							<span class="p-3 rounded bg-yellow-500 inline-block text-black text-sm" role="button" onclick="uncheckedBook('${book.identifier}')">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-ccw"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
							</span>
						</div>
					</div>
				</div>
			`)
		} else {
			listBelumDibaca.insertAdjacentHTML("beforeend", `
				<div class="flex items-center gap-4" data-identifier="${book.identifier}">
					<div class="p-4 border border-dashed border-white/60 w-full">
						<h3 class="font-semibold">${book.judul}</h3>
						<hr class="border-white/50 my-2" />
						<p class="text-sm mb-1">Tahun : ${book.tahun}</p>
						<p class="text-sm">Penulis : ${book.penulis}</p>
						<div class="flex gap-2 mt-10 justify-end">
							<span class="p-3 rounded bg-white text-red-700 inline-block text-sm" onclick="deleteBook('${book.identifier}')" role="button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="feather feather-trash-2"
								>
									<polyline points="3 6 5 6 21 6"></polyline>
									<path
										d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
									></path>
									<line x1="10" y1="11" x2="10" y2="17"></line>
									<line x1="14" y1="11" x2="14" y2="17"></line>
								</svg>
							</span>
							<span class="p-3 rounded bg-green-600 text-white inline-block text-sm" role="button" onclick="checkedBook('${book.identifier}')">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
							</span>
						</div>
					</div>
				</div>
			`)
		}
	}

	static searchBooks(val) {
		const listPencarian = document.querySelector("#list-pencarian")
		const books = Store.all();

		if(val === "") {
			listPencarian.innerHTML = ""
		} else {
	        books.forEach(book => listPencarian.innerHTML = "");
	        books.filter(book => book.judul.toLowerCase().includes(val)).forEach(book => {
	        	listPencarian.innerHTML = `
					<div class="flex items-center gap-4" data-identifier="${book.identifier}">
						<div class="p-4 border border-dashed border-black/60 w-full">
							<h3 class="font-semibold">${book.judul}</h3>
							<hr class="border-black/50 my-2" />
							<p class="text-sm mb-1">Tahun : ${book.tahun}</p>
							<p class="text-sm">Penulis : ${book.penulis}</p>
						</div>
					</div>
	        	`
	        });
		}
	}

	static deleteBook(content) {
		content.remove()
	}

	static checkedBook(content, identifier) {
		content.remove()
		const books = Store.all()
		let bookContent = []

		books.forEach((book, index) => {
			if(book.identifier === identifier) {
				bookContent = book
			}
		})

		Display.listBooks(bookContent)
	}

	static uncheckedBook(content, identifier) {
		content.remove()
		const books = Store.all()
		let bookContent = []

		books.forEach((book, index) => {
			if(book.identifier === identifier) {
				bookContent = book
			}
		})

		Display.listBooks(bookContent)
	}

	static alert(message, type) {
		const alertAxis = document.querySelector("#alert-axis")

		alertAxis.innerHTML = `
			<div class="p-2 px-4 rounded text-sm text-white ${type}">${message}</div>
		`

		setTimeout(() => {
			alertAxis.children[0].remove()
		}, 2000)
	}

	static clearFields() {
		document.querySelector("#judul").value = ""
		document.querySelector("#penulis").value = ""
		document.querySelector("#tahun").value = ""
		document.querySelector("#dibaca").checked = false
	}
}

class Store {
	static all() {
		let books
		if(localStorage.getItem("books") === null) {
			books = []
		} else {
			books = JSON.parse(localStorage.getItem("books"))
		}

		return books
	}

	static insert(book) {
		const books = Store.all()

		books.push(book)
		localStorage.setItem("books", JSON.stringify(books))
	}

	static delete(identifier) {
		const books = Store.all()

		books.forEach((book, index) => {
			if(book.identifier === identifier) {
				books.splice(index, 1)
			}
		})

		localStorage.setItem("books", JSON.stringify(books))
	}

	static checked(identifier) {
		const books = Store.all()

		books.forEach((book, index) => {
			if(book.identifier === identifier) {
				book.dibaca = true
			}
		})

		localStorage.setItem("books", JSON.stringify(books))
	}

	static unchecked(identifier) {
		const books = Store.all()

		books.forEach((book, index) => {
			if(book.identifier === identifier) {
				book.dibaca = false
			}
		})

		localStorage.setItem("books", JSON.stringify(books))
	}
}

document.addEventListener("DOMContentLoaded", Display.books)

document.querySelector("#search-input").addEventListener("input", () => {
    const val = event.target.value.toLowerCase();

	Display.searchBooks(val)
})

document.querySelector("#add-form").addEventListener("submit", () => {
	event.preventDefault()

	const judul = document.querySelector("#judul").value
	const penulis = document.querySelector("#penulis").value
	const tahun = document.querySelector("#tahun").value
	const dibaca = document.querySelector("#dibaca").checked

	if(judul === "" || penulis === "" || tahun === "") {
		Display.alert("Inputan harus diisi coek :3", "bg-red-600")
	} else {
		Display.alert("Buku berhasil ditambah!", "bg-green-600")

		const book = new Book(judul, penulis, tahun, dibaca)

		Display.listBooks(book)

		Store.insert(book)

		Display.clearFields()
	}
})

function deleteBook(identifier) {
	const content = document.querySelector(`[data-identifier='${identifier}']`)

	Store.delete(identifier)

	Display.deleteBook(content)	

	Display.alert("Buku berhasil dihapus!", "bg-green-600")
}

function checkedBook(identifier) {
	const content = document.querySelector(`[data-identifier='${identifier}']`)

	Store.checked(identifier)

	Display.checkedBook(content, identifier)	

	Display.alert("Buku berhasil dipindahkan!", "bg-green-600")
}

function uncheckedBook(identifier) {
	const content = document.querySelector(`[data-identifier='${identifier}']`)

	Store.unchecked(identifier)

	Display.uncheckedBook(content, identifier)	

	Display.alert("Buku berhasil dipindahkan!", "bg-green-600")
}