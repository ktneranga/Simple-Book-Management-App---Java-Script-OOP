//Book class : represent a book

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class : handle Ui tasks

class UI{
    static displayBooks(){
        const books = Store.getBook();
        books.forEach((book)=>UI.addBookToList(book));
    }

    static addBookToList(book){
        //create the row in a table
        const list = document.querySelector('#book-list');
        
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete">X</td>
        `;

        list.appendChild(row);

    }

    static ClearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlerts(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(`${message}`));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //vanish alert
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

}

//Store class : handle store data
    //handle storage
    class Store{
        static getBook(){
            //local storage keeps basicall key values pairs
            //we cannot store objects in local storage
            //It has to be a string
            let books;
            //check if there is a current book items in the local storage
            if(localStorage.getItem('books')===null){
                books = [];
            }else{
                books = JSON.parse(localStorage.getItem('books'));
            }
            return books;
        }

        static addBook(book){
            const books = Store.getBook();
            books.push(book);
            localStorage.setItem('books',JSON.stringify(books));
        }
        static removeBook(isbn){
            books.forEach((book, index)=>{
                if(book.isbn === isbn){
                    books.splice(index,1);
                }
            });

            localStorage.setItem('books', JSON.stringify(books));
        }
    }



//Event : Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
 
//Event : Add a book
const form = document.querySelector('#book-form');

form.addEventListener('submit', (e)=>{
    //prevent actual submit
    e.preventDefault();
    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn === ''){
       UI.showAlerts('Please fill in all fields!', 'danger');
    }else{
        //instantiate the Book class
        const book = new Book(title, author, isbn);
        //add a book to UI
        UI.addBookToList(book);
        //add a book to store
        Store.addBook(book);
        //clear fields
        UI.ClearFields();
        //Show success message
        UI.showAlerts('Book added successful!', 'success');
    }
});

//Event : Remove a book
document.querySelector('#book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);
    UI.showAlerts('Book removed successful!', 'success');
})