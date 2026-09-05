"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1788175776073 = void 0;
class CreateUsers1788175776073 {
    name = 'CreateUsers1788175776073';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }
}
exports.CreateUsers1788175776073 = CreateUsers1788175776073;
//# sourceMappingURL=1788175776073-CreateUsers.js.map