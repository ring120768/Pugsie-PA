# Pugsie PA

**Pugsie PA** is a mobile-first admin assistant for window cleaners and local service businesses.

It helps a tradesperson manage appointments, complete jobs, send invoices, take payments, confirm next bookings, chase unpaid invoices, and group work geographically to reduce travel time.

## Product Promise

> Finish the job. Tick the box. Send the invoice. Book the next visit. Get paid.

## Target User

The initial target user is an independent window cleaner who:

- Manages repeat residential customers
- Handles occasional one-off jobs
- Offers seasonal services such as Christmas lights
- Struggles with admin, invoicing, scheduling and payment chasing
- Needs a simple workflow that works from the van, not a complex CRM

The product can later expand to:

- Gutter cleaners
- Pressure washing businesses
- Christmas light installers
- Gardeners
- Mobile car valeters
- Domestic cleaners
- Handymen
- Exterior property maintenance businesses

## Core Workflow

The main app flow is:

1. View today’s jobs
2. Open a customer appointment
3. Tick **Job Complete**
4. Choose payment option:
   - Paid cash
   - Send payment link
   - Bank transfer
   - Skip for now
5. Send invoice/completion note
6. Create next appointment
7. Send customer calendar invite
8. Update customer history and payment status

## Main Features

### MVP Features

- User login
- Business profile
- Customer database
- Job and appointment scheduling
- Daily job list
- Mark job complete
- Auto-create invoice
- Send invoice message
- Cash payment checkbox
- Online payment link option
- Manual paid/unpaid tracking
- Create next appointment
- Send simple calendar invite
- Unpaid invoice dashboard

### Phase 2+ Features

- Repeat appointment rules
- Payment reminders
- Smart postcode/area grouping
- Nearby due jobs
- Christmas lights CRM
- AI assistant
- Google/Outlook Calendar sync
- SMS/WhatsApp messaging
- GoCardless recurring payments
- Xero/QuickBooks/FreeAgent export or sync

## Tech Stack

### Selected Architecture

Pugsie PA will use:

- **Supabase** for database, authentication, storage and Row Level Security
- **Railway** for backend API hosting, scheduled jobs, webhooks and server-side automation

### Frontend

Recommended options:

- React Native with Expo for a mobile-first app
- Or Next.js as a responsive web app first

Recommended MVP route:

> Start with a mobile-first responsive web app or Expo app, depending on build speed and target launch path.

### Backend

Railway should host a Node.js backend using:

- Express or Fastify
- Stripe webhook handling
- Invoice generation
- Email sending
- Calendar invite generation
- Scheduled reminder jobs
- Smart route grouping logic
- AI assistant calls

### Database

Supabase Postgres should hold the core business data:

- Users/businesses
- Customers
- Jobs
- Appointments
- Invoices
- Payments
- Messages
- Seasonal services
- Christmas lights records

### Storage

Supabase Storage can hold:

- Invoice PDFs
- Customer/job photos
- Christmas lights installation photos
- Quote attachments

## Suggested Integrations

### MVP

- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Railway backend
- Stripe Payment Links or Stripe Checkout
- Email provider such as Resend, SendGrid or Postmark
- ICS calendar invite generation

### Later

- Google Calendar API
- Microsoft Outlook Calendar API
- Twilio SMS
- WhatsApp Business API
- GoCardless
- Xero
- QuickBooks
- FreeAgent
- Google Maps or Mapbox

## Example User Journey

### Regular Window Cleaning Customer

1. Add customer
2. Save address and contact details
3. Set job price
4. Set repeat frequency
5. Book first appointment
6. Complete job
7. Send invoice/payment link
8. Record cash or online payment
9. Create next appointment
10. Send calendar invite

### Christmas Lights Customer

1. Tag customer as Christmas lights customer
2. Save installation notes and photos
3. Send November booking reminder
4. Book installation date
5. Send calendar invite
6. Complete installation
7. Invoice and collect payment
8. Schedule removal appointment
9. Add reminder for next year

## Core Database Tables

Recommended initial tables:

- `businesses`
- `profiles`
- `customers`
- `jobs`
- `invoices`
- `payments`
- `messages`
- `seasonal_services`
- `calendar_events`
- `audit_logs`

## Environment Variables

Example environment variables for the Railway backend:

```env
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

EMAIL_PROVIDER_API_KEY=
EMAIL_FROM_ADDRESS=

APP_BASE_URL=
RAILWAY_ENVIRONMENT=
```

For frontend:

```env
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_APP_BASE_URL=
```

## Development Principles

- Keep the interface simple
- Design for use in a van, not at a desk
- Use big buttons and checkbox-led flows
- Reduce typing wherever possible
- Make payment status obvious
- Start with email and payment links before complex integrations
- Use ICS calendar invites before full calendar sync
- Start with postcode grouping before full route optimisation
- Do not overbuild the AI layer before the core admin workflow works

## Product Principle

Every feature should pass this test:

> Does this help the user save time, get paid faster, reduce travel, or secure repeat work?

If not, it should not be in the MVP.
