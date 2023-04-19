function openRegister(){
    window.open("registrar.html", "_self")
}
function openLogin(){
    window.open("iniciarSesion.html", "_self")
}
function openPaginaPrincipal(){
    window.open("paginaPrincipal.html", "_self")
}

function desplegable(){
    if (document.getElementById("nav").style.display == "none"){
    document.getElementById("nav").style.display = "block";
    }
    else{document.getElementById("nav").style.display = "none";}
}

const expresiones = {
	usuario: /^[a-zA-Z]/,
	contraseña: /^[a-z0-9]{0,8}/,
}

function setStorage(){
    var x = 1;
    var founded = false;
    var username = document.getElementById("name").value;
    var contra = document.getElementById("password").value;
    var correo = document.getElementById("email").value; 

    if(comprobar(username, contra, correo)){
        while (founded == false){
            if(correo == localStorage.getItem("correo "+x)){
                alert("ya hay una cuenta con este correo");
                founded = true;
            } 
            if(username == localStorage.getItem("usuario "+x)){
                alert("ya hay una cuenta con este usuario");
                founded = true;
            } 
            if(localStorage.getItem("usuario "+x) == null){

                localStorage.setItem("usuario "+x, username);
                localStorage.setItem("contraseña "+x, contra);
                localStorage.setItem("correo "+x, correo);
                localStorage.setItem("NumeroTotalCuentas", x);
                founded = true;
                localStorage.setItem("loginAcc", username);
                console.log("aa")
                window.open("paginaPrincipal.html", "_self");
                
            }
            /*comprobamos si hay alguna cuenta con el mismo correo al recorrer todos los correos que existen */
            
            x++;
        }
    }
}

function comprobar(usu, contra, correo){
    if(!(/^[a-zA-Z]/.test(usu))){
        window.alert("El usuario solo puede contener letras mayusculas y minusculas");
        return false;
    }
    if(!(/^[a-z0-9]/.test(contra))){
        window.alert("Solo los siguientes caracteres están aceptados: (a-z, 0-9)");    
        return false;
    }
    if(!(/^[a-z0-9]{0,8}$/.test(contra))){
        window.alert("La contraseña debe de ser como maximo de 8 caracteres");  
        return false;
    }
    if(!(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}$/.test(correo))){
        window.alert("El correo debe tener el formato correcto");  
        return false;
    }
    return true;
}

function comprobarDatos(){
	correcto = false;
	var correoLogin = document.getElementById("email").value;
	

	var contraseñaLogin = document.getElementById("password").value;
	var x = localStorage.getItem("NumeroTotalCuentas");
	for(var ii=1; ii <= x; ii++){
        var usuarioLogin = localStorage.getItem("usuario "+ii);
		if(correoLogin === localStorage.getItem("correo "+ii)){
			if (contraseñaLogin == localStorage.getItem("contraseña "+ii)){
				localStorage.setItem("loginAcc", usuarioLogin);
				window.open("paginaPrincipal.html", "_self");
				correcto = true;
			}
		}
	}
	if (!correcto){
		alert("Datos erroneos")
	}
}

