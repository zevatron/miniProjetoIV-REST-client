var urlRest = "https://filmerest.herokuapp.com/filmes";
$(document).ready( function(){
  if (location.pathname == "/miniProjetoIV-REST-client/index.html" || location.pathname == "/miniProjetoIV-REST-client/"){
    listarFilmes();
  }
  if (location.pathname == "/miniProjetoIV-REST-client/edit.html") {
    buscarPorId();
    atualizar();
  }
});

function home(){
  window.location.href = "index.html";
}

function listarFilmes() {
  $.ajax({
    url: urlRest+"/listar"
  }).then(function(data) {
    var str = '<tr>';
    jQuery.each(data , function (i , filme) {
      console.log(filme);
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
    } );
    $('#filmes').html(str);
  });
};
function buscarPorId(id,tipo) {
  if(id==null){
    id = new URL(location).searchParams.get('id');
    if(id == null){
      home();
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
        home();
      },
      error: function(data){
        alert(data.responseText);
      }
    });
}

function pesquisar(){
  $('#pesquisar').click(function(){
    if(!$('#search').val().trim()){
      listarFilmes();
      return;
    }
    $.ajax({
      type: 'GET',
      url: new URL(urlRest+"/"+$( "input[name='pesquisa']:checked").val()+"/"+$('#search').val()),
      success: function(data){
        $('#filmes').html(data)
      }
    })
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
        home();
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
        home();
      }
    });
  }
}
