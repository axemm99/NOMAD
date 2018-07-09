
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
        let strHtml = "<option value='Tags'>Tags</option>"
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







    ////////////////////////////////

    function filterByTags(){
        let tempArray = []

        for (let i = 0; i < books.length; i++) {
            if(parseInt(books[i].bookTags) == parseInt(filterTag.value)){
               tempArray.push(books[i])
               addFilterBookToCatalog(books[i].bookCategory, "grid", tempArray)
            }     
            else{
                
            }       
        }
    }










    /* authors */
    function addAuthorsToFilter() {
        let strHtml = "<option value='Autores'>Autores</option>"
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







    ////////////////////////////////

    function filterByAuthors(){
        let tempArray = []        
        let allBooks = []

        for (let i = 0; i < books.length; i++) {
            if(books[i].bookAuthors == filterAuthor.value){
               tempArray.push(books[i])
               addFilterBookToCatalog(books[i].bookCategory, "grid", tempArray)
            }     
            else if(filterAuthor.value == "Autores"){
               /* for (let i = 0; i < books.length; i++) {
                    allBooks.push(books[i])
                    addFilterBookToCatalog(books[i].bookCategory, "grid", allBooks)
                }*/
            }       
        }
    }








    /* libraries */
    function addLibrariesCityToFilter() {
        let strHtml = "<option value='Cidade'>Cidade</option>"
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
        let strHtml = "<option value='Freguesia'>Freguesia</option>"
        
        for (let i = 0; i < libraries.length; i++) {
            if (libraries[i].city == inputCity) {
                strHtml += `<option value='${libraries[i].parish}'>${Library.getParishById(libraries[i].parish)}</option>`
            }
        }

        filterLibraryParish.innerHTML = strHtml
    }







    ////////////////////////////////

    function filterByLibrary(){
        let tempArray = []        
        let allBooks = []

        for (let i = 0; i < books.length; i++) {
            if(books[i].bookCity == filterLibraryCity.value && books[i].bookParish == filterLibraryParish.value){
               tempArray.push(books[i])
               addFilterBookToCatalog(books[i].bookCategory, "grid", tempArray)
            }     
            else if(filterAuthor.value == "Autores"){
               /* for (let i = 0; i < books.length; i++) {
                    allBooks.push(books[i])
                    addFilterBookToCatalog(books[i].bookCategory, "grid", allBooks)
                }*/
            }       
        }
    }








//


// --------------------------------------
// SORT

    /* sort by title */
    function sortByTitle(viewMode, sortBooks) { 
        if (selectSort.value == "Título") {
            sortBooks.sort(function(a, b) {
                let txtA = a.bookTitle.toUpperCase()
                let txtB = b.bookTitle.toUpperCase()
                
                return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
            })
                
            /* invert sort by title if checkbox is selected */
            if (chbInvertSort.checked == true) {
                sortBooks.reverse()
            }
            
            addFilterBookToCatalog(categoryCurrent, viewMode, sortBooks)
        }
    }

    /* sort by rating */
    function sortByRating(viewMode) {
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
            addFilterBookToCatalog(categoryCurrent, viewMode, sortBooks)
        }
    }

    /* sort book by rating */
    function sortByDonationDate(viewMode, sortBooks) {
        if (selectSort.value == "Data de doação") {
            sortBooks.sort(function(a, b) {
                return new Date(b.donationDate) - new Date(a.donationDate)
            })
    
            /* invert sort by donation date if checkbox is selected */
            if (chbInvertSort.checked == true) {
                sortBooks.reverse()
            }
            addFilterBookToCatalog(categoryCurrent, viewMode, sortBooks)     
        }        
    }
//


// --------------------------------------
// CATALOG

    /* fill catalog with books */
    function addBookToCatalog(categoryCurrent, viewMode) {
        let strHtml = ""

        for (let i = 0; i < books.length; i++) {
            if (books[i].bookCategory == categoryCurrent) {
                if (viewMode == "grid") {
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
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <p>${books[i].bookAuthors}</p>
                                        </a>
                                    <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                        ${convertRatingToStars(Book.calculateRating(books[i].bookRatings))}
                                    </a>
                                </div>`

                    if (i == books.length - 1) {
                        strHtml += "</div>"   
                    }     
                }
                else if (viewMode == "list") {
                    let sinopse = ""

                    if (books[i].bookDescription.length > 150) {
                        sinopse = books[i].bookDescription.substring(0, books[i].bookDescription.indexOf("", 150))
                    }

                    strHtml += `<div class='row new-row' style='margin: 40px auto;'>
                                    <div class='book col-md-2'>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <img src='${books[i].bookCover}' class='img-fluid' width='140' style='margin-bottom: 10px;'/>
                                        </a>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            ${convertRatingToStars(Book.calculateRating(books[i].bookRatings))}
                                        </a>
                                    </div>
                                    <div class='book col-md-9'>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <h5>${books[i].bookTitle}</h5>
                                        </a>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <p>${books[i].bookAuthors}</p>
                                        </a>
                                        <p>${sinopse}[...]</p>
                                    </div>
                                </div>`
                }
            }
            catalogBooks.innerHTML = strHtml
        }
    }

    /* fill catalog with filtered books */
    function addFilterBookToCatalog(categoryCurrent, viewMode, filterBooks) {
        let strHtml = ""

        console.log(filterBooks)


        for (let i = 0; i < filterBooks.length; i++) {
            if (filterBooks[i].bookCategory == categoryCurrent) {
                if (viewMode == "grid") {
                    if (i == 0) {
                        strHtml += "<div class='row new-row text-center' style='margin: auto;'>"
                    }

                    strHtml += `<div class='book col-md-2'>
                                    <a id='${filterBooks[i].id}' href='bookSelect.html' class='book-page'>
                                        <img src='${filterBooks[i].bookCover}' class='img-fluid' width='140'/>
                                    </a>
                                    <a id='${filterBooks[i].id}' href='bookSelect.html' class='book-page'>
                                        <h5>${filterBooks[i].bookTitle}</h5>
                                    </a>
                                        <a id='${filterBooks[i].id}' href='bookSelect.html' class='book-page'>
                                            <p>${filterBooks[i].bookAuthors}</p>
                                        </a>
                                    <a id='${filterBooks[i].id}' href='bookSelect.html' class='book-page'>
                                        ${convertRatingToStars(Book.calculateRating(filterBooks[i].bookRatings))}
                                    </a>
                                </div>`

                    if (i == books.length - 1) {
                        strHtml += "</div>"   
                    }
                }
                else if (viewMode == "list") {
                    let sinopse = ""

                    if (books[i].bookDescription.length > 150) {
                        sinopse = books[i].bookDescription.substring(0, books[i].bookDescription.indexOf("", 150))
                    }

                    strHtml += `<div class='row new-row' style='margin: 40px auto;'>
                                    <div class='book col-md-2'>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <img src='${bookList[i].bookCover}' class='img-fluid' width='140' style='margin-bottom: 10px;'/>
                                        </a>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            ${convertRatingToStars(Book.calculateRating(books[i].bookRatings))}
                                        </a>
                                    </div>
                                    <div class='book col-md-9'>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <h5>${books[i].bookTitle}</h5>
                                        </a>
                                        <a id='${books[i].id}' href='bookSelect.html' class='book-page'>
                                            <p>${books[i].bookAuthors}</p>
                                        </a>
                                        <p>${sinopse}[...]</p>
                                    </div>
                                </div>`
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
      //  let btnList = document.getElementById("btnList")
       // let btnGrid = document.getElementById("btnGrid")

        /* tables */
        let tblBooks = document.getElementById("tblBooks")

        /* catalog */
        let catalogBooks = document.getElementById("catalogBooks")
        let listElements = document.getElementsByClassName("book")
        let viewMode = "grid"
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
        addBookToCatalog(categoryCurrent, viewMode)
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
            let filterBooks = []
            let tempTags = [...new Set(Book.getBookTagsByCategory(categoryCurrent))]

            console.log(tempTags)

            sortByTitle(viewMode, sortBooks)
            sortByRating(viewMode)
            sortByDonationDate(viewMode, sortBooks)            
            filterByAuthors()
            filterByTags()
            filterByLibrary()

            //console.log(tempTags.includes(filterTag.value))

            for (let i = 0; i < books.length; i++) {
                if (filterTag.value != "") {
                    for (let j = 0; j < tempTags.length; j++) {
                        if (tempTags[i] == filterTag.value) {
                            filterBooks.push(books[i])
                        }
                    }
                }
                else {
                    if (books[i].bookCategory == categoryCurrent) {
                        filterBooks.push(books[i])
                    }
                }
            }
            
            let newFilterBooks = [...new Set(filterBooks)]

            addFilterBookToCatalog(categoryCurrent, viewMode, newFilterBooks)

            event.preventDefault()
        })

        /* grid view */
      /*  btnGrid.addEventListener("click", function () {
            viewMode = "grid"
            addBookToCatalog(categoryCurrent, viewMode)
            getSelectBook()
        })*/

        /* list view */
      /*  btnList.addEventListener("click", function () {
            viewMode = "list"
            addBookToCatalog(categoryCurrent, viewMode)
            getSelectBook()
        })*/
    //
})