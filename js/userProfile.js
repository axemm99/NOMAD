
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

        /* inputs */
        let viewName = document.getElementById("viewName")
        let viewEmail = document.getElementById("viewEmail")
        let viewPassword = document.getElementById("viewPassword")
        let viewPhoto = document.getElementById("viewPhoto")
        let modalChangePhotoLink = document.getElementById("modalChangePhotoLink")
        let modalNewPassword = document.getElementById("modalNewPassword")
        let modalConfirmPassword = document.getElementById("modalConfirmPassword")   //////
    
        /* buttons */

        /* others */
    //


    // --------------------------------------
    // ON LOAD

        /* nav bar */
        navbarVisible()

        /* user profile */
        addUserInfo()
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