import { sql } from "../config/db.js";

// Helper function pour la validation
const validateSubscriptionData = (data) => {
  const errors = [];
  
  if (!data.label?.trim()) errors.push('Label is required');
  
  const amount = parseFloat(data.amount);
  if (isNaN(amount) || amount <= 0) errors.push('Amount must be a positive number');
  
  if (!Date.parse(data.date)) errors.push('Invalid date format (YYYY-MM-DD required)');
  
  const validRecurrences = ["monthly", "yearly", "weekly"];
  if (!validRecurrences.includes(data.recurrence)) {
    errors.push(`Recurrence must be one of: ${validRecurrences.join(', ')}`);
  }
  
  if (!data.user_id || isNaN(parseInt(data.user_id))) errors.push('Invalid user ID');
  
  return errors.length > 0 ? errors : null;
};

// Récupère les abonnements d'un utilisateur
export async function getSubscriptionByUserId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const subscriptions = await sql`
      SELECT 
        id,
        user_id,
        label,
        amount::float,
        to_char(date, 'YYYY-MM-DD') as date,
        recurrence,
        image_url,
        created_at
      FROM subscriptions 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC`;

    res.status(200).json(subscriptions);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      ...(process.env.NODE_ENV !== 'production' && { error: error.message })
    });
  }
};

// Crée un nouvel abonnement
export async function createSubscription(req, res) {
  try {
    const errors = validateSubscriptionData(req.body);
    if (errors) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors 
      });
    }

    const { label, amount, date, recurrence, image_url, user_id } = req.body;
    const amountNum = parseFloat(amount).toFixed(2);

    const [subscription] = await sql`
      INSERT INTO subscriptions 
        (user_id, label, amount, date, recurrence, image_url) 
      VALUES 
        (${user_id}, ${label.trim()}, ${amountNum}, ${date}::date, ${recurrence}, ${image_url || null})
      RETURNING 
        id,
        user_id,
        label,
        amount::float,
        to_char(date, 'YYYY-MM-DD') as date,
        recurrence,
        image_url,
        created_at`;

    res.status(201).json(subscription);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      message: 'Failed to create subscription',
      ...(process.env.NODE_ENV !== 'production' && { error: error.message })
    });
  }
};

// Supprime un abonnement
export async function deleteSubscription(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(id) || parseInt(id) <= 0) {
      return res.status(400).json({ message: 'Invalid subscription ID' });
    }

    const [deleted] = await sql`
      DELETE FROM subscriptions 
      WHERE id = ${id} 
      RETURNING *`;

    if (!deleted) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.status(200).json({ 
      message: 'Deleted successfully',
      deletedId: deleted.id
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      ...(process.env.NODE_ENV !== 'production' && { error: error.message })
    });
  }
};

export async function getSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;

    const [result] = await sql`
      SELECT 
        COALESCE(SUM(amount), 0)::float as total,
        COUNT(*)::int as count
      FROM subscriptions 
      WHERE user_id = ${userId}`;

    res.status(200).json({
      total: result.total || 0,
      count: result.count || 0
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      ...(process.env.NODE_ENV !== 'production' && { error: error.message })
    });
  }
};