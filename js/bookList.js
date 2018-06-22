
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


// --------------------------------------
// FILTER

    /* tags */                                   //????????????????????????????????????????
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
// CATALOG

    /* books */
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
        let btnFilter = document.getElementById("btnFilter")

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

        /* filter parish */
        filterLibraryCity.addEventListener("change", function(event){
            addParishToFilter(filterLibraryCity.value)
            event.preventDefault()
        })

        /* donate book */
        frmDonate.addEventListener("submit", function(event){
            checkBookValid()

            if (checkBookValid() == true) {
                frmDonate.reset()
            }

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
            // SORT BY TITLE
            if (selectSort.value == "Título") {    
                books.sort(function(a, b) {
                    let txtA = a.bookTitle.toUpperCase()
                    let txtB = b.bookTitle.toUpperCase()
                    
                    return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
                })
                    
                // CHECK IF INVERT SORT CHECKBOX IS SELECTED
                if (chbInvertSort.checked == true) {
                    books.reverse()
                }

                addBookToCatalog(categoryCurrent)
            }
        
            // SORT BY SCORE
            if (selectSort.value == "Pontuação") {
                let tempBook = books.slice(0)

                console.log("tempBook   " + tempBook)

                tempBook.sort(function(a,b) {
                    return a.score - b.score
                })

                // CHECK IF INVERT SORT CHECKBOX IS SELECTED
                if (chbInvertSort.checked == true) {
                    let tempBook = books.slice(0)

                    tempBook.sort(function(a,b) {
                        return a.score - b.score
                    })

                    tempBook.reverse()
                }

                addBookToCatalog(categoryCurrent)
            }
        
            // SORT BY DONATION DATE
            if (selectSort.value == "Data de doação") {
                books.sort(function(a, b) {
                    return new Date(b.donationDate) - new Date(a.donationDate);
                })
        
                // CHECK IF INVERT SORT CHECKBOX IS SELECTED
                if (chbInvertSort.checked == true) {
                    books.reverse()
                }

                addBookToCatalog(categoryCurrent)
            }
            
            // SORT BY TAG                               // ????????????????????????????????
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

            // SORT BY AUTHOR                               // ????????????????????????????????
            if (filterAuthor.value != "Autores") {
                for (let i = 0; i < books.length; i++) {
                    if (books[i].bookAuthors == filterAuthor.value) {
                        let authorId = books[i].id

                        renderCatalog(authorId)
                    }
                }
            }
            else {
                renderCatalog()
            }

            // SORT BY LIBRARY                               // ????????????????????????????????
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
        })
    //
})


















function orderTitle() { 
    if (selectSort.value == "Título") {
    
        let newBOOKS = books.sort()
        newBOOKS.sort(function (a, b) {
        var textA = a.bookTitle.toUpperCase();
        var textB = b.bookTitle.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })
        console.log(books)
        
        // Reverses the order
        if (chbInvertSort.checked == true) {
            newBOOKS.reverse()
        }
    }
}   

function orderScore() {
    if (selectSort.value == "Pontuação") {
           
        let newBOOKS = books.slice(0)

        newBOOKS.sort(function(a,b) {
            return a.bookRatings - b.bookRatings
        })

        // Reverses the order
        if (chbInvertSort.checked == true) {
            let newBOOKS = books.slice(0)

            newBOOKS.sort(function(a,b) {
                return a.bookRatings - b.bookRatings
            })
                
            newBOOKS.reverse()
        }
    }
}

function orderDate() {
    if (selectSort.value == "Data de doação") {
        let newBOOKS = books.sort()

        newBOOKS.sort(function(a, b) {
            return new Date(b.donationDate) - new Date(a.donationDate);
        })

        // Reverses the order
        if (chbInvertSort.checked == true) {
            newBOOKS.reverse()
        }
    }    
}