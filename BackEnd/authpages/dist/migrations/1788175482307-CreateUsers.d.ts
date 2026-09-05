import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUsers1788175482307 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
