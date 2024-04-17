import { renderHook } from "@testing-library/react";
import { useEffect, useState } from "react";

test("Exemplo de funcionamento do teste de hook", () => {
    const { result } = renderHook(() => {
        const [nome, setNome] = useState("")
        useEffect(() => {
            setNome("Lucas")
        }, [])

        return nome
    })

    expect(result.current).toBe("Lucas")
})