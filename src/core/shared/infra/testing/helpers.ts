import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Config } from '../config';

/**
 * Helper para configurar o Sequelize em testes
 *
 * Este helper configura uma instância do Sequelize para ser usada em testes,
 * gerenciando seu ciclo de vida com hooks beforeAll, beforeEach e afterAll.
 *
 * @param options - Opções adicionais para a configuração do Sequelize
 */
export function setupSequelize(options: SequelizeOptions = {}) {
  // Variável que armazenará a instância do Sequelize, inicializada no beforeAll
  let _sequelize: Sequelize;

  beforeAll(() => {
    _sequelize = new Sequelize({
      ...Config.db(),
      ...options,
    });
  });

  beforeEach(async () => await _sequelize.sync({ force: true }));

  afterAll(async () => await _sequelize.close());

  // Retorna um objeto com um getter para acessar a instância do Sequelize
  return {
    /**
     * Getter para acessar a instância do Sequelize
     *
     * Usamos um getter pelos seguintes motivos:
     * 1. Acesso tardio: A variável _sequelize só é inicializada no beforeAll,
     *    que executa após esta função ter retornado
     * 2. Encapsulamento: Fornece acesso somente leitura à instância
     * 3. Consistência: Garante que sempre seja retornada a referência atual
     */
    get sequelize() {
      return _sequelize;
    },
  };
}
