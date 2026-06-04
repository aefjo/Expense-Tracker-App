import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  decimal, 
  timestamp, 
  date, 
  pgEnum 
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Definisikan Enum sesuai dengan "Enum Types" di DBML-mu
export const typesEnum = pgEnum('types', ['income', 'expense']);

// ==========================================
// DEFINISI TABEL
// ==========================================

// Tabel Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabel Accounts
export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  balance: decimal('balance', { precision: 12, scale: 2 }).default('0.00').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabel Categories (Sekarang Global, tidak ada user_id)
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(), 
  description: varchar('description', { length: 255 }).notNull(), // Diisi 'income' atau 'expense'
});

// Tabel Transactions
export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  accountId: serial('account_id').notNull().references(() => accounts.id, { onDelete: 'cascade' }),
  categoryId: serial('category_id').notNull().references(() => categories.id, { onDelete: 'restrict' }),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  types: typesEnum('types').notNull(), // Menggunakan Enum types yang aman
  notes: text('notes'),
  transactionDate: date('transaction_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ==========================================
// DEFINISI RELASI DRIZZLE
// ==========================================

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  transactions: many(transactions),
}));

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
  transactions: many(transactions),
}));

// Karena kategori bersifat global, dia hanya punya relasi ke banyak transaksi
export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, { fields: [transactions.userId], references: [users.id] }),
  account: one(accounts, { fields: [transactions.accountId], references: [accounts.id] }),
  category: one(categories, { fields: [transactions.categoryId], references: [categories.id] }),
}));