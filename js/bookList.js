
// --------------------------------------
// LOAD
function addLoadEvent(func) {
    let oldonload = window.onload

    if (typeof window.onload != 'function') {
        window.onload = func
    } 
    else {
        window.onload = function() {
            if (oldonload) {
                oldonload()
            }
            func()
        }
    }
}
//


// --------------------------------------
// FILTER

    /* tags */
    function addTagsToFilter() {
        let strHtml = "<option value=''>Tags</option>"
        let tempIds = Book.getBookTagsByCategory(categoryCurrent)
        let tempTags = []
        let newTags = [...new Set(tempIds)]
        
        for (let i = 0; i < newTags.length; i++) {
            let tempTag = {
                            id: newTags[i],
                            name: Tag.getTagById(newTags[i])
            }
            tempTags.push(tempTag)            
        }

        let sortTags = [...tempTags].sort()

        sortTags.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name
            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })
        
        for (let i = 0; i < sortTags.length; i++) {
            strHtml += `<option value='${sortTags[i].id}'>${convertFirstToUpperCase(sortTags[i].name)}</option>`
        }

        filterTag.innerHTML = strHtml
    }

    /* authors */
    function addAuthorsToFilter() {
        let strHtml = "<option value=''>Autores</option>"
        let tempAuthors = Book.getBookAuthorsByCategory(categoryCurrent)

        let sortAuthors = [...tempAuthors].sort()

        sortAuthors.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name
            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })
        
        for (let i = 0; i < sortAuthors.length; i++) {
            strHtml += `<option value='${sortAuthors[i]}'>${sortAuthors[i]}</option>`
        }

        filterAuthor.innerHTML = strHtml
    }

    /* libraries */
    function addLibrariesCityToFilter() {
        let strHtml = "<option value=''>Cidade</option>"
        let tempLibraries = Book.getBookLibraryByCategory(categoryCurrent)
        let tempCity = []
        
        for (let i = 0; i < tempLibraries.length; i++) {
            tempCity.push(Library.getCityById(Library.getLibraryCityById(tempLibraries[i])))
        }

        let newTempCity = [...new Set(tempCity)]

        for (let i = 0; i < newTempCity.length; i++) {
            strHtml += `<option value='${Library.getLibraryCityById(tempLibraries[i])}'>${newTempCity[i]}</option>`
        }

        filterLibraryCity.innerHTML = strHtml
    }
    
    /* parishes */
    function addParishToFilter(inputCity) {
        let strHtml = "<option value=''>Freguesia</option>"
        
        for (let i = 0; i < libraries.length; i++) {
            if (libraries[i].city == inputCity) {
                strHtml += `<option value='${libraries[i].parish}'>${Library.getParishById(libraries[i].parish)}</option>`
            }
        }

        filterLibraryParish.innerHTML = strHtml
    }
//


// --------------------------------------
// SORT

    /* sort by title */
    function sortByTitle(sortBooks) { 
        if (selectSort.value == "Título") {
            console.log(selectSort.value)
            sortBooks.sort(function(a, b) {
                let txtA = a.bookTitle.toUpperCase()
                let txtB = b.bookTitle.toUpperCase()
                
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
            })
                
            /* invert sort by title if checkbox is selected */
            if (chbInvertSort.checked == true) {
                sortBooks.reverse()
            }
            addFilterBookToCatalog(categoryCurrent, sortBooks)
        }
    }

    /* sort by rating */
    function sortByRating() {
        if (selectSort.value == "Pontuação") {
            let sortBooks = books.slice(0)

            sortBooks.sort(function(a,b) {
                return Book.calculateRating(b.bookRatings) - Book.calculateRating(a.bookRatings)
            })

            /* invert sort by rating if checkbox is selected */
            if (chbInvertSort.checked == true) {
                let sortBooks = books.slice(0)

                sortBooks.sort(function(a,b) {
                    return Book.calculateRating(b.bookRatings) - Book.calculateRating(a.bookRatings)
                })
                sortBooks.reverse()
            }
            addFilterBookToCatalog(categoryCurrent, sortBooks)
        }
    }

    /* sort book by rating */
    function sortByDonationDate(sortBooks) {
        if (selectSort.value == "Data de doação") {
            sortBooks.sort(function(a, b) {
                return new Date(b.donationDate) - new Date(a.donationDate)
            })
    
            /* invert sort by donation date if checkbox is selected */
            if (chbInvertSort.checked == true) {
                sortBooks.reverse()
            }
            addFilterBookToCatalog(categoryCurrent, sortBooks)      
        }        
    }
//


// --------------------------------------
// CATALOG

    /* fill catalog with books */
    function addBookToCatalog(categoryCurrent) {
        let strHtml = ""
        
        for (let i = 0; i < books.length; i++) {
            if ((books[i].bookCategory) == categoryCurrent) {
                if (i == 0) {
                    strHtml += "<div class='row new-row text-center' style='margin: auto;'>"
                }

                strHtml += `<div class='book col-md-2'>
                                <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                    <img src='${books[i].bookCover}' class='img-fluid' width='140'/>
                                </a>
                                <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                    <h5>${books[i].bookTitle}</h5>
                                </a>
                                <p>${books[i].bookAuthors}</p>
                                <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                    ${convertRatingToStars(Book.calculateRating(books[i].bookRatings))}
                                </a>
                            </div>`

                if (i == books.length - 1) {
                    strHtml += "</div>"   
                }     
            }
            catalogBooks.innerHTML = strHtml
        }
    }

    /* fill catalog with filtered books */
    function addFilterBookToCatalog(categoryCurrent, sortBooks) {
        let strHtml = ""
        
        for (let i = 0; i < sortBooks.length; i++) {
            if ((sortBooks[i].bookCategory) == categoryCurrent) {
                if (i == 0) {
                    strHtml += "<div class='row new-row text-center' style='margin: auto;'>"
                }

                strHtml += `<div class='book col-md-2'>
                                <a id='${sortBooks[i].id}' href='bookSelect.html' class='book-page'>
                                    <img src='${sortBooks[i].bookCover}' class='img-fluid' width='140'/>
                                </a>
                                <a id='${sortBooks[i].id}' href='bookSelect.html' class='book-page'>
                                    <h5>${sortBooks[i].bookTitle}</h5>
                                </a>
                                <p>${sortBooks[i].bookAuthors}</p>
                                <a id='${sortBooks[i].id}' href='bookSelect.html' class='book-page'>
                                    ${convertRatingToStars(Book.calculateRating(sortBooks[i].bookRatings))}
                                </a>
                            </div>`

                if (i == sortBooks.length - 1) {
                    strHtml += "</div>"   
                }     
            }
            catalogBooks.innerHTML = strHtml
        }
    }
//


// --------------------------------------
// --------------------------------------
addLoadEvent(function() {
    
    // --------------------------------------
    // LOAD LOCAL STORAGE
        loadUsers()
        console.log(users)

        loadCategories()
        console.log(categories)

        loadTags()
        console.log(tags)

        loadBooks()
        console.log(books)

        loadWishlists()
        console.log(wishlists)

        loadLibraries()
        console.log(libraries)
    //


    // --------------------------------------
    // BOOK LIST VARIABLES

        /* session storage */
        categoryCurrent = sessionStorage.getItem("categoryCurrent", categoryCurrent)

        /* forms */
        let frmFilter = document.getElementById("frmFilter")
        let frmDonate = document.getElementById("frmDonate")
        let count = 0

        /* inputs */
        let filterTag = document.getElementById("filterTag")
        let filterAuthor = document.getElementById("filterAuthor")
        let filterLibraryCity = document.getElementById("filterLibraryCity")
        let filterLibraryParish = document.getElementById("filterLibraryParish")
        let selectSort = document.getElementById("selectSort")
        let chbInvertSort = document.getElementById("chbInvertSort")

        /* buttons */
        let btnClose = document.getElementById("btnClose")
        let btnFiltrar = document.getElementById("btnFiltrar")

        /* tables */
        let tblBooks = document.getElementById("tblBooks")

        /* catalog */
        let catalogBooks = document.getElementById("catalogBooks")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* donate book modal */
        viewDonateStep(count)
        modalDonateCategories.innerHTML = addCategoriesToModal()
        modalDonateTags.innerHTML = addTagsToModal()
        modalDonateCity.innerHTML = addCitiesToModal()

        /* notifications */
        if (userPermissions == 2) {
            viewNotificationPanel()
        }

        /* catalog */
        addCategoryCurrentTitle(categoryCurrent)
        addBookToCatalog(categoryCurrent)
        getSelectBook()

        /* filter */
        addTagsToFilter()
        addAuthorsToFilter()
        addLibrariesCityToFilter()
    //

    // --------------------------------------
    // FORMS

        /* donate book */
        frmDonate.addEventListener("submit", function(event){
            checkBookValid()

            if (checkBookValid() == true) {
                frmDonate.reset()
            }
            addRecentBooksToIndex()
            event.preventDefault()
        })

        /* cities donate */
        modalDonateCity.addEventListener("change", function(event) {
            modalDonateParish.innerHTML = addParishToModal(modalDonateCity.value)
            event.preventDefault()
        })

        /* donate cover */
        modalDonateCover.addEventListener("change", function(event) {
            viewInputCover()
            event.preventDefault()
        })

        /* filter parish */
        filterLibraryCity.addEventListener("change", function(event){
            addParishToFilter(filterLibraryCity.value)
            event.preventDefault()
        })
    //


    // --------------------------------------
    // BUTTONS

        /* modal donate next */
        btnNext.addEventListener("click", function(event){
            count += 1
            viewDonateStep(count)
            event.preventDefault()
        })

        /* modal donate previous */
        btnPrevious.addEventListener("click", function(event){
            count -= 1
            viewDonateStep(count)
            event.preventDefault()
        })

        /* modal donate close and reset */
        btnClose.addEventListener("click", function(event){
            frmDonate.reset()        
            count = 0
            viewDonateStep(count)
            event.preventDefault()
        })

        /* filter */
        btnFilter.addEventListener("click", function(event) {
            let sortBooks = [...books].sort()

            sortByTitle(sortBooks)
            sortByRating()
            sortByDonationDate(sortBooks)

    /*        let strHtml = ""
            for (var i = 0, cont=0; i < books.length; i++) {
                if (categoryCurrent == books[i].bookCategory) {
                    if ((books[i].bookAuthors == filterAuthor.value || filterAuthor.value == "") &&
                        (books[i].libraryId == filterLibraryParish.value || filterLibraryParish.value == "")) {
                        
                        // Starts the row
                        if (cont % 5 == 0) {
                            strHtml += '<div class="row">'
                        }
        
                        // Creates the book
                        strHtml += `<div class='book col-md-2'>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <img src='${books[i].bookCover}' class='img-fluid' width='140'/>
                                        </a>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <h5>${books[i].bookTitle}</h5>
                                        </a>
                                        <p>${books[i].bookAuthors}</p>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            ${convertRatingToStars(books[i].bookRating)}
                                        </a>
                                    </div>`
                        cont++
                        // Ends the row
                        if (cont % 5 == 4) {
                            strHtml += `</div>`
                        }
                    }
                }
            }
    
            catalogBooks.innerHTML = strHtml
    
            bookPage()

            function bookPage() {
                let bookPageLoad = document.getElementsByClassName("BookPage")
            
                for (let i = 0; i < bookPageLoad.length; i++) {
                    bookPageLoad[i].addEventListener("click", function () {            
                        let bookId = bookPageLoad[i].getAttribute("id")
            
                        // Adds current book to sessionStorage
                        let bookCurrent = sessionStorage.setItem("bookCurrent", bookId)
                    })
                }
            }*/
            event.preventDefault()
        })


        /* filter */
        /*btnFilter.addEventListener("submit", function(event) {
            let strHtml = ""
            let sortBooks = [...books].sort()

            sortByTitle(sortBooks)
            sortByRating()
            sortByDonationDate(sortBooks)



            // filter books by tag                             // ????????????????????????????????
            if (filterTag.value != "Tags") {
                for (let i = 0; i < books.length; i++) {
                    if (books[i].bookTags == filterTag.value) {
                        let tagId = books[i].id
                        
                        console.log("AutID_ " + tagId)

                        renderCatalog(tagId)
                    }
                }
            }
            else {
                renderCatalog()
            }

            // filter books by author                              // ????????????????????????????????
            if (filterAuthor.value != "Autores") {
                for (let i = 0; i < books.length; i++) {
                    if (books[i].bookAuthors == filterAuthor.value) {
                        let authorId = books[i].id

                        addBookToCatalog(categoryCurrent, authorId, "", "")
                    }
                }
            }

            // filter books by library                              // ????????????????????????????????
            if(filterLibraryParish.value != "Freguesia") {
                for (let j = 0; j < libraries.length; j++) {
                    if (filterLibraryParish.value == libraries[j].parish) {
                        for (let i = 0; i < books.length; i++) {
                            if (books[i].libraryId == libraries[j].id) {
                                renderCatalog(libraryId)
                            }
                        }
                    }
                }
            }
            else {
                renderCatalog()
            }

            event.preventDefault()
        })*/
    //
})