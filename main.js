document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("DOM Ready");
}

/* dark mode
---------- */
function darkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");

  var nav_li = document.getElementsByClassName("nav-li");
  for (var i = 0; i < nav_li.length; i++) {
    nav_li[i].classList.toggle("nav-li-dark-mode");
  }
}

/* burguer
---------- */
var burgerMenu = document.querySelector(".menu-burger");
var burgerLista = document.querySelectorAll(".burger-li");

function toggleMenu() {
  burgerMenu.classList.toggle("active");
}

//Cerrar si pulsamos algun link
burgerLista.forEach(function (item) {
  item.addEventListener("click", function () {
    toggleMenu();
  });
});

/* video
---------- */
var modal = document.getElementById("video-modal");
var btn = document.getElementById("show-video");
var spanCloseVideo = document.querySelector(".close-video");
var localVideo = document.getElementById("local-video");

btn.onclick = function () {
  modal.style.display = "block";
};

spanCloseVideo.addEventListener("click", function () {
  modal.style.display = "none";
  localVideo.pause();
});

// Cerrar el modal haciendo clic fuera
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    localVideo.pause();
  }
};

/* testimonios
---------- */
document.addEventListener("DOMContentLoaded", () => {
  var prevButton = document.querySelector(".prev");
  var nextButton = document.querySelector(".next");
  var carouselInner = document.querySelector(".carousel-inner");
  var testimonios = document.querySelectorAll(".testimonio");

  var index = 0;

  prevButton.addEventListener("click", () => {
    if (index === 0) {
      index = testimonios.length - 1;
    } else {
      index--;
    }
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    if (index === testimonios.length - 1) {
      index = 0;
    } else {
      index++;
    }
    updateCarousel();
  });

  function updateCarousel() {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
  }
});

/* usuario
---------- */
document.addEventListener("DOMContentLoaded", function () {
  var botonLoginNav = document.getElementById("login-nav");
  var botonLoginBurger = document.getElementById("login-burger");

  botonLoginNav.addEventListener("click", function () {
    registraUsuario(botonLoginNav);
  });
  botonLoginBurger.addEventListener("click", function () {
    registraUsuario(botonLoginBurger);
  });

  function registraUsuario(botonLogin) {
    var usuario = obtenerInformacionUsuario();

    if (usuario === null) {
      // No hay usuario registrado
      mostrarRegistro(botonLogin);
    } else {
      // Hay un usuario registrado
      mostrarPerfil(usuario);
    }
  }

  function mostrarRegistro(botonLogin) {
    var modalRegistro = document.getElementById("registro-modal");
    var spanCloseRegistro = document.querySelector(".close-registro");

    modalRegistro.style.display = "block";

    spanCloseRegistro.addEventListener("click", function () {
      modalRegistro.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalRegistro) {
        modalRegistro.style.display = "none";
      }
    });

    var registroForm = document.getElementById("registro-form");

    registroForm.addEventListener("submit", function (event) {
      event.preventDefault();

      modalRegistro.style.display = "none";

      // Cambiar icono
      botonLogin.classList.add("login-in");

      // Actualizar el evento para mostrar el perfil
      botonLogin.removeEventListener("click", function () {
        registraUsuario(botonLogin);
      });
      botonLogin.addEventListener("click", mostrarPerfilActualizado);
    });
  }

  function mostrarPerfil(usuario) {
    var modalPerfil = document.getElementById("perfil-modal");
    var spanClosePerfil = document.querySelector(".close-perfil");
    var emailSpan = document.getElementById("email");
    var passwordSpan = document.getElementById("password");
    var fechaRegistroSpan = document.getElementById("fecha-registro");

    modalPerfil.style.display = "block";

    spanClosePerfil.addEventListener("click", function () {
      modalPerfil.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalPerfil) {
        modalPerfil.style.display = "none";
      }
    });

    emailSpan.textContent = usuario.email;
    passwordSpan.textContent = usuario.password;
    fechaRegistroSpan.textContent = obtenerFechaActual();
  }

  function mostrarPerfilActualizado() {
    var usuario = obtenerInformacionUsuario();
    mostrarPerfil(usuario);
  }

  function obtenerInformacionUsuario() {
    var email = document.getElementById("correo").value;
    var password = document.getElementById("contraseña").value;
    if (email && password) {
      return {
        email: email,
        password: password,
      };
    } else {
      return null;
    }
  }

  function obtenerFechaActual() {
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var año = fechaActual.getFullYear();
    return dia + "/" + mes + "/" + año;
  }
});

/* galeria
---------- */
// La variable categorias se encuentra en el archivo categorias.js
document.addEventListener("DOMContentLoaded", function () {
  // Comprueba si existe categorias.js
  if (typeof categorias === "undefined") {
    console.error("Error, no ha sido cargado el archivo categorias.js");
    return;
  }

  var container = document.querySelector(".galeria .container");

  // Botones y sus contenedores de tatuajes
  Object.keys(categorias).forEach((categoria, index) => {
    var categoriaContainer = document.createElement("div");
    categoriaContainer.classList.add("categoria-container");
    categoriaContainer.setAttribute("data-categoria", categoria);

    var btn = document.createElement("button");
    btn.classList.add("categoria-btn");

    // Añadir clase para css de imagen
    switch (index) {
      case 0:
        btn.classList.add("anime");
        break;
      case 1:
        btn.classList.add("comic");
        break;
      case 2:
        btn.classList.add("gaming");
        break;
      case 3:
        btn.classList.add("peliculas");
        break;
      case 4:
        btn.classList.add("series");
        break;
      default:
        break;
    }
    btn.setAttribute("data-categoria", categoria);
    // Pone la primera en mayuscula
    btn.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);

    var tattooList = document.createElement("div");
    tattooList.classList.add("tattoo-list");
    tattooList.id = `tattoo-list-${categoria}`;
    tattooList.style.display = "none"; // Inicialmente oculto

    categoriaContainer.appendChild(btn);
    container.appendChild(categoriaContainer);
    container.appendChild(tattooList);
  });

  var categoriaBtns = document.querySelectorAll(".categoria-btn");

  categoriaBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      var categoria = this.getAttribute("data-categoria");
      mostrarTatuajes(categoria);
    });
  });

  // Filtra tatuajes segun categoria
  function mostrarTatuajes(categoria) {
    var tattooList = document.getElementById(`tattoo-list-${categoria}`);
    var isHidden = tattooList.style.display === "none";

    // Ocultar todas las listas de tatuajes
    document.querySelectorAll(".tattoo-list").forEach((list) => {
      list.style.display = "none";
    });

    // Si el display esta en 'none'
    if (isHidden) {
      // Limpiar la lista actual
      tattooList.innerHTML = "";

      var filtrados = categorias[categoria];

      filtrados.forEach((tattoo) => {
        var item = document.createElement("div");
        item.classList.add("tattoo-item");
        //data- para el carrito
        item.innerHTML = `
          <img src="${tattoo.img}" alt="${tattoo.titulo}">
          <div class="tattoo-details">
            <p>${tattoo.titulo}</p>
            <p>Precio: ${tattoo.precio}€</p>
            <button class="añadir-carro btn btn-default" data-titulo="${tattoo.titulo}" data-precio="${tattoo.precio}">Añadir al Carrito</button>
          </div>
        `;
        tattooList.appendChild(item);
      });

      tattooList.style.display = "grid";
    }
  }
});

/* buscador
---------- */
document.addEventListener("DOMContentLoaded", function () {
  var searchBar = document.querySelector(".search-input");
  var inputBuscarBurger = document.getElementById("buscar-burger");
  var searchBtn = document.querySelector(".search");
  var modalBuscador = document.querySelector(".buscador-modal");
  var modalBuscadorContent = document.querySelector(".buscador-modal-content");

  searchBtn.addEventListener("click", function () {
    var searchTerm = searchBar.value.trim().toLowerCase();
    if (searchTerm !== "") {
      mostrarPorNombre(searchTerm);
    }
  });

  //Tecla 'Enter' Burguer
  inputBuscarBurger.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      var searchTerm = inputBuscarBurger.value.trim().toLowerCase();
      if (searchTerm !== "") {
        mostrarPorNombre(searchTerm);
      }
    }
  });

  //Tecla 'Enter' Nav
  searchBar.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      var searchTerm = searchBar.value.trim().toLowerCase();
      if (searchTerm !== "") {
        mostrarPorNombre(searchTerm);
      }
    }
  });

  // Filtrar por titulo
  function mostrarPorNombre(titulo) {
    // Limpiar resultados anteriores
    modalBuscadorContent.innerHTML = "";

    let resultadosEncontrados = false;

    // Recorrer todos los tatuajes
    Object.values(categorias)
      .flat()
      .forEach((tattoo) => {
        if (tattoo.titulo.toLowerCase().includes(titulo)) {
          var item = document.createElement("div");
          item.classList.add("tattoo-item-buscador");
          item.innerHTML = `
        <img src="${tattoo.img}" alt="${tattoo.titulo}">
        <div class="tattoo-details">
          <p>${tattoo.titulo}</p>
          <p>Precio: $${tattoo.precio}</p>
          <button class="añadir-carro btn btn-default" data-titulo="${tattoo.titulo}" data-precio="${tattoo.precio}">Añadir al Carrito</button>
        </div>
      `;
          modalBuscadorContent.appendChild(item);
          resultadosEncontrados = true;
        }
      });

    // Si no se encontraron resultados, mostrar un mensaje
    if (!resultadosEncontrados) {
      var mensaje = document.createElement("p");
      mensaje.textContent = "No se encuentra ningun tatutaje con ese nombre.";
      modalBuscadorContent.appendChild(mensaje);
    }

    // Mostrar el modal
    modalBuscador.style.display = "block";
  }

  // Cerrar el modal
  window.addEventListener("click", function (event) {
    if (event.target == modalBuscador) {
      modalBuscador.style.display = "none";
    }
  });
});

/* carrito
---------- */
document.addEventListener("DOMContentLoaded", function () {
  var carritoModal = document.getElementById("carrito-modal");
  var closeCarritoBtn = document.querySelector(".close-carrito");
  var confirmarBtn = document.getElementById("confirmar-btn");
  var cancelarBtn = document.getElementById("cancelar-btn");
  var carritoItems = document.getElementById("carrito-items");
  var totalCarrito = document.getElementById("precio-total");
  var carrito = [];

  // Mostrar mensaje si carrito esta vacio
  if (carrito.length === 0) {
    actualizarTotal();
  }
  //Actualiza el total
  function actualizarTotal() {
    var total = calcularTotal();
    if (total !== null) {
      totalCarrito.textContent = "Total: $" + total;
    } else {
      totalCarrito.textContent = "No hay elementos en el carrito";
    }
  }

  // Calcular total, devuelve null si no hay tattoos
  function calcularTotal() {
    if (carrito.length === 0) {
      return null;
    }
    return carrito.reduce(function (total, tattoo) {
      return total + tattoo.precio;
    }, 0);
  }

  function abrirCarritoModal() {
    carritoModal.style.display = "block";
  }

  // Abrir el modal del carrito
  document
    .querySelector(".carrito")
    .addEventListener("click", abrirCarritoModal);
  document
    .getElementById("carrito-burger")
    .addEventListener("click", abrirCarritoModal);

  // Agregar un tattoo al carrito
  function agregarAlCarrito(tattoo) {
    carrito.push(tattoo);
    alert("Añadido al carrito");
    mostrarCarrito();
  }

  // Mostrar el contenido del carrito
  function mostrarCarrito() {
    carritoItems.innerHTML = ""; // Limpiar el contenido previo

    carrito.forEach(function (tattoo, index) {
      var item = document.createElement("div");
      item.classList.add("carrito-details");
      item.innerHTML = `
          <p>${tattoo.titulo} - ${tattoo.precio}€</p>
          <button class="eliminar-btn" data-index="${index}">Eliminar</button>
        `;
      carritoItems.appendChild(item);
    });

    // Eliminar un tatuaje
    document.querySelectorAll(".eliminar-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var index = parseInt(btn.dataset.index);
        eliminarTatuaje(index);
      });
    });
    // Actualizar el total
    actualizarTotal();
  }

  function eliminarTatuaje(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
  }

  // Botones "Añadir al Carrito"
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("añadir-carro")) {
      var tattoo = {
        titulo: event.target.dataset.titulo,
        precio: parseFloat(event.target.dataset.precio),
      };

      agregarAlCarrito(tattoo);
    }
  });

  // Cerrar el modal
  closeCarritoBtn.addEventListener("click", cerrarCarritoModal);

  window.addEventListener("click", function (event) {
    if (event.target === carritoModal) {
      cerrarCarritoModal();
    }
  });

  function cerrarCarritoModal() {
    carritoModal.style.display = "none";
  }

  // Confirmar la compra
  confirmarBtn.addEventListener("click", function () {
    if (carrito.length > 0) {
      alert("¡Compra realizada!");
      carrito = [];
      mostrarCarrito();
      cerrarCarritoModal();
    }
  });

  // Cancelar la compra
  cancelarBtn.addEventListener("click", function () {
    carrito = []; // Limpiar el carrito
    mostrarCarrito();
    cerrarCarritoModal();
  });
});

/* contacto
---------- */
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("enviar-contacto")
    .addEventListener("click", validar, false);

  function validar(eventopordefecto) {
    if (
      validarcampostexto() &&
      validarEmail() &&
      confirm("¿Deseas enviar el formulario?")
    ) {
      alert("¡Gracias por ponerte en contacto!");
      // Limpiar los campos
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
      return true;
    } else {
      eventopordefecto.preventDefault();
      return false;
    }
  }

  // Validar campos de texto
  function validarcampostexto() {
    var camposTexto = document.querySelectorAll(
      ".contact-info input[type='text']"
    );
    for (var i = 0; i < camposTexto.length; i++) {
      var valor = camposTexto[i].value.trim();
      if (valor === "") {
        camposTexto[i].classList.add("error");
        alert("El nombre no debe estar vacio.");
        return false;
      } else {
        camposTexto[i].classList.remove("error");
      }
    }
    return true;
  }

  // Validar el formato del email
  function validarEmail() {
    var email = document.getElementById("email-contacto").value.trim();
    var emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("El formato del email es incorrecto.");
      return false;
    }
    return true;
  }
});

/* EOF
--------- */
