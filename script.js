document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const ListOfBooks = document.getElementById("list-of-books");
    const CompletedBooks = document.getElementById("completed-books");

    const googleBooksApiKey = 'AIzaSyDy4vugqUq0ePBPWbC2SViNJS_JlTdoN14'; 

    // Function that fetches data from Google Books API
    function searchBooks() {
        const searchTerm = searchInput.value;

        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${googleBooksApiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const books = data.items;
                // Clearing the list of books
                ListOfBooks.innerHTML = "";

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
                    ListOfBooks.appendChild(bookItem);
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Event listener for the search button
    searchButton.addEventListener("click", searchBooks);

    // Event listener for marking a book as completed
    ListOfBooks.addEventListener("change", function(event) {
        if (event.target.type === "checkbox") {
            const bookItem = event.target.closest(".book-item");
            const title = bookItem.querySelector("h3").textContent;
            const author = bookItem.querySelector("p").textContent;
            markAsRead(title, author);
        }
    });

    // Function to add a book to the completed list and save it to local storage
    function markAsRead(title, author) {
        const bookData = { title, author };
        displayCompletedBook(bookData);

        // Save the book to local storage
        const completedBooksData = JSON.parse(localStorage.getItem("completedBooks")) || [];
        completedBooksData.push(bookData);
        localStorage.setItem("completedBooks", JSON.stringify(completedBooksData));
    }

    // Function to display a book in the "Completed Books" section
    function displayCompletedBook(bookData) {
        const completedItem = document.createElement("div");
        completedItem.className = "book-item";

        const completedHTML = `
            <h3>${bookData.title}</h3>
            <p>Author: ${bookData.author}</p>
        `;

        completedItem.innerHTML = completedHTML;
        CompletedBooks.appendChild(completedItem);
    }

    // Load "Completed" books when the page loads
    function loadCompletedBooks() {
        const completedBooksData = JSON.parse(localStorage.getItem("completedBooks")) || [];
        completedBooksData.forEach(bookData => displayCompletedBook(bookData));
    }

    loadCompletedBooks(); // Load "Completed" books when the page loads
});
