document.addEventListener("DOMContentLoaded",function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const ListOfBooks = document.getElementById("list-of-books");
    const CompletedBooks = document.getElementById("completed-books");

    const googleBooksApiKey = 'AIzaSyDy4vugqUq0ePBPWbC2SViNJS_JlTdoN14';

    // Function that fetches data from Google Books Api
    function searchBooks() {
        const searchTerm = searchInput.value;
    
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${googleBooksApiKey}`;

    fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const books = data.items;
                //Clearing the list of books
                bookList.innerHTML = "";
                
                // Populate ListOfBooks with the results
                books.forEach(book => {
                    const bookItem = document.createElement("div");
                    bookItem.className = "book-item";

                    const title = book.volumeInfo.title;
                    const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Unknown";
                    const bookHTML = `
                        <h3>${title}</h3>
                        <p>Author: ${author}</p>
                        <label class="checkbox-label">
                            <input type="checkbox"> Mark as Read
                        </label>
                    `;

                    bookItem.innerHTML = bookHTML;
                    bookList.appendChild(bookItem);
                });



                





    
     
     


})