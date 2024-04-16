import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import App from './App';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from '../../routes';


describe("Componente <App />", () => {
    test("Deve permitir adicionar uma transação em <Extrato />", () => {
        render(<App />, { wrapper: BrowserRouter })

        const select = screen.getByRole('combobox');
        const campoValor = screen.getByPlaceholderText('Digite um valor');
        const botao = screen.getByRole('button');

        userEvent.selectOptions(select, ['Depósito']);
        userEvent.type(campoValor, '100');
        userEvent.click(botao);

        const novaTransacao = screen.getByTestId('lista-transacoes');
        const itemExtrato = screen.getByRole('listitem');

        expect(novaTransacao).toContainElement(itemExtrato);
    });

    describe("Deve navegar até a página correspondente ao link:",  () => {

        test("Cartões", async () => {
            render(
                <AppRoutes />, { wrapper: BrowserRouter }
            )
    
            const linkPaginaCartoes = screen.getByText('Cartões');
            expect(linkPaginaCartoes).toBeInTheDocument();
            userEvent.click(linkPaginaCartoes)
    
            const tituloCartao = await screen.findByText('Meus cartões');
            expect(tituloCartao).toBeInTheDocument();
        })

        test("Investimentos", async () => {
            render (<AppRoutes />, { wrapper: BrowserRouter })

            const botaoInvestimento = screen.getByText("Investimentos");
            expect(botaoInvestimento).toBeInTheDocument();

            userEvent.click(botaoInvestimento);

            const containerInvestimento = await screen.findByTestId("container-investimentos");
            expect(containerInvestimento).toBeInTheDocument();
        })
    })
})