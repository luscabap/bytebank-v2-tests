import api from './api'
import { salvaTransacao } from './transacoes';

jest.mock('./api');

const mockNovaTransacao = [
    {
      id: 1,
      transacao: 'Depósito',
      valor: '1278',
      data: '17/04/2024',
      mes: 'Abril',
    },
  ];

const mockRequisicaoPost = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 201
            })
        }, 200)
    })
}

const mockRequisicaoPostErro = () => {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("Testar requisição POST para as transações", () => {
    test("Deve retornar status 201 de criado", async () => {
        api.post.mockImplementation(() => mockRequisicaoPost());

        const status = await salvaTransacao(mockNovaTransacao[0]);

        expect(status).toBe(201)
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockNovaTransacao[0]);
    })

    test("Deve retornar um saldo de 100 quanto a requisição POST falhar", async () => {
        api.post.mockImplementation(() => mockRequisicaoPostErro());
        const status = await salvaTransacao(mockNovaTransacao[0])
        expect(status).toBe('Erro na requisição');
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockNovaTransacao[0])
    })
})