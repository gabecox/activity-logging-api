import { EntityManager } from "@mikro-orm/sqlite";
import { Seeder } from "@mikro-orm/seeder";
import { ActivitySeeder } from "./ActivitySeeder";

export class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [ActivitySeeder]);
  }
}
