import { render, screen } from "@testing-library/react";
import App from "./paginas/Principal/App";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import Cartoes from "./componentes/Cartoes";
import Servicos from './componentes/Servicos';
import AppRoutes from './routes'

describe("Deve renderizar a Rota", () => {

    test("Principal", () => {
        render(<App />, { wrapper: BrowserRouter })
        const usuario = screen.getByText('Olá, Joana :)!')
        expect(usuario).toBeInTheDocument();
    })

    test("Cartões", () => {
        const rota = '/cartoes'

        render(<MemoryRouter initialEntries={[rota]}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="cartoes" element={<Cartoes />}/>
                </Route>
            </Routes>
        </MemoryRouter>)

        const meusCartoes = screen.getByText('Meus cartões');
        expect(meusCartoes).toHaveTextContent('Meus cartões');
    })
    
    test("Atual", () => {
        const rota = '/cartoes';
        render(<MemoryRouter initialEntries={[rota]}>
            <App />
        </MemoryRouter>)

        const localizacaoAtual = screen.getByTestId('local');
        expect(localizacaoAtual).toHaveTextContent(rota);
    })

    test("Servicos", () => {
        const rotaServico = '/servicos'
        render(<MemoryRouter initialEntries={[rotaServico]}>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="servicos" element={<Servicos />}/>
                </Route>
            </Routes>
        </MemoryRouter>)
        const iconesServicos = screen.getByText('Empréstimo')
        expect(iconesServicos).toHaveTextContent('Empréstimo');
    })

    test("Não encontrada 404", () => {
        const rota = '/rota-inexistente';
        render(
            <MemoryRouter initialEntries={[rota]}>
                <AppRoutes />
            </MemoryRouter>
        )
        const containerPagina = screen.getByTestId("pagina-404");
        expect(containerPagina).toContainHTML('<h1>Ops! Não encontramos a página</h1>');
    })
})