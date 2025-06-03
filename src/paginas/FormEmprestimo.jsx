import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function FormEmprestimo() {
  const { id } = useParams(); // id do livro
  const navigate = useNavigate();
  const [livro, setLivro] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');

  // Buscar dados do livro ao carregar a página
  useEffect(() => {
    axios.get(`http://localhost:8080/livros/${id}`)
      .then(res => setLivro(res.data))
      .catch(() => alert('Erro ao buscar o livro.'));
  }, [id]);

  // Buscar lista de usuários
  useEffect(() => {
    axios.get('http://localhost:8080/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(() => alert('Erro ao buscar os usuários.'));
  }, []);

  function salvarEmprestimo() {
    const emprestimo = {
      idlivro: parseInt(id),
      idusuario: parseInt(usuarioSelecionado)
    };

    axios.post('http://localhost:8080/emprestimos', emprestimo)
      .then(() => navigate('/listalivro'))
      .catch(erro => {
        const msg = erro.response?.data || 'Erro ao salvar o empréstimo.';
        alert(msg);
      });
  }

  function cancelar() {
    navigate('/listalivro');
  }

  return (
    <div className="container">
      <h2>Realizar Empréstimo</h2>

      <div className="form-group">
        <label>Título do Livro</label>
        <input
          type="text"
          className="form-control"
          value={livro.titulo || ''}
          readOnly
        />
      </div>

      <div className="form-group mt-3">
        <label>Selecionar Usuário</label>
        <select
          className="form-control"
          value={usuarioSelecionado}
          onChange={(e) => setUsuarioSelecionado(e.target.value)}
        >
          <option value="">-- Selecione --</option>
          {usuarios.map(usuario => (
            <option key={usuario.idusuario} value={usuario.idusuario}>
              {usuario.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={salvarEmprestimo}>Salvar</button>
        <button className="btn btn-secondary" onClick={cancelar}>Cancelar</button>
      </div>
    </div>
  );
}

export default FormEmprestimo;
