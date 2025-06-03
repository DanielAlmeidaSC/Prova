import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DevolucaoLivros() {
  const [emprestimos, setEmprestimos] = useState([]);

  const apiUrl = 'http://localhost:3000/emprestimos/pendentes';

  const fetchEmprestimos = async () => {
    try {
      const response = await axios.get(apiUrl);
      setEmprestimos(response.data);
    } catch (error) {
      console.error('Erro ao carregar empréstimos:', error);
    }
  };

  useEffect(() => {
    fetchEmprestimos();
  }, []);

  const devolverLivro = async (id) => {
    if (window.confirm('Confirma a devolução deste livro?')) {
      try {
        await axios.post(`http://localhost:3000/emprestimos/${id}/devolver`);
        fetchEmprestimos();
      } catch (error) {
        console.error('Erro ao devolver livro:', error);
      }
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <h1>Empréstimos Pendentes</h1>
      {emprestimos.length === 0 ? (
        <p>Não há empréstimos pendentes.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Título do Livro</th>
              <th>Nome da Pessoa</th>
              <th>Data de Empréstimo</th>
              <th>Data de Vencimento</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((e) => (
              <tr key={e.idemprestimo}>
                <td>{e.livroTitulo}</td> {/* Pode ser que precise popular título via associação no backend */}
                <td>{e.pessoaNome}</td>  {/* Mesma coisa para nome do usuário */}
                <td>{new Date(e.emprestimo).toLocaleDateString()}</td>
                <td>{new Date(e.vencimento).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => devolverLivro(e.idemprestimo)}>Devolver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DevolucaoLivros;
