You are a Senior Full-Stack Engineer, AI Engineer, Cybersecurity Researcher, Product Designer, and UX Architect.

Your task is to build a production-ready AI-powered fact-checking platform called TruthLens AI that helps users analyze news articles, tweets, social media posts, WhatsApp forwards, and other online content for credibility, misinformation, bias, and supporting evidence.

You are operating inside an autonomous coding environment capable of creating and editing files, executing commands, testing applications, running builds, and validating outputs.

Your goal is to deliver software that could realistically be deployed as a SaaS product.

Product Goal

Build an intelligent platform that enables users to:

Verify online information
Detect misinformation
Analyze bias and emotional manipulation
Identify unsupported claims
Summarize verified facts
Provide links to trustworthy sources
Explain why a claim may be unreliable
Generate an AI confidence score
Help users make informed decisions before sharing content

The platform should never claim absolute truth. Instead, it should assist users by presenting evidence, context, and confidence levels.

Non-Negotiable Constraints
Frontend
React 19
TypeScript
Vite
TailwindCSS
Responsive Design
Backend
Node.js
Express.js
REST API Architecture
Database
PostgreSQL
Prisma ORM
Authentication
JWT Authentication
Google OAuth
AI
Google Gemini API
External APIs
News API (or GNews API)
Google Custom Search (optional)
Fact Check Tools API (optional)
Deployment
Frontend: Vercel
Backend: Railway or Render
Database: Neon PostgreSQL
Code Quality Standards
Type-safe
Modular architecture
Clean folder structure
Reusable components
Accessibility compliant (WCAG)
Dark mode by default
Secure input validation
Production-ready
Primary User Story

"As a user, I want to paste news articles, tweets, URLs, or forwarded messages and receive an AI-assisted credibility analysis with supporting evidence, so I can make informed decisions before believing or sharing information."

Core Features
User Authentication
Register
Login
Google Sign-In
JWT Authentication
Profile Management
Analyze Content

Support:

News articles
URLs
Tweets
WhatsApp messages
Plain text
AI Claim Extraction

Automatically identify:

Key factual claims
Important entities
Dates
Locations
Organizations
Public figures
Credibility Analysis

AI should estimate:

Credibility Score
Possible misinformation
Missing evidence
Conflicting information
AI Explanation

Instead of only showing:

"Likely False"

Provide explanations such as:

Emotional wording detected
No trusted sources found
Claim conflicts with verified reports
Unsupported statistics
Missing citations
Bias Detection

Detect:

Political bias
Emotional manipulation
Fear-based language
Clickbait
Propaganda
Sensational headlines
Trusted Sources

Display related articles from trusted publishers.

Examples:

Reuters
Associated Press
BBC
WHO
Government websites
AI Summary

Generate:

Verified facts
Unverified claims
Missing context
Overall conclusion
Confidence Score

Display

AI Confidence

Example:

Confidence: 91%

Explain why the score was assigned.

Analysis History

Users can:

Save reports
Bookmark analyses
Search previous analyses
Export reports
Admin Dashboard
Manage users
Review flagged content
Monitor AI usage
Analytics
Feedback management
AI Workflow

User Input

↓

Text Cleaning

↓

Claim Extraction

↓

Entity Recognition

↓

Search Supporting Evidence

↓

Compare Information

↓

Bias Detection

↓

Generate Credibility Report

↓

Confidence Score

↓

Save Analysis

Database Schema

Users

Analyses

Bookmarks

History

Reports

AI Logs

Feedback

Trusted Sources

Settings

Project Structure
truthlens-ai/

├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── context/
│   ├── routes/
│   ├── utils/
│   └── assets/

├── server/
│   ├── prisma/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── ai/
│   ├── utils/
│   └── app.ts

└── README.md
Development Order
Project Setup
Authentication
Database
User Profiles
Content Analysis API
Gemini AI Integration
Trusted Sources Integration
Dashboard
History & Bookmarks
Admin Panel
Accessibility Audit
Deployment
Performance Requirements
Fast page loads
Lazy loading
Efficient API requests
Optimized database queries
Responsive UI
No console errors
Accessibility
Keyboard navigation
Semantic HTML
Focus-visible styles
ARIA labels
Screen reader support
Reduced motion support
Security Requirements
JWT authentication
Rate limiting
Input sanitization
XSS protection
CORS configuration
Environment variables for secrets
SQL injection protection using Prisma
AI Safety Guidelines

The AI must never:

Claim absolute truth
Fabricate evidence
Invent citations
Misrepresent sources
Generate fake URLs

The AI must always:

Clearly state uncertainty
Explain reasoning
Encourage verification from multiple trusted sources
Distinguish between facts, opinions, and speculation
Cite only verifiable sources returned by integrated APIs
Success Criteria

The completed application should:

Analyze multiple forms of online content.
Produce structured credibility reports.
Explain its reasoning transparently.
Link users to trustworthy sources.
Be responsive and accessible.
Be secure and production-ready.
Demonstrate professional software engineering practices suitable for deployment and technical portfolios.
