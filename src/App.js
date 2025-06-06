import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './componentes/Menu';
import FormAutor from './paginas/FormAutor';
import FormCategoria from './paginas/FormCategoria';
import Home from './paginas/Home';
import ListaAutor from './paginas/ListaAutor';
import ListaCategoria from './paginas/ListaCategoria';

// Importar páginas de Livro
import ListaLivro from './paginas/ListaLivro';
import FormLivro from './paginas/FormLivro';
import FormEmprestimo from './paginas/FormEmprestimo';

import DevolucaoLivros from './componentes/DevolucaoLivros';

import AcervoLivros from './paginas/AcervoLivros';

import ListaFuncionarios from "./pages/ListaFuncionarios";
import FormFuncionario from "./pages/FormFuncionario";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />

            {/* CATEGORIA */}
            <Route path='/listacategoria' element={<ListaCategoria />} />
            <Route path='/cadastrocategoria' element={<FormCategoria />} />
            <Route path='/cadastrocategoria/:id' element={<FormCategoria />} />

            {/* AUTOR */}
            <Route path='/listaautor' element={<ListaAutor />} />
            <Route path='/cadastroautor' element={<FormAutor />} />
            <Route path='/cadastroautor/:id' element={<FormAutor />} />

            {/* LIVRO */}
            <Route path='/listalivro' element={<ListaLivro />} />
            <Route path='/cadastrolivro' element={<FormLivro />} />
            <Route path='/cadastrolivro/:id' element={<FormLivro />} />

            {/* DEVOLUÇÃO DE LIVROS */}
            <Route path='/devolucaolivros' element={<DevolucaoLivros />} />

            {/*Rota emprestimo */}
            <Route path="/emprestarlivro/:id" element={<FormEmprestimo />} />

            {/*Rota acervo */}
            <Route path="/acervolivros" element={<AcervoLivros />} />

            {/*Rota lista funcionarios */}
            <Route path="/funcionarios" element={<ListaFuncionarios />} />
            {/*Rota form funcionarios */}
            <Route path="/funcionarios/:id" element={<FormFuncionario />} />

            {/* Rota padrão */}
            <Route path='*' element={<Home />} />



          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
