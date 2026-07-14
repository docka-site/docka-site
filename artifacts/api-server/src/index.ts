import app from "./app";
import { logger } from "./lib/logger";
import {
  db,
  adminUsersTable,
  policyholdersTable,
  leadsTable,
  quotesTable,
  clientAccountsTable,
} from "@workspace/db";
import { count, sql } from "drizzle-orm";
import { hashPassword } from "./routes/admin-auth";

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}
function randomDateInLast12Months(): Date {
  const now = new Date();
  const past = new Date(now);
  past.setMonth(past.getMonth() - 12);
  return new Date(past.getTime() + Math.random() * (now.getTime() - past.getTime()));
}

async function seedDatabase() {
  try {
    const [{ total }] = await db.select({ total: count() }).from(adminUsersTable);
    if (Number(total) > 0) {
      return;
    }

    logger.info("Empty database detected — seeding initial data...");
    const passwordHash = await hashPassword("12345678");

    await db.insert(adminUsersTable).values([
      { email: "jose.eduardo.andrade@gmail.com", name: "Eduardo Andrade", passwordHash, active: true },
      { email: "admin@empresa.com", name: "Admin User", passwordHash, active: true },
    ]);
    logger.info("Seeded 2 admin users");

    await db.insert(policyholdersTable).values([
      { name: "Nave 7B", email: "nave7b@gmail.com", phone: "11999998855", cnpj: "65444478000106", status: "ativo" },
      { name: "Teste testador", email: "hjvsdvsriokbdlkwmz@nesopf.com", phone: "31999999999", cnpj: "000000100000000", status: "ativo", notes: "teste teste" },
      { name: "Rod", email: "Rod@gmail.com", phone: "11111", cnpj: "25584526855", status: "ativo" },
    ]);
    logger.info("Seeded 3 policyholders");

    await db.insert(clientAccountsTable).values([
      { email: "teste@empresa.com.br", passwordHash, isTempPassword: false },
      { email: "rod@gmail.com", passwordHash, isTempPassword: false },
    ]);
    logger.info("Seeded 2 client accounts");

    const firstNames = ["Ana","Bruno","Carlos","Daniela","Eduardo","Fernanda","Gabriel","Helena","Igor","Juliana","Lucas","Mariana","Nelson","Olivia","Paulo","Renata","Sergio","Tatiana","Vitor","Wagner","Amanda","Beatriz","Claudio","Diego","Elisa","Felipe","Gustavo","Isabela","Jorge","Karen","Leonardo","Monica","Nathalia","Oscar","Patricia","Rafael","Sandra","Thiago","Valentina","William"];
    const lastNames = ["Silva","Santos","Oliveira","Souza","Pereira","Costa","Ferreira","Rodrigues","Almeida","Nascimento","Lima","Araujo","Fernandes","Barros","Ribeiro","Martins","Carvalho","Gomes","Rocha","Dias","Mendes","Freitas","Barbosa","Cardoso","Vieira","Moreira","Teixeira","Pinto","Monteiro","Campos"];
    const domains = ["gmail.com","hotmail.com","outlook.com","yahoo.com.br","empresa.com.br","uol.com.br"];
    const atividades = ["advogado","arquiteto","dentista","emp_tecnologia","contador","medico","outras_atividades"] as const;
    const tipos = ["novo","renovacao"] as const;
    const distrs = ["local","nacional","internacional"] as const;
    const statuses = ["pendente","ativo","cancelado"] as const;
    const ddds = ["11","21","31","41","51","61","71","81","85","19"];

    const leadEmails = new Set<string>();
    const leadValues: { email: string; createdAt: Date }[] = [];
    for (let i = 0; i < 150; i++) {
      let email: string;
      do {
        email = `${pick(firstNames).toLowerCase()}.${pick(lastNames).toLowerCase()}${rand(1, 999)}@${pick(domains)}`;
      } while (leadEmails.has(email));
      leadEmails.add(email);
      leadValues.push({ email, createdAt: randomDateInLast12Months() });
    }
    for (let i = 0; i < leadValues.length; i += 50) {
      await db.insert(leadsTable).values(leadValues.slice(i, i + 50));
    }
    logger.info("Seeded 150 leads");

    const quoteValues: Array<{
      nome: string; telefone: string; cnpj: string; email: string;
      atividadeProfissional: typeof atividades[number]; tipoSeguro: typeof tipos[number];
      faturamentoAnual: string; dataInicioOperacoes: string;
      distribuicaoGeografica: typeof distrs[number]; qtdAcoes: number;
      valorAcoes: string; qtdSinistro: number; valorSinistro: string;
      politicasRh: boolean; status: typeof statuses[number]; createdAt: Date;
    }> = [];
    for (let i = 0; i < 80; i++) {
      const fn = pick(firstNames);
      const ln = pick(lastNames);
      const cnpjNum = Array.from({ length: 14 }, () => rand(0, 9)).join("");
      const cnpj = cnpjNum.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
      quoteValues.push({
        nome: `${fn} ${ln}`,
        telefone: `+55 (${pick(ddds)}) 9${rand(1000, 9999)}-${rand(1000, 9999)}`,
        cnpj,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}${rand(1, 99)}@${pick(domains)}`,
        atividadeProfissional: pick([...atividades]),
        tipoSeguro: pick([...tipos]),
        faturamentoAnual: (rand(50, 50000) * 1000).toFixed(2),
        dataInicioOperacoes: `${rand(1990, 2024)}-${String(rand(1, 12)).padStart(2, "0")}-${String(rand(1, 28)).padStart(2, "0")}`,
        distribuicaoGeografica: pick([...distrs]),
        qtdAcoes: rand(0, 100),
        valorAcoes: rand(100, 500000).toFixed(2),
        qtdSinistro: rand(0, 20),
        valorSinistro: rand(100, 200000).toFixed(2),
        politicasRh: Math.random() > 0.5,
        status: pick([...statuses]),
        createdAt: randomDateInLast12Months(),
      });
    }
    for (let i = 0; i < quoteValues.length; i += 40) {
      await db.insert(quotesTable).values(quoteValues.slice(i, i + 40));
    }
    logger.info("Seeded 80 quotes");

    logger.info("Database seeding complete!");
  } catch (err) {
    logger.error({ err }, "Failed to seed database");
  }
}

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

seedDatabase().then(() => {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
});
