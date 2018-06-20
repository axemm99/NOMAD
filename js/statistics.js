
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


// ---------------------------------------
// PERCENTAGE

    /* total books per max capacity of all libraries */
    function percentageBookCapacity() {
        let totalBooks = books.length
        let totalCapacity = 0
        let percentage = 0
        let strHtml = ""

        for (let i = 0; i < libraries.length; i++) {
            totalCapacity += libraries[i].bookCapacity
        }

        percentage =  (totalBooks * 100) / totalCapacity

        strHtml += `<div class='col-md-12'>
                        <h6 class='inline col-md-6'>Capacidade de livros total</h6>
                        <p class='inline' style='float: right;'>${percentage}%</p>
                    </div>
                    <div class='progress'>
                        <div class='progress-bar progress-bar-blue' role='progressbar' aria-valuenow='${percentage}' aria-valuemin='0' aria-valuemax='100' style='width: ${percentage}%'></div>
                    </div>`
        barBookCapacity.innerHTML = strHtml
    }
//


// ---------------------------------------
// COUNTER

    /* total users */
    function counterTotalUsers() {
        let totalUsers = 0
        let strHtml = ""

        for (let i = 0; i < users.length; i++) {
            if (users[i].userPermissions == 2) {
                totalUsers++
            }            
        }

        strHtml += `<h6>Utilizadores</h6>
                    <h3>${totalUsers}</h3>`

        counterUsers.innerHTML = strHtml
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

        loadWishlists()
        console.log(wishlists)
        
        loadLibraries()
        console.log(libraries)
    //
    
    
    // --------------------------------------
    // USER HISTORY VARIABLES

        /* counters */
        let counterUsers = document.getElementById("counterUsers")

        /* bars */
        let barBookCapacity = document.getElementById("barBookCapacity")


        let inputStatistictsCategory = document.getElementById("inputStatistictsCategory")
        let btnChooseCategory = document.getElementById("btnChooseCategory")
        let inputStatistictsTag = document.getElementById("inputStatistictsTag")
        let btnChooseTag = document.getElementById("btnChooseTag")



    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* counter */
        counterTotalUsers()

        /* percentages */
        percentageBookCapacity()
        /*percentageBooks()
        addCategories()
        addTags()*/
    //


    // --------------------------------------
    // BUTTONS


/*
        btnChooseCategory.addEventListener("click", function(event){
            booksPerCategory()
        })

        btnChooseTag.addEventListener("click", function(event){
            booksPerTag()()
        })*/
    
        ///
})

/*
function percentageBooks(){
    
    let progressBarBooks = document.getElementById("progressBarBooks")

    let soma = 0
    let percentagem = 0
    let strHtml = ""


    for (let i = 0; i < libraries.length; i++) {
        soma = soma + parseInt(libraries[i].bookCapacity)
    }
    console.log(soma)

    percentagem =  (books.length * 100) / soma


    console.log(percentagem)
    strHtml += `<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow='${percentagem}' aria-valuemin="0" aria-valuemax='${soma}' style="width: ${percentagem}%"></div>`

    progressBarBooks.innerHTML = strHtml

}

function booksPerCategory(){

    let progressBarCategories = document.getElementById("progressBarCategories")

    let soma = 0
    let booksCategory = 0
    let percentagem = 0
    let strHtml = ""


    for (let i = 0; i < books.length; i++) {
        if(books[i].bookCategory == inputStatistictsCategory.value){
            booksCategory++
        }            

    }
    console.log("numero de livros: " + booksCategory)

    percentagem =  (booksCategory * 100) / books.length


    console.log("percentagem: " + percentagem)
    strHtml += `<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow='${percentagem}' aria-valuemin="0" aria-valuemax='${booksCategory}' style="width: ${percentagem}%"></div>`

    progressBarCategories.innerHTML = strHtml

}

function booksPerTag(){

    let progressBarTags = document.getElementById("progressBarTags")

    let soma = 0
    let booksTags = 0
    let percentagem = 0
    let strHtml = ""


    for (let i = 0; i < books.length; i++) {
            if(books[i].bookTags == inputStatistictsTag.value){
                booksTags++
            }
        
    }
    console.log("livros nas tags: " + booksTags)

    percentagem =  (booksTags * 100) / books.length


    console.log("percentagem tags: " + percentagem)
    strHtml += `<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow='${percentagem}' aria-valuemin="0" aria-valuemax='${booksTags}' style="width: ${percentagem}%"></div>`

    progressBarTags.innerHTML = strHtml

}

function addCategories(){
    let strHtml = "<option value=''>...</option>"
        let tempArray = []

        for (let i = 0; i < categories.length; i++) {
            let tempCategory = {
                id: categories[i].id,
                name: categories[i].name
            }
           tempArray.push(tempCategory)            
        }

        tempArray.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name

            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })

        for (let i = 0; i < tempArray.length; i++) {
            strHtml += `<option value='${tempArray[i].id}'>${tempArray[i].name}</option>`
        }
        
        inputStatistictsCategory.innerHTML = strHtml
}

function addTags(){
    let strHtml = "<option value=''>...</option>"
        let tempArray = []

        for (let i = 0; i < tags.length; i++) {
            let tempTag = {
                id: tags[i].id,
                name: tags[i].name
            }
           tempArray.push(tempTag)            
        }

        tempArray.sort(function(a, b) {
            let txtA = a.name
            let txtB = b.name

            return (txtA < txtB) ? -1 : (txtA > txtB) ? 1 : 0
        })

        for (let i = 0; i < tempArray.length; i++) {
            strHtml += `<option value='${tempArray[i].id}'>${tempArray[i].name}</option>`
        }
        
        inputStatistictsTag.innerHTML = strHtml
}*/
