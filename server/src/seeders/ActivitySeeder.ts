import type { EntityManager } from "@mikro-orm/sqlite";
import { Seeder } from "@mikro-orm/seeder";
import fs from "fs";
import path from "path";

export class ActivitySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const inserts = fs.readFileSync(
      path.join(__dirname, "./activity_insert_null_id.sql"),
      "utf-8"
    );

    const connection = em.getConnection();
    const res = await connection.execute(inserts);
    console.log(res);
  }
}
