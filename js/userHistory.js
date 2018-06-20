
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
// USER HISTORY

    /* previous requests */
    function renderTablePreviousRequests() {
        let strHtml = ""    
    
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].deliveryDate != "") {
                for (let j = 0; j < books.length; j++) {
                    if (requests[i].bookId == books[j].id) {
                        strHtml += `<tr>
                                        <td>
                                            <img class='cover-small' src='${books[j].bookCover}'>
                                        </td>
                                        <td>
                                            <p><strong>${books[j].bookTitle}</strong></p>
                                            <p>${books[j].bookAuthors}</p>
                                        </td>
                                        <td>
                                            <a id='${books[j].id}' class='view' data-toggle='modal' data-target='#modalViewRequestDetails'><i class="fa fa-book"></i></a>
                                            <a id='${books[j].id}' class='rating' data-toggle='modal' data-target='#modalRating'><i class='fa fa-star'></i></a>
                                        </td>
                                    </tr>`
                    }
                }
            }
        }    
        strHtml += "</tbody>"
        tblRequestsHistory.innerHTML = strHtml
        
        /* modal with request details */
        let bookRequest = document.getElementsByClassName("view")

        for (let i = 0; i < bookRequest.length; i++) {
            bookRequest[i].addEventListener("click", function() {
                let bookId = bookRequest[i].getAttribute("id")

                addBookRequestInfo(bookId)
                /*
                frmRating.addEventListener("submit", function(event) {
                    Book.rateBookById(bookId)
                    localStorage.setItem("books", JSON.stringify(books))
                    event.preventDefault()
                })*/
            })        
        }
        
        /* modal to rate book */
        let bookRating = document.getElementsByClassName("rating")

        for (let i = 0; i < bookRating.length; i++) {
            bookRating[i].addEventListener("click", function() {
                let bookId = bookRating[i].getAttribute("id")

                addBookInfoToRating(bookId)
                
                frmRating.addEventListener("submit", function(event) {
                    Book.rateBookById(bookId)
                    localStorage.setItem("books", JSON.stringify(books))
                    event.preventDefault()
                })
            })        
        }
    }

    /* current requests */
    function renderTableCurrentRequests() {
        let strHtml = ""

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].deliveryDate == "") {
                for (let j = 0; j < books.length; j++) {                    
                    if (requests[i].bookId == books[j].id) {
                        strHtml += `<tr>
                                        <a href='../index.html'>
                                        <td>
                                            <img class='cover-small' src='${books[j].bookCover}'>
                                        </td>
                                        <td>
                                            <p><strong>${books[j].bookTitle}</strong></p>
                                            <p>${books[j].bookAuthors}</p>
                                        </td>
                                        <td>
                                            <a id='${books[j].id}' class='view' data-toggle='modal' data-target='#modalViewCurrentRequest'><i class="fas fa-book"></i></a>
                                            <a id='${books[j].id}' class='deliver' data-toggle='modal' data-target='#modalDeliverBook'><i class="fas fa-calendar-check"></i></a>
                                        </td>
                                        </a>
                                    </tr>`
                    }
                }
            }
        }    
        strHtml += "</tbody>"
        tblRequestsCurrent.innerHTML = strHtml

        let bookDeliver = document.getElementsByClassName("deliver")
        //bookDeliver()
    }

    /* deliver requested book */
    function bookDeliver()  {
        for (let i = 0; i < bookDeliver.length; i++) {
            bookDeliver[i].addEventListener("click", function() {
                let requestId = bookDeliver[i].getAttribute("id")
                //deliverBook(ReqID)

                swal({
                    type: 'success',
                    title: 'Entregue!',
                    text: `O livro "${bookDeliver[i]}" foi entrgue.`,
                    showConfirmButton: true,
                    confirmButtonColor: '#FFD892',
                    allowOutsideClick: false
                })
            })        
        }
    }
/*
    
    function deliverBook(id) {   
        renderLibrariesParish()
        BookDisplay()
        
        // Loads libraries into to combobox
        function renderLibrariesParish() {
    
            let tempLibraries = []
    
            for (var i = 0; i < libraries.length; i++) {
                if (tempLibraries.indexOf(libraries[i].parish) == -1) {
                    tempLibraries.push(libraries[i].parish)   
                    console.log("oooo " + tempLibraries) 
                }
            } 
    
            console.log(libraries)
        
           
            let strHtml = "<option value=''>Bibliotecas</option>"
            for (let i = 0; i < tempLibraries.length; i++) {       
                strHtml += `<option value='${tempLibraries[i]}'>${tempLibraries[i]}</option>`             
            }
        
            deliverLibraries.innerHTML = strHtml        
        }
    
    
        // Displays the books
        function BookDisplay() {
        
            let deliverBookTitle = document.getElementById("deliverBookTitle")
            let deliverBookCover = document.getElementById("deliverBookCover")
        
                for (let i = 0; i < books.length; i++) {
                if(books[i].id == id) {
                    for (let j = 0; j < requests.length; j++) {
                    if (requests[j].bookId == books[i].id)
                    
                    console.log("idrequest_" + requests[j].bookId) 
                    console.log("id_" + books[i].bookTitle) 
        
                    deliverBookTitle.innerHTML = books[i].bookTitle
                    deliverBookCover.src = books[i].bookCover
            
                }}}
            
        }
    
    
       // Delivery button
       let btnDeliver = document.getElementById("btnDeliver")
    btnDeliver.addEventListener("click", function(event) {
    
          
          let strError = ""
          let tempStrArray = []
    
          // Checks if the library is full
          let cont = 0
      
          for (let j = 0; j < libraries.length; j++) {
            for (let i = 0; i < books.length; i++) {
                if(deliverLibraries.value == libraries[j].parish && books[i].libraryId == libraries[j].id) {
                    cont++
            }}}
      
    
              for (let i = 0; i < libraries.length; i++) {
                  if((deliverLibraries.value == libraries[i].parish) && (cont >= libraries[i].bookCapacity)) {
                    console.log(cont)
                    strError += "A biblioteca está cheia!\nPor favor, escolha outra."
                } }
            
                tempStrArray.indexOf(strError) == -1
                tempStrArray.push(strError) 
        
          
          //---------------------------------------------------
      
          if(strError == "") {
      
          // Gets current date
          let date = new Date()
          let day = date.getDate()
          let month = date.getMonth()+1
          let year = date.getFullYear()
          
          if(day < 10) {
              day = '0'+ day
          } 
          
          if(month < 10) {
              month = '0'+ month
          } 
          
          date = month + '/' + day + '/' + year
      
          for (let i = 0; i < books.length; i++) {
            if(books[i].id == id) {
              for (let j = 0; j < requests.length; j++) {
                if(books[i].id == requests[j].bookId) {
      
                  requests[j].deliveryDate = date      
          
          } } } } 
    
          localStorage.setItem("requests", JSON.stringify(requests))
          //---------------------------------------------------
      
          // Updates the library code of the book with the new library location for delivery
          for (let i = 0; i < books.length; i++) {
            if(books[i].id == id) { 
              for (let j = 0; j < libraries.length; j++) {
                if(deliverLibraries.value == libraries[j].parish) {
      
                  books[i].libraryId = libraries[j].id
      
          } } } }
    
          localStorage.setItem("books", JSON.stringify(books))
          //---------------------------------------------------
      
    
          // Updates the user's fine value if needed
          ///VERIFICAR
          let diff = 0
          
          for (let i = 0; i < books.length; i++) {
           if(books[i].id == id) {
            for (let j = 0; j < requests.length; j++) {
                if (requests[j].bookId == books[i].id) {
                    
                  diff = new Date(requests[j].requestDate) - new Date(requests[j].deliveryDate)
      
          }}}}
          
          
          for (var i = 0; i < users.length; i++) {
              if(users[i].id == userCurrent) { 
                if(diff > users[i].fineValue ) { 
                  users[i].fineValue = diff
                   strError += "\nExistem multas por pagar!"
            } } }
    
            sessionStorage.setItem("users", JSON.stringify(users))
          //---------------------------------------------------
      
          
          // Closes the modal
          $('#modalDeliver').modal('hide')
      
          
          } else {
      
              alert(strError)
      
          }
      
    })
    }*/


// ---------------------------------------
// MODAL
    
    /* request details */
    function addBookRequestInfo(id) {
        let strHtml = ""

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].bookId == id) {
                strHtml += `<div class='form-group text-center'>
                                <img id='viewCover' class='img-fluid img-thumbnail' src='${Book.getBookCoverById(requests[i].bookId)}'>
                                <h4>${Book.getBookTitleById(requests[i].bookId)}</h4>
                                <h6>${Book.getBookAuthorsById(requests[i].bookId)}</h6>
                            </div>

                            <div class='row'>
                                <div class='col-md-6'>
                                    <p><strong>Data de requisição:</strong> ${Request.getRequestDateByBookId(requests[i].bookId)}</p>
                                </div>
                                <div class='col-md-6'>
                                    <p><strong>Data de entrega:</strong> ${Request.getDeliveryDateByBookId(requests[i].bookId)}</p>
                                </div>
                            </div>

                            <div class='row'>
                                <div class='col-md-5'>
                                    <label for="viewRequestCategory'>Categoria</label>
                                    <input type='text' class='form-control-plaintext' id='viewRequestCategory' value='${convertFirstToUpperCase(Category.getCategoryById(Book.getBookCategoryById(requests[i].bookId)))}' readonly>
                                </div>

                                <div class='col-md-5'>
                                    <label for="viewRequestLibrary'>Biblioteca</label>
                                    <input type='text' class='form-control-plaintext' id='viewRequestLibrary' value='${Library.getCityById(Book.getBookLibraryById(requests[i].bookId))}, ${Library.getParishById(Book.getBookLibraryById(requests[i].bookId))}' readonly>
                                </div>
                            </div>`
            }
        }
        modalRequestBookInfo.innerHTML = strHtml
    }
    
    /*
                                <p><b>Autor:</b> ${livros[j].autorToString("../")}</p>
                                <p><b>Descrição:</b> ${livros[j].descricao}</p> 
                                <p><b>Ano:</b> ${livros[j].ano}</p>
                                <p><b>Tags:</b> ${Tag.getNomesByIds(livros[j].idTags).join(", ")}</p>
                                <p><b>Editora:</b> ${livros[j].editora}</p>
                                <p><b>Páginas:</b> ${livros[j].paginas}</p>
                                <p><b>Estado:</b> ${livros[j].estadoToString()}</p>
                                <p><b>Data de doação:</b> ${livros[j].dataDoacao}</p>
                                <p><b>ID biblioteca:</b> ${livros[j].idBiblioteca}</p>
                                <p><b>Doador:</b> ${doador}</p>
                                <p><b>Pontuação média:</b> ${livros[j].getPontuacaoMedia()}</p>*/
    
    /* rating */
    function addBookInfoToRating(id) {
        let strHtml = ""

        for (let i = 0; i < requests.length; i++) {
            if (requests[i].userId == userCurrent && requests[i].bookId == id) {

                strHtml += `<img id='viewCover' class='img-fluid img-thumbnail' src='${Book.getBookCoverById(requests[i].bookId)}'>
                            <h4>${Book.getBookTitleById(requests[i].bookId)}</h4>`
            }
        }
        modalRatingBookInfo.innerHTML = strHtml
    }


// ---------------------------------------
// ---------------------------------------
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

        loadRequests()
        console.log(requests)
        
        loadLibraries()
        console.log(libraries)
    //
    
    
    // --------------------------------------
    // USER HISTORY VARIABLES

        /* forms */
        let frmRating = document.getElementById("frmRating")
        let frmViewRequestDetails = document.getElementById("frmViewRequestDetails")

        /* tables */
        let tblRequestsHistory = document.getElementById("tblRequestsHistory")
        let tblRequestsCurrent = document.getElementById("tblRequestsCurrent")

        /* inputs */
        let modalRequestBookInfo = document.getElementById("modalRequestBookInfo")
        let modalRatingBookInfo = document.getElementById("modalRatingBookInfo")
        let modalRatingInput = document.getElementById("modalRatingInput")

        /* buttons */
        let modalAddRating = document.getElementById("modalAddRating")


        //////
        let deliverLibraries = document.getElementById("deliverLibraries")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* tables */
        renderTablePreviousRequests()
        renderTableCurrentRequests()
    //


    // --------------------------------------
    // FORMS

        /* rating */
       /*  modalRating.addEventListener("click", function(event) {
             Book.rateBookById()
             event.preventDefault()
        })*/
})