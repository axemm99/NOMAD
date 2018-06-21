
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
// USER PROFILE

    /* user info */
    function addUserInfo() {
        for (let i = 0; i < users.length; i++) {
            if (userCurrent == users[i].id) {
                viewName.value = users[i].userName
                viewEmail.value = users[i].userEmail
                viewPassword.value = users[i].userPassword
                viewFine.value = users[i].fineValue
                
                if (users[i].userPhoto != "") {
                viewPhoto.src = users[i].userPhoto
                }
                else {
                    viewPhoto.src = "../images/profileIcon.png"
                }
            }
        }
    }

    /* edit user photo */
    function editUserPhoto(newPhoto) {
        for (let i = 0; i < users.length; i++) {
            User.editUserPhotoById(userCurrent, newPhoto)
            localStorage.setItem("users", JSON.stringify(users))
        }

        viewPhoto.src = newPhoto
    
        $('#changePhotoModal').modal('hide')
    }

    /* edit user password */
    function editUserPassword(newPass, confirmPass) {
        let strError = ""
        let tempPass = parseInt(newPass)

        for (let i = 0; i < users.length; i++) {
            if (users[i].id == userCurrent) {
                if (newPass != confirmPass) {
                    strError = 'A password e a confirmação tem de ser iguais!'
                }
            }
        }

        if (strError == "") {          
            User.editUserPasswordById(userCurrent, tempPass)
            localStorage.setItem("users", JSON.stringify(users))
            viewPassword.value = newPass

            swal({
                type: 'success',
                title: `Password alterada`,
                text: 'A sua password foi alterada com sucesso!',
                confirmButtonColor: '#FFD892',
                allowOutsideClick: false                
            })

            $('#changePasswordModal').modal('hide')
        }
        else {
            console.log(strError)
            swal({
                type: 'error',
                title: `Oops...`,
                text: strError,
                confirmButtonColor: '#FFD892',
                allowOutsideClick: false
            })
        }
    }



    function payCurrentFine(){
        let strHtml = ""
    
        for (let i = 0; i < users.length; i++) {
            if (userCurrent == users[i].id) {
                strHtml = `<p>${users[i].fineValue}</p>`
                console.log(users[i].fineValue)
            }
        }    
        viewCurrentFine.innerHTML = strHtml
    
    
    
    
        frmFine.addEventListener("submit", function(event){
    
            for (let i = 0; i < users.length; i++) {
                if (users[i].id == userCurrent) {
                    users[i].fineValue = users[i].fineValue - parseInt(modalPayFine.value)
                    viewFine.value = users[i].fineValue
                }
            }
            localStorage.setItem("users", JSON.stringify(users))
            
            $('#modalViewFine').modal('hide')
            event.preventDefault()
        })
    }







//

// --------------------------------------
// --------------------------------------
addLoadEvent(function() {

    // --------------------------------------
    // LOAD LOCAL STORAGE
        loadUsers()
        console.log(users)
    //
    
    
    // --------------------------------------
    // USER PROFILE VARIABLES

        /* forms */
        let frmProfile = document.getElementById("frmProfile")   //////
        let frmPhoto = document.getElementById("frmPhoto")
        let frmPassword = document.getElementById("frmPassword")
        let frmFine = document.getElementById("frmFine")

        /* inputs */
        let viewName = document.getElementById("viewName")
        let viewEmail = document.getElementById("viewEmail")
        let viewPassword = document.getElementById("viewPassword")
        let viewFine = document.getElementById("viewFine")
        let viewPhoto = document.getElementById("viewPhoto")
        let viewCurrentFine = document.getElementById("viewCurrentFine")
        let modalChangePhotoLink = document.getElementById("modalChangePhotoLink")
        let modalNewPassword = document.getElementById("modalNewPassword")
        let modalConfirmPassword = document.getElementById("modalConfirmPassword")
        let modalPayFine = document.getElementById("modalPayFine")
    
        /* buttons */
        let btnViewFine = document.getElementById("btnViewFine")
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* user profile */
        addUserInfo()


        
        payCurrentFine()
    //


    // --------------------------------------
    // FORMS

        /* edit photo */
        frmPhoto.addEventListener("submit", function(event) {
            editUserPhoto(modalChangePhotoLink.value)
            event.preventDefault()
        })
    
        /* edit password */
        frmPassword.addEventListener("submit", function(event) {            
            editUserPassword(modalNewPassword.value, modalConfirmPassword.value)
            event.preventDefault()
        })
    //
})