import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		if (evt.type === 'user.created') {
			const { id, username, email_addresses } = evt.data;
			const resolvedUsername =
				username ?? email_addresses[0]?.email_address ?? id;

			await db.user.create({
				data: { clerkId: id, username: resolvedUsername },
			});
		}

		return new Response('Webhook received', { status: 200 });
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error verifying webhook', { status: 400 });
	}
}
