# Pugsie PA — Product Requirements Document

## 1. Product Summary

**Product name:** Pugsie PA  
**Product type:** Mobile-first business admin assistant  
**Primary niche:** Window cleaners and small local service businesses  
**Initial platform:** Mobile-first web app or Expo/React Native app  
**Database:** Supabase  
**Backend hosting/automation:** Railway  

## 2. Tagline

> Your personal admin assistant for jobs, invoices, payments and repeat bookings.

Alternative product line:

> Finish the job. Tick the box. Send the invoice. Book the next visit. Get paid.

## 3. Product Vision

Pugsie PA should feel like a practical admin assistant sitting in the van with the tradesperson.

It should help answer:

- Who am I seeing today?
- What jobs have I completed?
- Who has paid?
- Who owes me money?
- Who needs a reminder?
- Who needs booking in again?
- Who is nearby?
- Which jobs can I group together to reduce travel?
- Which Christmas lights customers need contacting in November?

The app should not feel like a complicated CRM or accounting system. It should be simple, fast, and action-led.

## 4. Problem Statement

Many independent window cleaners and small service businesses are good at the work but poor at admin.

They often rely on:

- WhatsApp messages
- Paper diaries
- Memory
- Bank transfers
- Cash
- Notes on phones
- Spreadsheets
- Manual chasing

This leads to:

1. Missed appointments
2. Forgotten repeat bookings
3. Jobs completed but not invoiced
4. Unpaid invoices not chased
5. Messy customer records
6. Poor route planning
7. Wasted travel time
8. Missed seasonal opportunities, especially Christmas lights

Pugsie PA solves this with a simple flow:

> Complete job → Send invoice → Confirm payment → Book next appointment → Send invite → Chase if unpaid.

## 5. Target Users

## 5.1 Primary User — Independent Window Cleaner

### Profile

A self-employed window cleaner or small operator with repeat local customers.

### Pain Points

- Poor admin habits
- Forgetting who has paid
- Not sending invoices quickly
- Awkward payment chasing
- Poor route planning
- Repeat bookings handled manually
- Christmas lights work not properly tracked

### Needs

- Simple job list
- Easy customer records
- One-tap job completion
- Invoice/payment link generation
- Cash payment tracking
- Repeat appointments
- Appointment confirmations
- Calendar invites
- Smart area grouping
- Seasonal customer reminders

## 5.2 Secondary User — Small Team Owner

### Profile

A small service business owner with 2–5 workers.

### Additional Needs

- Assign jobs to staff
- View daily team activity
- Track completed jobs
- Track cash collected
- View unpaid invoices
- Monitor income

## 5.3 Customer End User

### Profile

Homeowner or local business receiving services.

### Needs

- Clear appointment confirmation
- Calendar invite
- Easy payment link
- Receipt
- Simple rescheduling
- Reminder before seasonal services

## 6. Goals

## 6.1 Business Goals

- Create a subscription product for small service businesses
- Start with window cleaners, then expand to adjacent trades
- Help users recover lost revenue through better admin
- Reduce missed payments and forgotten repeat bookings
- Build a product that can scale into a broader local service business assistant

## 6.2 User Goals

- Spend less time on admin
- Get paid faster
- Reduce driving time
- Keep better customer records
- Improve repeat booking reliability
- Automate payment chasing
- Turn seasonal services into repeat annual revenue

## 6.3 Product Goals

- Build a simple MVP first
- Prioritise the job completion and payment workflow
- Use Supabase as the source of truth
- Use Railway for automations and integrations
- Add smart route grouping after core workflow is stable
- Add AI assistant only where it provides practical value

## 7. Product Scope

## 7.1 MVP Must-Haves

- User account/login
- Business profile
- Customer database
- Add/edit customer
- Add/edit appointment/job
- Daily job list
- Basic calendar view
- Mark job as complete
- Auto-create invoice
- Send invoice/completion note
- Cash payment checkbox
- Send payment link checkbox
- Manual payment tracking
- Create next appointment
- Send basic calendar invite
- Unpaid invoice dashboard

## 7.2 Should-Haves

- Repeat appointment rules
- Payment reminders
- Message templates
- Customer job history
- Simple postcode grouping
- Tags for Christmas lights customers
- PDF invoice generation
- CSV export

## 7.3 Could-Haves

- Google Calendar sync
- Outlook Calendar sync
- WhatsApp sending
- SMS reminders
- AI message drafting
- Route map
- Nearby due jobs
- Christmas lights campaign dashboard
- Advanced reporting

## 7.4 Out of Scope for MVP

- Full accounting software
- Payroll
- Marketplace/customer booking marketplace
- Advanced employee management
- Complex inventory
- Deep route optimisation
- Full CRM automation
- Native desktop app

## 8. Core Features

## 8.1 Dashboard

The dashboard should show:

- Today’s jobs
- Tomorrow’s jobs
- Completed jobs today
- Outstanding jobs today
- Paid today
- Paid this week
- Unpaid invoices
- Overdue invoices
- Customers due soon
- Nearby jobs due soon
- Seasonal campaign prompts

## 8.2 Customer Management

Each customer should store:

- Customer ID
- Business/user ID
- First name
- Last name
- Business name, optional
- Full address
- Postcode
- Latitude
- Longitude
- Phone number
- Email address
- Preferred contact method
- Customer type
- Default service type
- Standard job price
- Default job duration
- Visit frequency
- Access notes
- Gate code/access instructions
- Payment preference
- Active/inactive status
- Tags
- Notes
- Photos
- Created date
- Updated date

## 8.3 Appointment and Job Scheduling

Each job should store:

- Job ID
- Customer ID
- Business/user ID
- Service type
- Appointment date
- Start time
- End time
- Estimated duration
- Price
- Status
- Repeat rule
- Assigned user/team member
- Notes
- Invoice ID
- Payment status
- Calendar invite status
- Created date
- Updated date

Job statuses:

- Scheduled
- Confirmed
- Completed
- Cancelled
- No access
- Rescheduled

## 8.4 Job Completion Workflow

This is the central feature.

### Flow

1. User opens today’s appointment
2. User checks **Job Complete**
3. App prepares invoice and message
4. User selects payment option:
   - Paid cash
   - Send payment link
   - Paid by bank transfer
   - Skip for now
5. App suggests next appointment based on frequency
6. User approves or edits next appointment
7. App sends appointment confirmation/calendar invite
8. App updates records

### Result

The app should:

- Mark the job complete
- Create invoice
- Send completion note
- Send payment link if selected
- Mark invoice paid if cash selected
- Create next appointment
- Send customer calendar invite
- Add job history to customer
- Update dashboard

## 8.5 Invoicing

Invoice records should include:

- Invoice ID
- Invoice number
- Business/user ID
- Customer ID
- Job ID
- Customer name
- Customer address
- Service description
- Job date
- Amount
- VAT status, optional
- Payment status
- Payment method
- Payment link
- Due date
- Sent date
- Paid date
- Reminder count
- Last reminder date
- PDF invoice URL

## 8.6 Payments

### MVP Payment Methods

- Cash
- Bank transfer, manually marked
- Online payment link

### Recommended MVP Integration

- Stripe Payment Links or Stripe Checkout

### Later Integrations

- GoCardless
- SumUp
- Square
- Open Banking matching
- Xero
- QuickBooks
- FreeAgent

## 8.7 Calendar Invites and Appointment Confirmations

### MVP

Send `.ics` calendar invites by email so customers can add appointments to:

- Apple Calendar
- Google Calendar
- Outlook
- iPhone Calendar
- Android Calendar

### Later

Full sync with:

- Google Calendar API
- Microsoft Outlook Calendar API

Appointment statuses:

- Draft
- Sent
- Confirmed
- Declined
- Reschedule requested
- Cancelled

## 8.8 Smart Rounds Assistant

The Smart Rounds Assistant groups jobs by geography to reduce travel time and increase revenue per day.

### MVP

- Group jobs by postcode district
- Show jobs due by area
- Show estimated value by area
- Suggest daily area groupings
- Highlight nearby jobs due soon

### Later

- Map view
- Route optimisation
- Travel time estimates
- Live traffic
- Best route ordering
- Nearby customer suggestions after completing a job

## 8.9 Nearby Due Jobs

After completing a job, the app can show:

- Customers nearby
- Customers due within the next few days
- Distance from current job
- Estimated value
- Button to send a “working nearby” message

Example message:

> Hi Sarah, I’m working nearby today and noticed your windows are due soon. Would you like me to fit you in while I’m in the area?

## 8.10 Christmas Lights CRM

Pugsie PA should support seasonal services, especially Christmas lights.

### Christmas Lights Customer Fields

- Christmas lights customer: yes/no
- Last installation date
- Last removal date
- Install price
- Removal price
- Roofline notes
- Socket/access notes
- Timer notes
- Property photos
- Previous year booking status
- Current year booking status
- Preferred installation window
- Removal appointment date

### Campaign Statuses

- Previous customer
- Not contacted
- Reminder sent
- Interested
- Booked
- Quote required
- Installed
- Paid
- Removal booked
- Removed
- Declined

### November Reminder

In October/November, the app should show previous customers and allow a reminder campaign.

Example:

> Hi Sarah, we’re now taking bookings for Christmas light installations. You booked with us last year, so I wanted to offer you first choice of dates before December fills up. Would you like to book again this year?

## 8.11 Message Templates

The app should include editable templates for:

- Appointment confirmation
- Appointment reminder
- I’m on my way
- Job completed
- Invoice sent
- Payment reminder
- Payment received
- Reschedule request
- Christmas lights booking reminder
- Christmas lights removal reminder

## 8.12 AI Assistant

AI should be practical and focused.

Useful actions:

- Suggest who to chase for payment
- Draft polite payment reminders
- Plan week by area
- Find customers due soon nearby
- Summarise unpaid invoices
- Highlight high-value overdue customers
- Generate Christmas lights messages
- Summarise weekly income and outstanding work

Example prompts:

- “Who owes me money?”
- “Who should I chase today?”
- “Plan my week by area.”
- “Find customers due soon near me.”
- “Write a polite payment reminder.”
- “Start my Christmas lights campaign.”

## 9. Technical Architecture

## 9.1 Selected Stack

- Supabase for Auth, Postgres database, Storage and Row Level Security
- Railway for backend hosting, webhooks, scheduled jobs and automations
- Stripe for online payment links
- Email provider for invoices and appointment messages
- ICS calendar invite generation for MVP

## 9.2 Supabase Responsibilities

Supabase should store and manage:

- User/business profiles
- Customer records
- Jobs and appointments
- Invoices
- Payments
- Message logs
- Seasonal services
- File storage
- Access control via Row Level Security

## 9.3 Railway Responsibilities

Railway should run:

- Backend API
- Stripe webhooks
- Invoice PDF generation
- Email sending
- Calendar invite generation
- Payment reminder scheduled jobs
- November Christmas lights campaign jobs
- Smart route grouping logic
- AI assistant calls

## 10. Suggested Data Model

## businesses

- id
- name
- owner_name
- email
- phone
- subscription_plan
- created_at
- updated_at

## profiles

- id
- business_id
- auth_user_id
- full_name
- role
- email
- phone
- created_at
- updated_at

## customers

- id
- business_id
- first_name
- last_name
- business_name
- address_line_1
- address_line_2
- town_city
- county
- postcode
- latitude
- longitude
- phone
- email
- preferred_contact_method
- customer_type
- default_service_type
- default_price
- default_duration_minutes
- visit_frequency
- access_notes
- payment_preference
- active_status
- tags
- notes
- created_at
- updated_at

## jobs

- id
- business_id
- customer_id
- service_type
- appointment_date
- start_time
- end_time
- estimated_duration_minutes
- price
- status
- repeat_rule
- assigned_to
- notes
- invoice_id
- payment_status
- calendar_invite_status
- created_at
- updated_at

## invoices

- id
- business_id
- customer_id
- job_id
- invoice_number
- amount
- status
- payment_method
- payment_link
- due_date
- sent_at
- paid_at
- reminder_count
- last_reminder_at
- pdf_url
- created_at
- updated_at

## payments

- id
- business_id
- customer_id
- job_id
- invoice_id
- amount
- payment_method
- payment_provider
- payment_provider_reference
- status
- paid_at
- created_at

## messages

- id
- business_id
- customer_id
- job_id
- invoice_id
- message_type
- channel
- message_body
- status
- sent_at
- created_at

## seasonal_services

- id
- business_id
- customer_id
- service_type
- season_year
- previous_customer
- booking_status
- install_date
- removal_date
- install_price
- removal_price
- property_notes
- photos
- created_at
- updated_at

## 11. UX Requirements

The app must be:

- Mobile-first
- Simple
- Fast
- Friendly
- Useful in a van
- Built around big buttons
- Easy to use with minimal typing
- Clear about money and outstanding invoices

Suggested main navigation:

1. Today
2. Calendar
3. Customers
4. Invoices
5. Routes
6. More

Main CTA:

> Complete & Send

## 12. Success Metrics

## MVP Product Metrics

- Customers added
- Jobs added
- Jobs completed through app
- Invoices sent
- Payment links sent
- Cash payments recorded
- Repeat appointments created
- Calendar invites sent
- Overdue invoices reduced

## Business Metrics

- Monthly active users
- Paid subscribers
- Churn rate
- Average revenue per user
- Jobs processed per user per month
- Payment volume processed

## User Value Metrics

- Time saved per week
- Time from job completion to invoice sent
- Time from invoice sent to payment
- Reduction in unpaid invoices
- Travel time reduced
- Seasonal bookings recovered

## 13. Pricing Direction

Suggested pricing:

### Free Trial

- 14 or 30 days
- Limited customers/jobs

### Solo Plan

For independent cleaners.

Suggested price: £9–£19/month

### Pro Plan

For established operators.

Suggested price: £19–£39/month

### Team Plan

For small teams.

Suggested price: £49+/month

## 14. Open Questions

1. Should the first build be Expo mobile app or Next.js web app?
2. Should the MVP use email only, or email plus SMS?
3. Should the first payment provider be Stripe only?
4. Should GoCardless be planned from day one for repeat customers?
5. Should customers confirm appointments via calendar invite only or web confirmation link too?
6. Should invoices support VAT from MVP?
7. Should team/staff accounts be in MVP or later?
8. Should Christmas lights be a separate module or a tag-driven workflow?
9. Should route grouping start with postcode only or full map distance?
10. Should Pugsie PA be marketed narrowly to window cleaners first or more broadly to service businesses?

## 15. Product Principle

Every feature should pass this test:

> Does this help the user save time, get paid faster, reduce travel, or secure repeat work?

If not, it should not be in the MVP.
