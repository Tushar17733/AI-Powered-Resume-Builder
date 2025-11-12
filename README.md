# AI-Powered Resume Builder

A full-stack MERN application that helps users create professional, ATS-friendly resumes with AI assistance.

## 🚀 Live Demo

**Try it now:** [https://resume-y1np.onrender.com/](https://resume-y1np.onrender.com/)

## Features

- User authentication (signup/login)
- Dashboard for managing multiple resumes
- AI-powered resume enhancement
- Section-based resume builder
- Multiple professional templates
- Real-time preview
- PDF export functionality
- Responsive design

## Tech Stack

- **Frontend**: React.js, React Router, Tailwind CSS, Axios, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT, bcrypt
- **AI Integration**: Gemini API
- **PDF Generation**: react-to-pdf

## How to Use

1. Visit the live application at [https://resume-y1np.onrender.com/](https://resume-y1np.onrender.com/)
2. Sign up for a new account or log in
3. Create a new resume from your dashboard
4. Fill in your information section by section
5. Use AI assistance to enhance your content if required
6. Choose from multiple professional templates
7. Preview your resume in real-time
8. Download as PDF when ready

## Project Structure

```
resume-builder/
├── backend/             # Node.js & Express backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/            # React frontend
│   ├── public/          # Static files
│   └── src/             # React source code
│       ├── components/  # Reusable components
│       ├── context/     # React context
│       ├── pages/       # Page components
│       ├── services/    # API services
│       ├── styles/      # CSS styles
│       ├── utils/       # Utility functions
│       └── App.js       # Main component
└── README.md            # Project documentation
```

## License

MIT