import api from './api';
import { buscaTransacoes } from "./transacoes";

jest.mock('./api');

const mockTransacao = [
    {
        id: 1,
        transacao: 'Depósito',
        valor: '100',
        data: '16/04/2024',
        mes: 'Abril'
    }
];

const mockRequisicao = (retorno) => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve({
                data: retorno
            })
        }, 200)
    })
}

const mockRequisicaoErro = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("Requisições para a API", () => {
    test("Deve retornar uma lista de transações", async () => {
        api.get.mockImplementation(() => mockRequisicao(mockTransacao));

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual(mockTransacao);
        expect(api.get).toHaveBeenCalledWith('/transacoes')
    })

    test("Deve retornar uma lista vazia", async () => {
        api.get.mockImplementation(() => mockRequisicaoErro());

        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual([]);
        expect(api.get).toHaveBeenCalledWith('/transacoes')
    })
})