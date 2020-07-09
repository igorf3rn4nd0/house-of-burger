export default {
  pedidos: [
    { id: 1,
      cliente: { id: 1, nome: 'João da silva' },
      valor: 25.50
    }
  ],
  totalPedido: 0,
  lanchesOptions: [
    {
      qtd: 0,
      id: 1,
      nome: 'XBacon House',
      preco: 12.50,
      selecionado: false,
      editar: false,
      ingredientes: [
        { nome: 'hamburguer', selecionado: true },
        { nome: 'tomate', selecionado: true }
      ],
      adicionais: []
    },
    {
      id: 2,
      qtd: 0,
      nome: 'XSalada House',
      preco: 12.50,
      selecionado: false,
      editar: false,
      ingredientes: [
        { nome: 'hamburguer', selecionado: true }
      ],
      adicionais: []
    }
  ],
  ingredienteOptions: [
    {
      id: 1,
      qtd: 1,
      nome: 'Bacon',
      preco: 3.00,
      selecionado: false,
      quantitativo: false
    },
    {
      id: 2,
      qtd: 1,
      nome: 'Hamburguer 180g',
      preco: 6.00,
      selecionado: false,
      quantitativo: true
    }
  ],
  bebidasOptions: [
    {
      id: 1,
      qtd: 0,
      nome: 'Coca Cola Lata',
      preco: 4.00,
      selecionado: false
    },
    {
      id: 2,
      qtd: 0,
      nome: 'Sprite Lata',
      preco: 4.00,
      selecionado: false
    }
  ],
  outrosOptions: [
    {
      id: 1,
      qtd: 0,
      nome: 'Porção de Calabresa',
      preco: 25.00,
      selecionado: false
    },
    {
      id: 0,
      qtd: 0,
      nome: 'Porção batata frita bacon',
      preco: 20.00,
      selecionado: false
    }
  ]
}
