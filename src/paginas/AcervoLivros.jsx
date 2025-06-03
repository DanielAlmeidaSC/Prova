import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AcervoLivros() {
  const [categorias, setCategorias] = useState([]);
  const [livros, setLivros] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const navigate = useNavigate();

  // Buscar categorias
  useEffect(() => {
    axios.get('http://localhost:4000/categoria')
      .then(res => setCategorias(res.data))
      .catch(() => alert("Erro ao carregar categorias"));
  }, []);

  // Buscar livros da categoria selecionada
  useEffect(() => {
    if (categoriaSelecionada) {
      axios.get(`http://localhost:4000/livros/categoria/${categoriaSelecionada}`)
        .then(res => setLivros(res.data))
        .catch(() => alert("Erro ao carregar livros da categoria"));
    } else {
      setLivros([]);
    }
  }, [categoriaSelecionada]);

  // Ao clicar no botão "Emprestar"
  function handleEmprestar(idLivro) {
    navigate(`/formemprestimo/${idLivro}`);
  }

  return (
    <div className="container mt-4">
      <h2>Acervo de Livros</h2>
      
      {/* Botões de categorias */}
      <div className="mb-4">
        {categorias.map(cat => (
          <button
            key={cat.idcategoria}
            className={`btn me-2 mb-2 ${categoriaSelecionada === cat.idcategoria ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setCategoriaSelecionada(cat.idcategoria)}
          >
            {cat.nomecategoria}
          </button>
        ))}
      </div>

      {/* Lista de livros da categoria selecionada */}
      {categoriaSelecionada && (
        <>
          <h4>Livros da categoria selecionada:</h4>
          {livros.length === 0 ? (
            <p>Nenhum livro cadastrado nesta categoria.</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Ano</th>
                  <th>Páginas</th>
                  <th>Editora</th>
                  <th>Edição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {livros.map(livro => (
                  <tr key={livro.idlivro}>
                    <td>{livro.titulo}</td>
                    <td>{livro.ano_publicacao}</td>
                    <td>{livro.numero_paginas}</td>
                    <td>{livro.editora}</td>
                    <td>{livro.numero_edicao}</td>
                    <td>
                      {livro.disponivel ? (
                        <button
                          className="btn btn-success"
                          onClick={() => handleEmprestar(livro.idlivro)}
                        >
                          Emprestar
                        </button>
                      ) : (
                        <span className="text-danger">Livro emprestado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
