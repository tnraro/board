import type { IntrinsicLogic } from "../config";

export const gameLogic: IntrinsicLogic = {
  async onStartGame(event, ports) {
    await ports.game.newGame({
      players: event.players
    });
    console.log("game created!")
  }
}