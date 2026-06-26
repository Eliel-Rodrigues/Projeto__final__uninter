import { prisma } from './libs/prisma.js';
import bcrypt from 'bcrypt';

async function main() {
  // Criptografando senhas
  const passwordEliel = await bcrypt.hash('123', 10);
  const passwordHeittor = await bcrypt.hash('456', 10);
  const passwordLucas = await bcrypt.hash('789', 10);
  const passwordArthur = await bcrypt.hash('1234', 10);
console.log('Seed concluído com sucesso!');
  // Criando usuários iniciais
  await prisma.usuario.createMany({
    data: [
      {
        nome: 'Eliel',
        email: 'eliel@example.com',
        senha: passwordEliel,
        role: 'ADMIN',
      },
      {
        nome: 'Heittor',
        email: 'heittor@example.com',
        senha: passwordHeittor,
        role: 'GERENTE',
      },
      {
        nome: 'Lucas',
        email: 'lucas@example.com',
        senha: passwordLucas,
        role: 'ATENDENTE',
      },
      {
        nome: 'Arthur',
        email: 'arthur@example.com',
        senha: passwordArthur,
        role: 'CLIENTE',
      },
    ],
  });

  await prisma.unidade.createMany({
    data: [
      {
        nome: 'Raízes do Nodeste',
        cidade: 'Goiana',
        cep: '55900000'
      },
      {
        nome: 'Raízes do Nodeste',
        cidade: 'Itaquitinga',
        cep: '55950000'
      },
    ],
  });

  await prisma.produto.createMany({
    data: [
      {
        nome: 'Fejoada',
        preco: 25,
        estoque: 100,
        unidadeId: 1
      },
      {
        nome: 'Baião de Dois',
        preco: 30,
        estoque: 100,
        unidadeId: 1
      },
      {
        nome: 'Carne de Sol com Macaxeira',
        preco: 50,
        estoque: 100,
        unidadeId: 1
      },
      {
        nome: 'Peixada Nordestina',
        preco: 45,
        estoque: 100,
        unidadeId: 2
      },
      {
        nome: 'Galinha à Cabidela',
        preco: 35,
        estoque: 100,
        unidadeId: 2
      },
      {
        nome: 'Dobradinha (Bucho)',
        preco: 10,
        estoque: 100,
        unidadeId: 2
      },
    ],
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
