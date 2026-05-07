import { execSync } from "node:child_process";
import type { Server } from "node:http";
import { after, before, beforeEach, type TestContext } from "node:test";
import app from "../../src/index";
import { prisma } from "../../src/models/client.ts";

let server: Server;

function waitForPostgres() {
  for (let i = 0; i < 20; i++) {
    try {
      execSync(`docker exec skillfusion_db_test pg_isready -U ${process.env.POSTGRES_USER}`, { stdio: "ignore" });
      return;
    } catch {
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 500);
    }
  }
  throw new Error("PostgreSQL n'est pas prêt après 10 secondes");
}

before(() => {
  try {
    execSync(`docker rm -f skillfusion_db_test`, { stdio: "inherit" });
  } catch {
    // Ignoré si le container n'existe pas
  }

  execSync(`docker run -d --name skillfusion_db_test -p 5434:5432 -e POSTGRES_USER=${process.env.POSTGRES_USER} -e POSTGRES_PASSWORD=${process.env.POSTGRES_PASSWORD} -e POSTGRES_DB=${process.env.POSTGRES_DB} postgres:18`, { stdio: "inherit" });

  waitForPostgres();

  execSync(`npx prisma migrate deploy`, { stdio: "inherit" });
  execSync(`npx tsx src/models/seeding.ts`, { stdio: "inherit" }); 

  server = app.listen(process.env.PORT);
});

beforeEach(async (t) => {
  (t as TestContext).mock.method(console, "info", () => {});
  await truncateTables();
  await seedRoles();
});

after(async () => {
  server.close();
  await prisma.$disconnect();
  execSync(`docker rm -f skillfusion_db_test`);
});

async function truncateTables() {
  await prisma.$executeRawUnsafe(`
    DO $$ DECLARE
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'TRUNCATE TABLE "' || r.tablename || '" RESTART IDENTITY CASCADE';
      END LOOP;
    END $$;
  `);
}

async function seedRoles() {
  await prisma.role.createMany({
    data: [
      { name: "student", frName: "Etudiant" },
      { name: "instructor", frName: "Formateur" },
      { name: "admin", frName: "Administrateur" },
    ],
  });
}