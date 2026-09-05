"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1788175482307 = void 0;
class CreateUsers1788175482307 {
    name = 'CreateUsers1788175482307';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
    }
}
exports.CreateUsers1788175482307 = CreateUsers1788175482307;
//# sourceMappingURL=1788175482307-CreateUsers.js.map