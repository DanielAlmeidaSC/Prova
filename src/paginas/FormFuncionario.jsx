import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function FormFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState({
    nomefuncionario: "",
    cpf: "",
    email: "",
    telefone: "",
    nascimento: "",
    salario: "",
    contratacao: "",
    demissao: "",
    ativo: false,
    senha: "",
    token: "",
  });

  useEffect(() => {
    if (id && id !== "novo") {
      // modo edição - buscar dados do funcionário
      axios
        .get(`http://localhost:8080/funcionarios/${id}`)
        .then((res) => setFuncionario(res.data))
        .catch(() => alert("Erro ao buscar funcionário."));
    }
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFuncionario((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function salvar() {
    try {
      if (id === "novo") {
        await axios.post("http://localhost:8080/funcionarios", funcionario);
      } else {
        await axios.put(`http://localhost:8080/funcionarios/${id}`, funcionario);
      }
      navigate("/funcionarios");
    } catch (error) {
      alert("Erro ao salvar funcionário.");
    }
  }

  function cancelar() {
    navigate("/funcionarios");
  }

  return (
    <div className="container">
      <h2>{id === "novo" ? "Adicionar Funcionário" : "Editar Funcionário"}</h2>

      <div className="mb-3">
        <label>Nome</label>
        <input
          type="text"
          className="form-control"
          name="nomefuncionario"
          value={funcionario.nomefuncionario}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>CPF</label>
        <input
          type="text"
          className="form-control"
          name="cpf"
          value={funcionario.cpf || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>E-mail</label>
        <input
          type="email"
          className="form-control"
          name="email"
          value={funcionario.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Telefone</label>
        <input
          type="text"
          className="form-control"
          name="telefone"
          value={funcionario.telefone || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Data de Nascimento</label>
        <input
          type="date"
          className="form-control"
          name="nascimento"
          value={funcionario.nascimento || ""}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Salário</label>
        <input
          type="number"
          className="form-control"
          name="salario"
          value={funcionario.salario || ""}
          onChange={handleChange}
          step="0.01"
        />
      </div>

      <div className="mb-3">
        <label>Data de Contratação</label>
        <input
          type="date"
          className="form-control"
          name="contratacao"
          value={funcionario.contratacao}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Data de Demissão</label>
        <input
          type="date"
          className="form-control"
          name="demissao"
          value={funcionario.demissao || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="ativo"
          name="ativo"
          checked={funcionario.ativo || false}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="ativo">
          Ativo
        </label>
      </div>

      <div className="mb-3">
        <label>Senha</label>
        <input
          type="password"
          className="form-control"
          name="senha"
          value={funcionario.senha || ""}
          onChange={handleChange}
        />
      </div>

      {/* Token normalmente não é editável no front, então pode omitir no form */}

      <div>
        <button className="btn btn-primary me-2" onClick={salvar}>
          Salvar
        </button>
        <button className="btn btn-secondary me-2" onClick={cancelar}>
          Cancelar
        </button>
        {id !== "novo" && (
          <button
            className="btn btn-danger"
            onClick={async () => {
              if (
                window.confirm("Confirma exclusão deste funcionário?")
              ) {
                try {
                  await axios.delete(`http://localhost:8080/funcionarios/${id}`);
                  navigate("/funcionarios");
                } catch {
                  alert("Erro ao excluir funcionário.");
                }
              }
            }}
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  );
}
