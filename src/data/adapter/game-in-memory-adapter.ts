import type { IGamePort } from "../../core/port/game-port";
export interface IGameSchema {
  id: string;
  round: number;
  turn: number;
  players: string[];
}
export class GameInMemoryAdapter implements IGamePort {
  games = new Map<string, IGameSchema>();
  async newGame(options: Parameters<IGamePort["newGame"]>[0]) {
    const id = crypto.randomUUID();

    this.games.set(id, {
      id,
      round: 0,
      turn: 0,
      players: options.players,
    });

    return { id };
  }
  async setGame(options: Parameters<IGamePort["setGame"]>[0]) {
    const game = this.games.get(options.id);
    if (game == null) {
      console.error(`game with id '${options.id}' does not exist`);
      return;
    }
    this.games.set(game.id, {
      ...game,
      ...options,
    });
  }
  async getGame(id: string) {
    const game = this.games.get(id);

    if (game == null) return null;

    return {
      id: game.id,
      round: game.round,
      turn: game.turn,
      players: game.players,
    }
  }
}