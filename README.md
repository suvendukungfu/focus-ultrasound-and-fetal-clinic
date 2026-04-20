# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Admin & Clinical Console

The portal includes a premium Admin Console for lead management and inquiry tracking.

- **Admin URL**: `/admin`
- **Default Credentials**: `admin@focusultrasound.in` / `Focus@Admin2026` (Change in `.env` for production)
- **Features**: Live lead tracking, Status updates, and direct WhatsApp communication with patients.

## WhatsApp Integration

The project uses a dual WhatsApp strategy:
1.  **Patient-Initiated (Frontend)**: Standard `wa.me` links pre-filled with appointment details.
2.  **Clinic-Automated (Backend)**: Automated confirmation and reminder messages using the Meta WhatsApp Business API.

### Configuration
To enable automated backend notifications, set the following in your `.env`:
- `WHATSAPP_PHONE_NUMBER_ID`: Your Meta App Phone ID
- `WHATSAPP_ACCESS_TOKEN`: Your Meta Permanent Access Token
- `REDIS_URL`: Required for background job processing (Confirmations/Reminders)

## What technologies are used for this project?

This project is built with:

- **Frontend**: Vite, React, TypeScript, Framer Motion, Tailwind CSS
- **Backend**: Node.js (Express), Prisma (ORM), PostgreSQL, BullMQ (Task Queue)
- **Design**: Premium Medical Aesthetic (Precision Teal & Trust Blue)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
