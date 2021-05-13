tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

//Agregar dinamicamente los "horarios" al select.
function cargarhorarios() {
    var horarios = ["Desayuno", "Almuerzo", "Once", "Cena"];
    var select = document.getElementById("hora-select");
    
    for(var i=0; i < horarios.length; i++){ 
        var option = document.createElement("option");
        option.innerHTML = horarios[i];
        select.appendChild(option);
    }
}
cargarhorarios();



const menus = [];
// Carga la tabla
const cargarTabla = () =>{
    let tbody = document.querySelector("#tabla-tbody");
    tbody.innerHTML = "";
    for(let i=0; i < menus.length; ++i){
        let p = menus[i];
        let tr = document.createElement("tr");
        let tdNombre = document.createElement("td");
        tdNombre.innerText = p.nombre
        let tdTipo = document.createElement("td");
        tdTipo.innerText = p.tipo;
        let tdValor = document.createElement("td");
        tdValor.innerText = "$"+p.valor;
        let tdDesc = document.createElement("td");
        tdDesc.innerHTML = p.descripcion;

        let tdOferta = document.createElement("td");
        let icono = document.createElement("i");
        if(p.tipo == "Desayuno"){
            if(p.valor<5000 ){
                icono.classList.add("fas","fa-check","text-success","fa-2x");
            }else{
                icono.classList.add("fas","fa-times","text-danger","fa-2x");
            }
        }else if(p.tipo == "Almuerzo"){
            if(p.valor<15000 ){
                icono.classList.add("fas","fa-check","text-success","fa-2x");
            }else{
                icono.classList.add("fas","fa-times","text-danger","fa-2x");
            }
        }else if(p.tipo == "Once"){
            if(p.valor<10000 ){
                icono.classList.add("fas","fa-check","text-success","fa-2x");
            }else{
                icono.classList.add("fas","fa-times","text-danger","fa-2x");
            }
        }else if(p.tipo == "Cena"){
            if(p.valor<20000 ){
                icono.classList.add("fas","fa-check","text-success","fa-2x");
            }else{
                icono.classList.add("fas","fa-times","text-danger","fa-2x");
            }
        }


        tdOferta.classList.add("text-center")
        tdOferta.appendChild(icono);

        tr.appendChild(tdNombre);
        tr.appendChild(tdTipo);
        tr.appendChild(tdValor);
        tr.appendChild(tdDesc);
        tr.appendChild(tdOferta);
        tbody.appendChild(tr);
    }
}
// Al apretar el boton "Registrar"
document.querySelector("#registrar-btn").addEventListener("click",()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let tipo = document.querySelector("#hora-select").value;
    let valor = document.querySelector("#valor-number").value;
    let descripcion = tinymce.get("descripcion-txt").getContent();

    // Se valida que los datos de los "inputs" sean correctos
    if(nombre.length == 0){
        swal.fire("Error","Debe llenar el campo del nombre.","warning");
    }else if((tipo == "Desayuno") && ((valor < 1000) || (valor > 10000) )) {
        swal.fire("Error","El valor del Desayuno debe ser entre 1000 y 10000 pesos.","warning")
    }else if((tipo == "Almuerzo") && ((valor < 10000) || (valor > 20000) )) {
        swal.fire("Error","El valor del Almuerzo debe ser entre 10000 y 20000 pesos.","warning")
    }else if((tipo == "Once") && ((valor < 5000) || (valor > 15000) )) {
        swal.fire("Error","El valor de la Once debe ser entre 5000 y 15000 pesos.","warning")
    }else if((tipo == "Cena") && (valor <= 15000)) {
        swal.fire("Error","El valor de la Cena debe ser mayor a 15000 pesos.","warning")
    }else{ // Si no hubo ningún error, se continua con la operación
        let menu = {};
        menu.nombre = nombre;
        menu.tipo = tipo;
        menu.valor = valor;
        menu.descripcion = descripcion;
        menus.push(menu);
        cargarTabla();
        //Titulo, texto, tipo: succes, info, danger, warning
        swal.fire("Éxito!","Registro de Menú realizado","success");

    }
    
} );