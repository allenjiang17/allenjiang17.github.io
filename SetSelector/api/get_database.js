import { db } from '@vercel/postgres';
 
export default async function handler(request, response) {
  const client = await db.connect();
  const DATABASE = await client.sql`SELECT * FROM Songs;`;

 return response.status(200).json({DATABASE});

}