# API Specification

## Overview

This project primarily interfaces with local service configurations and potentially a CMS or backend for appointment management.

## Internal Data Structures

### Doctor Profile

```json
{
  "id": "string",
  "name": "string",
  "specialization": "string",
  "qualifications": "string",
  "timing": "string",
  "image": "url",
  "bio": "string"
}
```

### Appointment Request (Planned)

- **POST** `/api/appointments`
- **Body:**

```json
{
  "patientName": "string",
  "phone": "string",
  "service": "string",
  "preferredDate": "ISO-8601",
  "notes": "string"
}
```

## External Services

- **Google Maps API:** For clinic location and directions.
- **WhatsApp Business API:** For direct patient communication.
- **Analytics:** PostHog or Google Analytics for user behavior tracking.
