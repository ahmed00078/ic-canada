# IC-Canada Project

Welcome to the IC-Canada project repository! This project is structured with a frontend built in Angular and a backend powered by Django. Below you will find all the necessary instructions to set up and start contributing to the project.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:
- Node.js (preferably installed via NVM)
- npm (comes with Node.js)
- Python 3.8 or higher
- virtualenv (for creating isolated Python environments)
- PostgreSQL (database server)
- Git (for version control)

## Getting Started

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/ahmed00078/ic-canada.git
cd ic-canada
```

### Frontend Setup

Navigate to the frontend directory, install dependencies, and start the Angular development server:

```bash
cd frontend
nvm install node  # Install Node.js if not already installed
npm install       # Install all required npm packages
ng serve          # Launch the development server
```

Visit `http://localhost:4200/` in your browser to view the frontend.

### Backend Setup

Set up the backend by creating a Python virtual environment, installing dependencies, and starting the Django server:

```bash
cd backend
virtualenv icc            # Create a virtual environment named icc
source icc/bin/activate   # Activate the virtual environment
pip install -r requirements.txt  # Install the required Python packages
python manage.py migrate         # Run database migrations
python manage.py runserver       # Start the Django development server
```

The backend API will be available at `http://localhost:8000/`.

### Database Setup

Ensure your PostgreSQL server is running. Set up the database required by the Django backend:

```bash
sudo -u postgres psql
CREATE DATABASE clev;    # Create the database if it doesn't already exist
\q                       # Exit the PostgreSQL prompt
```

### Git Workflow

To streamline your contributions, follow this simple Git workflow:

```bash
git pull origin main           # Always pull the latest changes from the main branch
git checkout -b feature/your-feature-name  # Create a new branch for your feature
# Implement your feature
git add .
git commit -m "Add a concise and informative commit message"
git push origin feature/your-feature-name  # Push your branch
```

Create a pull request through GitHub to merge your feature branch into the main branch after your changes are reviewed by peers.

### View Commit History

For a visual representation of the commit history, use:

```bash
git log --graph --oneline --decorate
```