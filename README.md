# Rare Cancer Research Hub Backend API

A Node.js/Express backend service for managing medical research data, particularly focused on rare cancer cancers.

## 🚀 Features

- Authentication and Authorization using Clerk
- Article management system with author associations
- Organization and Institution management
- Provider directory
- Clinical trials database
- File upload system with Cloudinary integration
- OpenAI integration for medical summaries 
- PostgreSQL database with Sequelize ORM

## 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Clerk Authentication
- Cloudinary
- OpenAI API
- Jest (Testing)

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn
- Clerk account
- Cloudinary account
- OpenAI API key

## 🔧 Environment Variables

A `sample.env` file is provided in the repository as a template. Copy this file and rename it to `.env.development`, then fill in your specific values.

## 🚀 Getting Started

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by copying the sample.env:
   ```bash
   cp sample.env .env.development
   ```

4. Fill in your environment variables in `.env.development` with your:
   - Database credentials
   - Clerk authentication keys
   - Cloudinary credentials (for image and file uploads)
   - OpenAI API key (optional)

5. Start the development server:
   ```bash
   npm run dev
   ```

