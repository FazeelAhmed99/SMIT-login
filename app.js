var email = "fazeelahmedkhan@gmail.com"
var password = "SMIT123456"
const obj = {
    email: email,
    password: password,
    uid: "fhOYsHyr5IU0n5ib02pjYm4Lebo2"
}
firebase.database().ref('/admin').child("fhOYsHyr5IU0n5ib02pjYm4Lebo2").set(obj)

const sigup = () => {
    var email = document.getElementById("email").value
    var name = document.getElementById("name").value
    var password = document.getElementById("pass").value
    var select = document.getElementById("select").value
    // console.log(email,name,password,select)

    if (email == '' || name == '' || password == "" || select == "") {
        alert("Enter Correct Values")
    }
    else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
            var user = result.user;
            console.log("User :", user)
            console.log("User Uid:", user.uid)


            var obj = {
                Name: name,
                email: email,
                password: password,
                type: select,
                uid: user.uid
            }

            firebase.database().ref(`/${select}`).child(user.uid).set(obj)
                .then((data) => {
                    // window.location='login.html'

                })
            // window.location='login.html'
        })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
    }

}

const sigin = () => {
    var email = document.getElementById("email").value
    var password = document.getElementById("pw").value
    if (email == '' || password == "") {
        alert("Enter Correct Values")
    }
    else {
        firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
            var user = result.user;
            console.log(user)
            console.log("User Email :", user.email)
            console.log("User Uid :", user.uid)

            localStorage.setItem('Current_user Uid', user.uid)

            // firebase.database().ref('').

            firebase.database().ref('/admin').orderByChild('uid').equalTo(user.uid).once('value').then((snap) => {
                var data = snap.toJSON()

                if (data == null) {
                    firebase.database().ref('/Student').orderByChild('uid').equalTo(user.uid).once('value').then((snap) => {
                        var data = snap.toJSON()

                        if (data == null) {
                            firebase.database().ref('/Teacher').orderByChild('uid').equalTo(user.uid).once('value').then((snap) => {
                                var data = snap.toJSON()
                                if (data == null) {
                                    alert("Doesn't Exist. Sign Up First!!!")
                                }
                                else {
                                    window.location = "teacher.html"
                                }
                            })

                        }
                        else {
                            window.location = 'student.html'

                        }
                    })

                }
                else {
                    window.location = 'admin.html'
                }
            })


        })



    }

}


