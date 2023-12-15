const loadAllTable = () => {
  fetch("https://api-dishes.vercel.app/")
    .then((info) => info.json())
    .then((datos) => {
        const tbody1 = document.getElementById("tbody");
        tbody1.innerHTML = "";
      datos.data.forEach((element) => {

        const select = document.createElement("option");

        select.value = element._id;
        select.textContent = element.name;

        document.getElementById("select1").appendChild(select);

        const bt = document.createElement("button");

        const row = document.createElement("tr");

        bt.type = "button";
        bt.classList.add("col", "btn", "btn-primary");
        bt.textContent = "mostrar todas";

        row.innerHTML = `
          <th scope="row style="color: red;">${element._id}</th>
          <td>${element.name}</td>
          <td>${element.calories}</td>
          <td>${element.isVegetarian}</td>
          <td>${element.value}</td>
          <td>${element.comments}</td>
          `;

        if (element.isVegetarian == false || element.isVegetarian == null) {
          row.classList.add("table-danger");
        }
        tbody1.appendChild(row);
      });
    })
    .catch((error) => console.log(error));
};

const actualizarTabla = (datos) => {
  const map = [datos];
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  map.forEach((element) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <th scope="row style="color: red;">${element._id}</th>
        <td>${element.name}</td>
        <td>${element.calories}</td>
        <td>${element.isVegetarian}</td>
        <td>${element.value}</td>
        <td>${element.comments}</td>
          `;
    document.getElementById("tbody").appendChild(row);
  });
};

document.getElementById("select1").addEventListener("change", () => {
  const valor = document.getElementById("select1").value;
  fetch(`https://api-dishes.vercel.app/${valor}`)
    .then((response) => response.json())
    .then((r) => {
      actualizarTabla(r.data);
    })
    .catch((err) => console.error(err));
});

document.getElementById("button").addEventListener("click", () => {
  loadAllTable();
});

document.getElementById("btnDelete").addEventListener("click", () => {
  const valueId = document.getElementById("select1").value;
  const URI = `https://api-dishes.vercel.app/${valueId}`;
  fetch(URI, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.state) {
        loadAllTable();
        // Restablecer el valor seleccionado en el elemento select
        var selectElement2 = document.getElementById("select1");
        selectElement2.selectedIndex = 0; // Establece la opción predeterminada como seleccionada
        alert("Eliminado");
      } else {
        alert("some wrong");
      }
    });
});

document.getElementById("Agregar").addEventListener("click", () => {
  const id = document.getElementById("idSend").value;
  const name = document.getElementById("nameSend").value;
  const calories = document.getElementById("caloriesSend").value;
  const value = document.getElementById("valueSend").value;
  const vegetarian = document.getElementById("vegetarianSend").value;
  const comments = document.getElementById("commentsSend").value;

  if (validateFields(id, name, calories, vegetarian, value, comments)) {
    const dataSend = {
      idDish: id,
      name: name,
      calories: calories,
      isVegetarian: vegetarian,
      value: value,
      comments: comments,
    };

    //falta validar para que no deje campos vacios
    const URI = "https://api-dishes.vercel.app/";
    fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.state) {
          alert("Agregado!!");
          cleanFields();
          loadAllTable();
        } else {
          alert("some wrong");
        }
      })
      .catch((err) => console.log(err));
  } else {
    alert("por favor llene todos los campos");
  }
});

document.getElementById("limpiar").addEventListener("click", () => {
  cleanFields();
});

const cleanFields = () => {
  document.getElementById("idSend").value = "";
  document.getElementById("nameSend").value = "";
  document.getElementById("caloriesSend").value = "";
  document.getElementById("valueSend").value = "";
  document.getElementById("commentsSend").value = "";

  // Restablecer el valor seleccionado en el elemento select
  var selectElement = document.getElementById("vegetarianSend");
  selectElement.selectedIndex = 0; // Establece la opción predeterminada como seleccionada
};

const validateFields = (id, name, calories, vegetarian, value, comments) => {
  const validate =
    id == undefined ||
    name == undefined ||
    calories == undefined ||
    vegetarian == undefined ||
    value == undefined ||
    comments == undefined ||
    id == null ||
    name == null ||
    calories == null ||
    vegetarian == null ||
    value == null ||
    comments == null ||
    vegetarian == "isVegetarian"
      ? false
      : true;
  return validate;
};
loadAllTable();
