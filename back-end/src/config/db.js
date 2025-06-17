import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Create a SQL connection using our DB URL
export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    // 1. Création de la table avec le bon type NUMERIC
    await sql`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        label VARCHAR(255) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL, 
        date DATE NOT NULL,
        recurrence VARCHAR(50) NOT NULL,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

    await sql`CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    console.log('Base de données initialisée avec succès');

  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    
    // En production, on pourrait tenter une récupération automatique
    if (process.env.NODE_ENV === 'production') {
      console.error('Critical DB initialization error - exiting');
      process.exit(1);
    }
    
    throw error; // Pour le développement
  }
}; 