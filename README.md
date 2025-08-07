# Khadamatak Platform

**Khadamatak** is a full-stack web application built with **Django** (Python) on the backend and **React** (JavaScript) on the frontend. The platform connects users with local service providers (craftsmen), enabling registration, login, and dashboard access.

---

## 📁 Project Structure

```

KHADAMATAK-PLATFORM/
│
├── backend/               # Django Backend
│   ├── accounts/          # Django app for user accounts
│   ├── khadamatak/        # Django project configuration
│   ├── venv/              # Virtual environment
│   ├── db.sqlite3         # SQLite database (for development)
│   ├── manage.py          # Django CLI management script
│   └── requirements.txt   # Backend dependencies
│
├── frontend/              # React Frontend
│   ├── node\_modules/      # React dependencies
│   ├── public/            # Static files
│   └── src/               # Frontend source code
│       ├── components/    # Reusable components (Login, Register, Navbar, etc.)
│       ├── pages/         # Views like Home, Dashboard
│       ├── App.js         # Root component
│       ├── i18n.js        # Language switching
│       ├── index.js       # React entry point
│       └── index.css      # Global styles
│
├── .gitignore
├── package.json           # Frontend dependencies
├── README.md

````

---

## 🚀 Getting Started

### 🐍 Backend (Django)

#### 1. Navigate to the backend folder:
```bash
cd backend
````

#### 2. Create and activate virtual environment:

```bash
python -m venv venv
.\venv\Scripts\activate   # Windows
```

#### 3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

#### 4. Apply database migrations:

```bash
python manage.py migrate
```

#### 5. Start Django development server:

```bash
python manage.py runserver
```

The backend will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

### ⚛️ Frontend (React)

#### 1. Navigate to the frontend folder:

```bash
cd frontend
```

#### 2. Install frontend dependencies:

```bash
npm install
```

#### 3. Start the frontend server:

```bash
npm start
```

The React app will run at: [http://localhost:3000](http://localhost:3000)

> 🧠 Make sure to configure API URLs in your frontend code to match your backend (localhost or production).

---

## 🔐 Authentication

* User registration and login handled in `Login.js` and `Register.js`
* Protected routes implemented using `ProtectedRoute.js`

---

## 🌍 Language Support

This project uses `i18next` for multilingual support via `i18n.js`. Switch languages using the `LanguageSwitcher.js` component.

---

## 🛠 Technologies Used

* **Frontend:** React, React Router, i18next
* **Backend:** Django, Django REST Framework
* **Database:** SQLite (for development)
* **Tools:** VSCode, Git, GitHub

---

## 📦 Deployment

You can deploy the backend using services like:

* [Render](https://render.com/)
* [Heroku](https://www.heroku.com/)
* [Railway](https://railway.app/)

Frontend deployment options:

* [Netlify](https://netlify.com/)
* [Vercel](https://vercel.com/)
* [GitHub Pages](https://pages.github.com/)

---

## 🤝 Contribution

Contributions are welcome! If you'd like to contribute:

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

For questions or feedback, feel free to reach out via \[[your-email@example.com](mailto:your-email@example.com)] or open an issue on GitHub.

---

## 📎 Cloning the Repository

```bash
git clone https://github.com/your-username/khadamatak-platform.git
cd khadamatak-platform
```

---
