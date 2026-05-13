import { ISecao } from "@/contextos/ContextoDispensa";

const dispensa: ISecao[] = [
  {
    id: 1,
    nome: "Frios e Laticínios",
    data: [
      {
        id: 1,
        nome: "Iogurte",
        qtdDispensa: 6,
        qtdLista: 0,
        comprado: false
      },
      {
        id: 2,
        nome: "Leite",
        qtdDispensa: 6,
        qtdLista: 0,
        comprado: false
      },
      {
        id: 3,
        nome: "Queijo",
        qtdDispensa: 1,
        qtdLista: 0,
        comprado: false
      },
    ]
  },
  {
    id: 2,
    nome: "Limpeza",
    data: [
      {
        id: 4,
        nome: "Desinfetante",
        qtdDispensa: 3,
        qtdLista: 0,
        comprado: false
      },
      {
        id: 5,
        nome: "Detergente",
        qtdDispensa: 4,
        qtdLista: 0,
        comprado: false
      },
      {
        id: 6,
        nome: "Sabão em pó",
        qtdDispensa: 2,
        qtdLista: 0,
        comprado: false
      },
    ]
  }
];

export default dispensa;