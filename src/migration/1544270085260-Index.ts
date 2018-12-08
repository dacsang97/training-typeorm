import { MigrationInterface, QueryRunner } from 'typeorm'

export class Index1544270085260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE INDEX "IDX_Index1544270085260" ON "todo"("isComplete")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "IDX_Index1544270085260"`)
  }
}
