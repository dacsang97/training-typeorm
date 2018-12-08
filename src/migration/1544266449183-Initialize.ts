import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initialize1544266449183 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL PRIMARY KEY, "name" character varying NOT NULL, "isComplete" boolean NOT NULL)`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "todo"`)
  }
}
