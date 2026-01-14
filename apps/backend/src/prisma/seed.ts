import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data...');

  // Create an Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@devatlas.com' },
    update: {},
    create: {
      email: 'admin@devatlas.com',
      name: 'Admin User',
      password: 'password123', // In a real app, this should be hashed
      role: 'ADMIN',
    },
  });

  console.log({ admin });

  // Create a Sample Project
  const project = await prisma.project.create({
    data: {
      title: 'DevAtlas Portfolio',
      description: 'A production-grade portfolio system.',
      content: 'This project showcases advanced development practices.',
      authorId: admin.id,
      published: true,
      tags: ['NestJS', 'Next.js', 'TypeScript', 'Prisma'],
    },
  });

  console.log({ project });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
