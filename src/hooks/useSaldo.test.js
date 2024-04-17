import { act, renderHook } from "@testing-library/react";
import { buscaSaldo } from "../services/saldo";
import useSaldo from "./useSaldo";

jest.mock('../services/saldo')

const mockSaldo = [{
    valor: 775
}]

describe("Hooks/useSaldo()", () => {
    test("Em sucesso hook deverá retornar o saldo", async () => {
        buscaSaldo.mockImplementation(() => mockSaldo.valor);
        const { result } = renderHook(() => useSaldo());
        expect(result.current[0]).toEqual(0)

        await act(async () => {
            result.current[1]
        })

        expect(result.current[0]).toEqual(mockSaldo.valor)
    })
})