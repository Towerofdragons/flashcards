# Looking to run MnW flashcards Locally?
# MnW Flashcards App - React + Django Setup Guide

This repository contains a **React + Vite** frontend and a **Django** backend for a Flashcards app with AI integration using OpenRouter. Follow this guide to set up both the frontend and backend, including necessary environment variables and database setup.

## Prerequisites

Before starting the setup, make sure you have the following installed:

- **Node.js (v14.x or higher)**: For the React app
- **Python (v3.8 or higher)**: For the Django backend
- **MySQL**: For the database
- **Pip**: For Python package management

### Steps for Setting Up the Backend (Django)

#### 1. **Clone the Repository**

Clone the repository to your local machine:

```bash
git clone <repository_url>
cd <repository_folder>
```

#### 2. **Setting up Virtual Environment**

Create and activate a Python virtual environment to isolate your dependencies:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Windows)
.\venv\Scripts\activate

# Activate the virtual environment (macOS/Linux)
source venv/bin/activate
```

#### 3. **Install Backend Dependencies**

Navigate to the backend folder and install the required Python packages:

```bash
cd backend
pip install -r requirements.txt
```

#### 4. **Set Up `.env` for Django**

Create a `.env` file in the root of the `backend` directory with the following configuration:

```bash
SECRET_KEY=<your_django_secret_key>
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

# OpenRouter API Key
OPENROUTER_API_KEY=<your_openrouter_api_key>

# MySQL Database Settings
DB_NAME=flashcards_db
DB_USER=<your_mysql_user>
DB_PASSWORD=<your_mysql_password>
DB_HOST=localhost
DB_PORT=3306
```

Make sure to replace `<your_django_secret_key>`, `<your_openrouter_api_key>`, `<your_mysql_user>`, and `<your_mysql_password>` with actual values.

#### 5. **MySQL Database Setup**

Ensure MySQL is installed on your local machine. You can set up a new database for the project by running the following commands:

1. Log into MySQL:

```bash
mysql -u root -p
```

2. Create a new database:

```sql
CREATE DATABASE flashcards_db;
```

3. Set up the database user (if needed):

```sql
CREATE USER 'your_mysql_user'@'localhost' IDENTIFIED BY 'your_mysql_password';
GRANT ALL PRIVILEGES ON flashcards_db.* TO 'your_mysql_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 6. **Migrate Database**

Apply the database migrations for your Django project:

```bash
python manage.py migrate
```

#### 7. **Run Django Server**

To start the Django server, run the following command:

```bash
python manage.py runserver
```

Now, the Django backend should be running on `http://127.0.0.1:8000/`.

---

### Steps for Setting Up the Frontend (React + Vite)

#### 1. **Navigate to the Frontend Folder**

Go to the frontend folder of the project:

```bash
cd frontend
```

#### 2. **Install Frontend Dependencies**

Install the necessary Node.js dependencies:

```bash
npm install
```

#### 3. **Set Up Environment Variables**

Create a `.env` file in the root of the `frontend` folder with the following variables:

```bash
VITE_BACKEND_URL=http://127.0.0.1:8000
```

This specifies the base URL of the backend (Django) that the frontend will make requests to.

#### 4. **Run Vite Development Server**

Start the Vite development server:

```bash
npm run dev
```

This will run the React app on `http://localhost:3000`.

---

### Additional Setup

#### 1. **Install OpenRouter**

The OpenRouter API will be used to integrate AI features (like note summarization and question generation) into the Flashcards app. To integrate it:

- **Backend**: The API key for OpenRouter is stored in the `.env` file (as shown above), and will be used when the backend makes requests to OpenRouter.
- **Frontend**: No special setup is required on the frontend unless you need to expose API calls to OpenRouter. 

#### 2. **Running Both Servers**

Make sure to run both servers (Django backend and React frontend) simultaneously for the application to work properly. You can open two terminals:

- In the **backend** directory, run the Django server:
  ```bash
  python manage.py runserver
  ```

- In the **frontend** directory, run the Vite server:
  ```bash
  npm run dev
  ```

### Testing the Application

- Once both servers are running, navigate to `http://localhost:3000` in your browser to interact with the React frontend.
- The frontend will make API calls to the Django backend, which in turn will integrate with OpenRouter for AI-powered flashcard features.

