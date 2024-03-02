export interface IGameData {
  id: string;
  round: number;
  turn: number;
  players: string[];
}

export interface IGamePort {
  newGame: (options: { players: string[] }) => Promise<{ id: string }>;
  setGame: (options: Pick<IGameData, "id"> & Partial<IGameData>) => Promise<void>;
  getGame: (id: IGameData["id"]) => Promise<IGameData | null>;
}