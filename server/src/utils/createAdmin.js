import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const createDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  const name = process.env.DEFAULT_ADMIN_NAME;

  try {
    const existingAdmin = await prisma.user.findUnique({ where: { email } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: 'ADMIN',
        },
      });
      console.log(`[✅] Default admin created: ${email}`);
    } else {
      console.log(`[ℹ️] Admin already exists: ${email}`);
    }
  } catch (err) {
    console.error('[❌] Failed to create default admin:', err.message);
  }
};

export default createDefaultAdmin;
