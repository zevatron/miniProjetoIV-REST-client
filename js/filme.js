var urlRest = "http://localhost:8080/filmes";
$(document).ready( function(){
  if (location.pathname == "/home/zevatron/Documentos/IFPB/6-PD/filmerestclient/index.html"){
    console.log(window.location.pathname);
    listarFilmes();

  }
  if (location.pathname == "/home/zevatron/Documentos/IFPB/6-PD/filmerestclient/edit.html") {
    buscarPorId();
    atualizar();
  }
});

function listarFilmes() {
  $.ajax({
    url: urlRest+"/listar"
  }).then(function(data) {
    jQuery.each(data , function (i , filme) {
      console.log(filme);
      var str = '<tr>';
      str += '<td>' + filme.titulo + '</td>';
      str += '<td>' + filme.diretor + '</td>';
      str += '<td>' + filme.estudio + '</td>';
      str += '<td>' + filme.genero + '</td>';
      str += '<td>' + filme.ano + '</td>';
      str += '<td>' + "<a href='edit.html?id="+filme.id+"'><i class='far fa-edit'></i></a>" + '</td>';
      str += '<td>' + "<a href='#' onclick='excluir("+filme.id+")'><i class='fas fa-trash'></i></a>" + '</td>';
      str += '<td>' + "<a href='"+urlRest+"?id="+filme.id+"&tipo=application/xml' >xml</a>" + '</td>';
      str += '<td>' + "<a href='"+urlRest+"?id="+filme.id+"&tipo=application/json' >json</a>" + '</td>';
      str += '</tr>';
      $('#filmes').append(str);
    } );
  });
};
function buscarPorId(id,tipo) {
  if(id==null){
    id = new URL(location).searchParams.get('id');
    if(id == null){
      window.location.href = "file:///home/zevatron/Documentos/IFPB/6-PD/filmerestclient/index.html";
    }
  }
  // var tipo = new URL(location).searchParams.get('tipo')
  if (tipo == null){
    tipo = "application/json"
  }
  $.ajax({
    url: urlRest+"?id="+id+"&tipo="+tipo
  }).then(function(filme){
    console.log(filme);
    $("#titulo").val(filme.titulo);
    $("#diretor").val(filme.diretor);
    $("#estudio").val(filme.estudio);
    $("#genero").val(filme.genero);
    $("#ano").val(filme.ano);
  });
};

function cadastrar() {
    var titulo = $('#titulo').val();
    var diretor = $('#diretor').val();
    var estudio = $('#estudio').val();
    var genero = $('#genero').val();
    var ano = $('#ano').val();
    var urlCadastrar = new URL(urlRest);
    $.ajax({
      type: "POST",
      // dataType: "json",
      url: urlCadastrar,
      data: $.param({titulo: titulo, diretor: diretor, estudio: estudio, genero: genero, ano: ano}),
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: function(data){
        console.log(data);
        window.location.href = "file:///home/zevatron/Documentos/IFPB/6-PD/filmerestclient/index.html";
      },
      error: function(data){
        alert(data.responseText);
      }
    });
}

function atualizar() {
  $('#salvar').click(function(){
    var id = new URL(location).searchParams.get('id')
    var urlAtualizar = new URL(urlRest+"/"+id+"/"+$('#titulo').val());
    $.ajax({
      type: "PUT",
      // dataType: "json",
      url: urlAtualizar,
      success: function(data){
        console.log(data);
        window.location.href = "file:///home/zevatron/Documentos/IFPB/6-PD/filmerestclient/index.html";
      }
    });
  });
}

function excluir(id) {
  if (confirm('Tem certeza que deseja excluir o filme?')){
    var urlExcluir = new URL(urlRest+"/"+id);
    $.ajax({
      type: "DELETE",
      // dataType: "json",
      url: urlExcluir,
      success: function(data){
        console.log(data);
        window.location.href = "file:///home/zevatron/Documentos/IFPB/6-PD/filmerestclient/index.html";
      }
    });
  }
}
