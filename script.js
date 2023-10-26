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

    
     
     


})