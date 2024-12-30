import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { UserEntity } from "../entities";
import { TodoEntity } from "../entities/todo.entity";
import { Env } from "../env";

export const AppDataSource = new DataSource({
  type: "mysql",
  database: Env.dbName,
  host: Env.host,
  username: Env.username,
  password: Env.password,
  port: Env.dbPort,
  driver: require("mysql2"),
  logging: false,
  synchronize: false,
  entities: [UserEntity, TodoEntity],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
