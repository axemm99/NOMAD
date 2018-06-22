
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
// RENDER TABLES

    /* books */
    function renderTableBooks() {
        let strHtml = `<thead class='thead-midoffice'>
                            <tr>
                                <th class='w-5'>Id</th>
                                <th class='w-20'>Título</th>
                                <th class='w-10'>Categoria</th>
                                <th class='w-10'>Tags</th>
                                <th class='w-10'>Estado</th>
                                <th class='w-10'>Biblioteca</th>
                                <th class='w-2'></th>
                            </tr>
                        </thead>
                        <tbody>`
            
        for (let i = 0; i < books.length; i++) {
            strHtml += `<tr>
                            <td>${books[i].id}</td>
                            <td>${books[i].bookTitle}</td>
                            <td>${books[i].bookCategory}</td>
                            <td>${books[i].booksTags}</td>
                            <td>${books[i].bookCondition}</td>
                            <td>${books[i].libraryId}</td>
                            <td>
                                <a id='${books[i].id}' class='view mr-1' data-toggle='modal' data-target='#viewBookModal'><i class='fa fa-info-circle'></i></a>
                                <a id='${books[i].id}' class='remove'><i class='fa fa-times-circle'></i></a>
                            </td>
                        </tr>`
        }

        strHtml += "</tbody>"
        tblBooks.innerHTML = strHtml
        
        /* modal with book details */
        let bookView = document.getElementsByClassName("view")

        for (let i = 0; i < bookView.length; i++) {
            bookView[i].addEventListener("click", function() {
                let bookId = bookView[i].getAttribute("id")
                Book.viewBookById(bookId)
            })
        }

        /* remove book */
        let bookRemove = document.getElementsByClassName("remove")

        for (let i = 0; i < bookRemove.length; i++) {
            bookRemove[i].addEventListener("click", function() {
                let bookId = parseInt(bookRemove[i].getAttribute("id"))

                swal({
                    title: `Tem a certeza que pretende eliminar a livro "${Book.getBookTitleById(bookId)}"?`,
                    text: 'Não poderá reverter esta ação.',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#FFD892',
                    cancelButtonColor: '#ba9378',
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        swal({
                            type: 'success',
                            title: 'Eliminado!',
                            text: `O livro "${Book.getBookTitleById(bookId)}" foi eliminado.`,
                            showConfirmButton: true,
                            confirmButtonColor: '#FFD892'
                        })

                        Book.removeBookById(bookId)
                        localStorage.setItem("books", JSON.stringify(books))

                        renderTableBooks()
                    }
                })
            })
        }
    }
//


// --------------------------------------
// COMBOBOX

    /* categories */
    function addCategories() {
        let strHtml = "<option value=''>...</option>"    
        
        for (let i = 0; i < categories.length; i++) {
            strHtml += `<option value='${categories[i].id}'>${categories[i].name}</option>`             
        }

        viewBookCategory.innerHTML = strHtml
    }

    /* tags */
    function addTags() {
        let strHtml = "<option value=''>...</option>"    
        
        for (let i = 0; i < tags.length; i++) {
            strHtml += `<option value='${tags[i].id}'>${tags[i].name}</option>`             
        }

        viewBookTags.innerHTML = strHtml
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

        loadLibraries()
        console.log(libraries)
    //
    

    // --------------------------------------
    // LIBRARY MANAGER VARIABLES

        /* forms */
        let frmViewBooks = document.getElementById("frmViewBooks")

        /* modal */
        let viewBookTitle = document.getElementById("viewBookTitle")   //////
        let viewBookAuthors = document.getElementById("viewBookAuthors")   //////
        let viewBookPublisher = document.getElementById("viewBookPublisher")   //////
        let viewBookYear = document.getElementById("viewBookYear")   //////
        let viewBookPages = document.getElementById("viewBookPages")   //////
        let viewBookCity = document.getElementById("viewBookCity")   //////
        let viewBookParish = document.getElementById("viewBookParish")   //////
        let viewBookCategory = document.getElementById("viewBookCategory")   //////
        let viewBookTags = document.getElementById("viewBookTags")   //////
        let viewBookCondition = document.getElementById("viewBookCondition")   //////
        let viewBookDonor = document.getElementById("viewBookDonor")   //////
        let viewBookDonate = document.getElementById("viewBookDonate")   //////
        let viewBookCover = document.getElementById("viewBookCover")   //////
        let viewBookDescription = document.getElementById("viewBookDescription")   //////

        /* buttons */
        let btnEdit = document.getElementById("btnEdit")
        let btnClose = document.getElementById("btnClose")
        
        /* tables */
        let tblBooks = document.getElementById("tblBooks")   //////
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* table */
        renderTableBooks()
        
        /* combobox */
        addCategories()
        addTags()
    //


    // --------------------------------------
    // FORMS
    
        /* view book */
        frmViewBooks.addEventListener("submit", function(event) {
            for (let i = 0; i < books.length; i++) {
                /*if(books[i].id) {
                    //let tempId = 

                    Book.editBookById(tempId)

                    localStorage.setItem("books", JSON.stringify(books))
                }*/
            }
             
            $('#viewBookModal').modal('hide')

            renderTableBooks()
            event.preventDefault()
        })
    //


    // --------------------------------------
    // BUTTONS
    
        /* edit user */
        btnEdit.addEventListener("click", function(event) {

            event.preventDefault()
        })

        /* close modal */
        btnClose.addEventListener("click", function(event){
            renderTableBooks()
            event.preventDefault()
        })
    //
})