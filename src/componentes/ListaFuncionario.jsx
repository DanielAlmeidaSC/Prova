import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  // Buscar lista de funcionários
  const listar = async () => {
    try {
      const res = await axios.get("http://localhost:8080/funcionarios");
      setFuncionarios(res.data);
    } catch (error) {
      alert("Erro ao listar funcionários.");
    }
  };

  useEffect(() => {
    listar();
  }, []);

  // Excluir funcionário
  const excluir = async (id) => {
    if (window.confirm("Confirma a exclusão do funcionário?")) {
      try {
        await axios.delete(`http://localhost:8080/funcionarios/${id}`);
        listar(); // Atualiza lista
      } catch {
        alert("Erro ao excluir funcionário.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Funcionários</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/funcionarios/novo")}
      >
        Adicionar
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((f) => (
            <tr key={f.idfuncionario}>
              <td>{f.nomefuncionario}</td>
              <td>{f.email}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/funcionarios/${f.idfuncionario}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => excluir(f.idfuncionario)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {funcionarios.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center">
                Nenhum funcionário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
