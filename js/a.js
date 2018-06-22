






















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
      loadConfig()
      
      let diffDays = 0

      for (let i = 0; i < books.length; i++) {
       if(books[i].id == id) {
        for (let j = 0; j < requests.length; j++) {
            if (requests[j].bookId == books[i].id) {
            
                var requestDate = new Date(requests[j].requestDate);
                var deliveryDate = new Date(requests[j].deliveryDate);
                var timeDiff = Math.abs(deliveryDate.getTime() - requestDate.getTime());
                diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                console.log("DIFF DAYS " + diffDays)

        }}}}


      for (var i = 0; i < users.length; i++) {
          if(users[i].id == userCurrent) { 
            if(diffDays > config.requestDays) { 

              users[i].fineValue = users[i].fineValue + config.fineValue

        } } }

        sessionStorage.setItem("users", JSON.stringify(users))
        localStorage.setItem("users", JSON.stringify(users))
      //---------------------------------------------------
  
      
      // Closes the modal
      $('#modalDeliver').modal('hide')
  
      
      } else {
  
          alert(strError)
  
      }
  
})
}