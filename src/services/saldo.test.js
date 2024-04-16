import api from './api'
import { buscaSaldo } from './saldo';

jest.mock('./api');

const mockSaldo = {
    valor: 33
}

const mockRequisicaoSaldo = (valorSaldo) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: valorSaldo
            })
        }, 200)
    })
}

const mockRequisicaoSaldoErro = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject()
        }, 200)
    })
}

describe("Requisição para consulta do saldo", () => {

    test("Sucesso", async () => {
        api.get.mockImplementation(() => mockRequisicaoSaldo(mockSaldo))
        const saldo = await buscaSaldo();

        expect(saldo).toEqual(mockSaldo.valor);
    });

    test("Falha", async () => {
        api.get.mockImplementation(() => mockRequisicaoSaldoErro());

        const saldo = await buscaSaldo();

        expect(saldo).toEqual(1000)
    })
})