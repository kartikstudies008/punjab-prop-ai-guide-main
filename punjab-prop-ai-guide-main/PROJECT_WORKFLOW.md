# 🏠 Punjab Property AI — Complete Project Workflow

> AI-powered property price prediction for Punjab & Tricity regions.
> Built with **React + Vite** (Frontend) and **Flask + scikit-learn** (Backend).

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Project Structure](#4-project-structure)
5. [Dataset Preparation](#5-dataset-preparation)
6. [ML Model Training](#6-ml-model-training)
7. [Backend (Flask API)](#7-backend-flask-api)
8. [Frontend (React + Vite)](#8-frontend-react--vite)
9. [Authentication Flow](#9-authentication-flow)
10. [Prediction Flow](#10-prediction-flow)
11. [API Endpoints Reference](#11-api-endpoints-reference)
12. [Setup & Run Instructions](#12-setup--run-instructions)
13. [Testing](#13-testing)
14. [Deployment](#14-deployment)

---

## 1. Project Overview

**Punjab Property AI** is a full-stack web application that predicts real estate prices across Punjab & Tricity (Chandigarh, Mohali, Zirakpur, Kharar, etc.) using a machine learning model trained on real property transaction data.

### Key Features
- 🤖 **AI Price Prediction** — Random Forest model trained on real property data
- 🔐 **User Authentication** — Signup/Login with bcrypt-hashed passwords
- 🎫 **Credit System** — Guest users get 3 free predictions, login for unlimited
- 🎨 **Premium Dark UI** — Glassmorphism, gold gradients, smooth animations
- 📱 **Fully Responsive** — Works on desktop, tablet, and mobile

---

## 2. Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| TypeScript | Type Safety |
| Vite 5 | Build Tool & Dev Server (port `8080`) |
| Tailwind CSS 3 | Utility-first Styling |
| shadcn/ui | UI Component Library |
| React Router v6 | Client-side Routing |
| TanStack React Query | Data Fetching |
| Lucide React | Icon Library |

### Backend
| Technology | Purpose |
|------------|---------|
| Python 3.10+ | Language |
| Flask | Web Framework (port `5000`) |
| Flask-CORS | Cross-Origin Resource Sharing |
| scikit-learn | Machine Learning (RandomForestRegressor) |
| pandas | Data Processing |
| NumPy | Numerical Computation |
| joblib | Model Serialization (.pkl files) |
| bcrypt | Password Hashing |
| SQLite | User Database |
| boto3 | AWS S3 (dataset storage – optional) |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                       USER (Browser)                     │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND  (React + Vite)                    │
│              http://localhost:8080                        │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Navbar  │  │   Hero   │  │ Predict  │  │  About  │ │
│  │Component │  │ Section  │  │  Form    │  │ Section │ │
│  └──────────┘  └──────────┘  └────┬─────┘  └─────────┘ │
│                                    │                     │
│  ┌──────────┐  ┌──────────┐       │                     │
│  │  Login   │  │  Signup  │       │                     │
│  │  Page    │  │  Page    │       │                     │
│  └────┬─────┘  └────┬─────┘       │                     │
│       │              │             │                     │
│       └──────────────┼─────────────┘                     │
│                      │                                   │
│              src/lib/api.ts                              │
│        API_BASE = "http://127.0.0.1:5000"               │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTP (JSON)
                       ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND  (Flask API)                        │
│              http://127.0.0.1:5000                       │
│                                                          │
│  ┌──────────────────────────────────────────────┐       │
│  │              Flask Routes                     │       │
│  │                                               │       │
│  │  GET  /           → Health Check              │       │
│  │  POST /signup     → Create User Account       │       │
│  │  POST /login      → Authenticate User         │       │
│  │  POST /predict    → Predict Property Price    │       │
│  └──────┬──────────────────────┬────────────────┘       │
│         │                      │                         │
│         ▼                      ▼                         │
│  ┌──────────────┐    ┌──────────────────────┐           │
│  │  SQLite DB   │    │   ML Model (.pkl)    │           │
│  │  (users.db)  │    │                      │           │
│  │              │    │  price_model.pkl      │           │
│  │  - id        │    │  city_encoder.pkl     │           │
│  │  - name      │    │  furnish_encoder.pkl  │           │
│  │  - email     │    │                      │           │
│  │  - password  │    │  RandomForest        │           │
│  │    (hashed)  │    │  (200 trees)         │           │
│  └──────────────┘    └──────────────────────┘           │
└─────────────────────────────────────────────────────────┘
                       ▲
                       │  (Training only)
                       │
┌─────────────────────────────────────────────────────────┐
│              ML TRAINING PIPELINE                        │
│                                                          │
│  punjab_property_dataset.csv                             │
│         │                                                │
│         ▼                                                │
│  train_model.py                                          │
│         │                                                │
│         ├── LabelEncoder (city, furnishing)              │
│         ├── Train/Test Split (80/20)                     │
│         ├── RandomForestRegressor (200 trees)            │
│         ├── Evaluate (MAE, R² Score)                     │
│         │                                                │
│         ▼                                                │
│  Outputs: price_model.pkl                                │
│           city_encoder.pkl                                │
│           furnish_encoder.pkl                             │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Project Structure

```
punjab-prop-ai-guide-main/
│
├── 📂 Frontend (this repo)
│   ├── index.html                    # HTML entry point (SEO meta tags)
│   ├── package.json                  # Node dependencies & scripts
│   ├── vite.config.ts                # Vite config (port 8080, path aliases)
│   ├── tailwind.config.ts            # Tailwind theme (gold/green palette)
│   ├── tsconfig.json                 # TypeScript config
│   │
│   ├── src/
│   │   ├── main.tsx                  # React entry point
│   │   ├── App.tsx                   # Root component + Routes
│   │   ├── index.css                 # Global styles (CSS variables, fonts)
│   │   │
│   │   ├── lib/
│   │   │   └── api.ts                # API_BASE = "http://127.0.0.1:5000"
│   │   │
│   │   ├── pages/
│   │   │   ├── Index.tsx             # Landing page (Hero + Predict + About)
│   │   │   ├── Login.tsx             # Login page (glassmorphism design)
│   │   │   ├── Signup.tsx            # Signup page
│   │   │   ├── Predict.tsx           # Protected prediction page
│   │   │   └── NotFound.tsx          # 404 page
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.tsx            # Nav with Login/Logout toggle
│   │   │   ├── HeroSection.tsx       # Hero banner with background image
│   │   │   ├── PredictionForm.tsx    # 7-field form + credit system
│   │   │   ├── AboutSection.tsx      # "How It Works" cards
│   │   │   ├── Footer.tsx            # Footer
│   │   │   └── ui/                   # shadcn/ui component library
│   │   │
│   │   └── assets/
│   │       └── hero-bg.jpg           # Hero background image
│   │
│   └── dist/                         # Production build output
│
├── 📂 Backend (separate folder / repo)
│   ├── app.py                        # Flask API server
│   ├── train_model.py                # ML model training script
│   ├── requirements.txt              # Python dependencies
│   ├── punjab_property_dataset.csv   # Training dataset
│   ├── price_model.pkl               # Trained ML model
│   ├── city_encoder.pkl              # City label encoder
│   ├── furnish_encoder.pkl           # Furnishing label encoder
│   ├── users.db                      # SQLite user database (auto-created)
│   └── test_app.py                   # API tests
```

---

## 5. Dataset Preparation

### Dataset Format (`punjab_property_dataset.csv`)

| Column | Type | Description | Example Values |
|--------|------|-------------|----------------|
| `city` | string | City name | Mohali, Zirakpur, Chandigarh, Kharar, Ludhiana, Amritsar, Patiala, Jalandhar |
| `bhk` | int | Number of bedrooms | 1, 2, 3, 4 |
| `area_sqft` | int | Area in square feet | 500 – 5000 |
| `furnishing` | string | Furnishing status | furnished, semi, unfurnished |
| `bathroom` | int | Number of bathrooms | 1, 2, 3, 4 |
| `parking` | string | Parking available | Yes, No |
| `property_age` | int | Age in years | 0 – 50 |
| `price_lakhs` | float | Price in Lakhs (₹) | 10.0 – 200.0 |

### Sample Data

```csv
city,bhk,area_sqft,furnishing,bathroom,parking,property_age,price_lakhs
Mohali,3,1200,furnished,2,Yes,5,45.5
Chandigarh,2,900,semi,1,No,10,32.0
Zirakpur,4,2000,furnished,3,Yes,2,78.3
Kharar,2,800,unfurnished,1,Yes,8,22.5
Ludhiana,3,1500,semi,2,Yes,3,55.0
```

### Dataset Source Options
- **Option A (Local):** Place CSV directly in the backend folder
- **Option B (AWS S3):** Upload to S3 bucket `property-ai-images` and load via boto3

---

## 6. ML Model Training

### Training Script (`train_model.py`)

```python
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import os

# ─── Load Dataset ─────────────────────────────────────
DATA_PATH = os.path.join(os.path.dirname(__file__), "punjab_property_dataset.csv")
df = pd.read_csv(DATA_PATH)
print(f"✅ Loaded {len(df)} rows")

# ─── Encode Categorical Features ─────────────────────
city_enc = LabelEncoder()
furnish_enc = LabelEncoder()

df["city_encoded"]    = city_enc.fit_transform(df["city"])
df["furnish_encoded"] = furnish_enc.fit_transform(df["furnishing"])
df["parking_encoded"] = df["parking"].apply(lambda x: 1 if x == "Yes" else 0)

# ─── Define Features & Target ────────────────────────
X = df[["city_encoded", "bhk", "area_sqft", "furnish_encoded",
        "bathroom", "parking_encoded", "property_age"]]
y = df["price_lakhs"]

# ─── Train/Test Split (80/20) ────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ─── Train RandomForest Model ────────────────────────
model = RandomForestRegressor(
    n_estimators=200,
    max_depth=15,
    min_samples_split=5,
    random_state=42
)
model.fit(X_train, y_train)

# ─── Evaluate ────────────────────────────────────────
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2  = r2_score(y_test, y_pred)
print(f"\n📊 Model Evaluation:")
print(f"   MAE  : ₹{mae:.2f} Lakhs")
print(f"   R²   : {r2:.4f}")

# ─── Save Model & Encoders ──────────────────────────
joblib.dump(model,       "price_model.pkl")
joblib.dump(city_enc,    "city_encoder.pkl")
joblib.dump(furnish_enc, "furnish_encoder.pkl")
print("\n💾 Saved: price_model.pkl, city_encoder.pkl, furnish_encoder.pkl")
```

### Training Pipeline Workflow

```
punjab_property_dataset.csv
        │
        ▼
┌───────────────────────┐
│  Load CSV (pandas)    │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  Encode Categoricals  │
│  • city → LabelEncoder│
│  • furnishing → LE    │
│  • parking → 0/1      │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  Feature Matrix (X)   │
│  7 features:          │
│  city_encoded, bhk,   │
│  area_sqft, furnish,  │
│  bathroom, parking,   │
│  property_age         │
│                       │
│  Target (y):          │
│  price_lakhs          │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  Train/Test Split     │
│  80% train / 20% test │
│  random_state=42      │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  RandomForestRegressor│
│  n_estimators = 200   │
│  max_depth = 15       │
│  min_samples_split = 5│
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  Evaluate             │
│  • MAE (₹ Lakhs)     │
│  • R² Score           │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│  Save .pkl Files      │
│  • price_model.pkl    │
│  • city_encoder.pkl   │
│  • furnish_encoder.pkl│
└───────────────────────┘
```

### Run Training

```bash
python train_model.py
```

**Expected Output:**
```
✅ Loaded 500 rows
📊 Model Evaluation:
   MAE  : 4.32 Lakhs
   R²   : 0.8765
💾 Saved: price_model.pkl, city_encoder.pkl, furnish_encoder.pkl
```

---

## 7. Backend (Flask API)

### `app.py` — Complete Server Code

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import sqlite3
import bcrypt
import os

app = Flask(__name__)

# Allow frontend origins
CORS(app, origins=[
    "http://localhost:8080",
    "http://localhost:5173",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:5173",
])

# ─── Database Setup ──────────────────────────────────
DB_PATH = os.path.join(os.path.dirname(__file__), "users.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password BLOB NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ─── Load ML Model ──────────────────────────────────
MODEL_DIR   = os.path.dirname(__file__)
model       = joblib.load(os.path.join(MODEL_DIR, "price_model.pkl"))
city_enc    = joblib.load(os.path.join(MODEL_DIR, "city_encoder.pkl"))
furnish_enc = joblib.load(os.path.join(MODEL_DIR, "furnish_encoder.pkl"))


# ─── Routes ─────────────────────────────────────────

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Punjab Property AI Backend Running ✅"})


@app.route("/signup", methods=["POST"])
def signup():
    data     = request.json
    name     = data.get("name", "").strip()
    email    = data.get("email", "").strip()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (name, email, hashed)
        )
        conn.commit()
        return jsonify({"message": "User created successfully"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "User already exists"}), 400
    finally:
        conn.close()


@app.route("/login", methods=["POST"])
def login():
    try:
        data     = request.json
        email    = data.get("email", "").strip()
        password = data.get("password", "")

        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT password FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        conn.close()

        if user and bcrypt.checkpw(password.encode(), user[0]):
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"error": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        city       = city_enc.transform([data["city"]])[0]
        furnishing = furnish_enc.transform([data["furnishing"]])[0]

        features = np.array([[
            city,
            int(data["bhk"]),
            int(data["area_sqft"]),
            furnishing,
            int(data["bathroom"]),
            1 if data["parking"] == "Yes" else 0,
            int(data["property_age"])
        ]])

        price = model.predict(features)[0]
        price = max(price, 0)

        return jsonify({
            "predicted_price": round(price, 2),
            "price_per_sqft": round(price * 100000 / int(data["area_sqft"]), 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─── Run Server ─────────────────────────────────────
if __name__ == "__main__":
    app.run(port=5000, debug=True)
```

### Backend Workflow

```
Server Start (python app.py)
        │
        ├── 1. init_db()          → Creates users.db (if not exists)
        ├── 2. Load price_model.pkl
        ├── 3. Load city_encoder.pkl
        ├── 4. Load furnish_encoder.pkl
        │
        ▼
  Flask Server Running on port 5000
        │
        ├── GET  /         → Returns health check JSON
        ├── POST /signup   → Hashes password → Saves to SQLite
        ├── POST /login    → Checks bcrypt hash → Returns success/fail
        └── POST /predict  → Encodes input → model.predict() → Returns price
```

---

## 8. Frontend (React + Vite)

### Component Hierarchy

```
App.tsx
├── BrowserRouter
│   ├── Route "/"        → Index.tsx
│   │                        ├── Navbar.tsx
│   │                        ├── HeroSection.tsx
│   │                        ├── PredictionForm.tsx
│   │                        ├── AboutSection.tsx
│   │                        └── Footer.tsx
│   │
│   ├── Route "/login"   → Login.tsx
│   ├── Route "/signup"  → Signup.tsx
│   │
│   ├── Route "/predict" → ProtectedRoute
│   │                        └── Predict.tsx
│   │                            └── PredictionForm.tsx
│   │
│   └── Route "*"        → NotFound.tsx
```

### API Connection (`src/lib/api.ts`)

```typescript
export const API_BASE = "http://127.0.0.1:5000";
```

All frontend `fetch()` calls use `${API_BASE}/endpoint`.

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `hsl(152, 45%, 22%)` | Dark green (headers, nav) |
| `--gold` | `hsl(43, 72%, 52%)` | Gold accent (buttons, highlights) |
| `--gold-light` | `hsl(43, 72%, 65%)` | Gold gradient end |
| `--background` | `hsl(0, 0%, 98%)` | Page background |
| `--font-display` | Playfair Display | Headings |
| `--font-body` | DM Sans | Body text |

### Key UI Features
- **Glassmorphism** cards on Login/Signup (semi-transparent + blur)
- **Gold gradient** buttons (`gold-gradient` CSS class)
- **Floating orbs** background animation on auth pages
- **Grid dot pattern** overlay
- **Fade-in / Scale-in** animations on results

---

## 9. Authentication Flow

```
┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│   Signup     │          │    Flask     │          │   SQLite     │
│   Page       │          │   /signup    │          │   users.db   │
│              │          │              │          │              │
│  name        │  POST    │  Validate    │  INSERT  │  id          │
│  email       │ ──────►  │  Hash pwd    │ ──────►  │  name        │
│  password    │  JSON    │  (bcrypt)    │          │  email       │
│  confirm pwd │          │              │          │  password    │
│              │  ◄────── │  201 / 400   │          │  (hashed)    │
│  → /login    │  JSON    │              │          │              │
└──────────────┘          └──────────────┘          └──────────────┘

┌──────────────┐          ┌──────────────┐          ┌──────────────┐
│   Login      │          │    Flask     │          │   SQLite     │
│   Page       │          │   /login     │          │   users.db   │
│              │          │              │          │              │
│  email       │  POST    │  Fetch user  │  SELECT  │              │
│  password    │ ──────►  │  Compare     │ ──────►  │  password    │
│              │  JSON    │  bcrypt hash │          │  (hashed)    │
│              │          │              │          │              │
│              │  ◄────── │  200 / 401   │          │              │
│              │  JSON    │              │          │              │
│              │          │              │          │              │
│  localStorage│          │              │          │              │
│  .setItem(   │          │              │          │              │
│  "isLoggedIn"│          │              │          │              │
│  , "true")   │          │              │          │              │
│              │          │              │          │              │
│  → redirect  │          │              │          │              │
│    to "/"    │          │              │          │              │
└──────────────┘          └──────────────┘          └──────────────┘

Logout:
  localStorage.removeItem("isLoggedIn")
  window.location.reload()
```

---

## 10. Prediction Flow

```
┌────────────────────────────────────────────────┐
│              PredictionForm.tsx                  │
│                                                  │
│  User fills 7 fields:                           │
│  ┌────────────┐  ┌────────────┐                 │
│  │ City    ▼  │  │ BHK     ▼  │                 │
│  └────────────┘  └────────────┘                 │
│  ┌────────────┐  ┌────────────┐                 │
│  │ Area (sqft)│  │ Furnishing▼│                 │
│  └────────────┘  └────────────┘                 │
│  ┌────────────┐  ┌────────────┐                 │
│  │ Bathrooms  │  │ Parking  ▼ │                 │
│  └────────────┘  └────────────┘                 │
│  ┌─────────────────────────────┐                │
│  │ Property Age (years)        │                │
│  └─────────────────────────────┘                │
│                                                  │
│  ┌─────────────────────────────┐                │
│  │   [Predict Property Price]  │  gold-gradient │
│  └──────────────┬──────────────┘                │
│                 │                                │
│    ┌────────────▼────────────┐                   │
│    │  Credit Check           │                   │
│    │  Guest: 3 free credits  │                   │
│    │  Logged in: unlimited   │                   │
│    └────────────┬────────────┘                   │
│                 │                                │
│                 ▼                                │
│    Credits > 0 or logged in?                     │
│    ├── NO → Show "Free Limit Reached" popup     │
│    │        → Prompt Login/Signup                │
│    │                                             │
│    └── YES ─────────────────────┐                │
│                                 │                │
└─────────────────────────────────┼────────────────┘
                                  │
                    POST /predict │  JSON payload
                                  │
                                  ▼
                    ┌──────────────────────┐
                    │     Flask Backend     │
                    │                      │
                    │  1. Encode city       │
                    │     (LabelEncoder)   │
                    │  2. Encode furnishing │
                    │  3. Build feature     │
                    │     array [7 values]  │
                    │  4. model.predict()   │
                    │  5. max(price, 0)     │
                    │                      │
                    │  Return JSON:        │
                    │  {                   │
                    │    predicted_price,   │
                    │    price_per_sqft    │
                    │  }                   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Results Display     │
                    │                      │
                    │  ₹ XX.XX Lakhs       │
                    │  ₹ XXXX / sq ft      │
                    │  Investment Advice:   │
                    │   < 30L → Budget     │
                    │   30-60L → Fair      │
                    │   > 60L → Premium    │
                    └──────────────────────┘
```

---

## 11. API Endpoints Reference

### `GET /` — Health Check

```
Response: { "message": "Punjab Property AI Backend Running ✅" }
```

---

### `POST /signup` — Create User Account

**Request:**
```json
{
  "name": "Kartik Singh",
  "email": "kartik@example.com",
  "password": "mypassword123"
}
```

**Success Response (200):**
```json
{ "message": "User created successfully" }
```

**Error Response (400):**
```json
{ "error": "User already exists" }
```

---

### `POST /login` — Authenticate User

**Request:**
```json
{
  "email": "kartik@example.com",
  "password": "mypassword123"
}
```

**Success Response (200):**
```json
{ "message": "Login successful" }
```

**Error Response (401):**
```json
{ "error": "Invalid email or password" }
```

---

### `POST /predict` — Predict Property Price

**Request:**
```json
{
  "city": "Mohali",
  "bhk": 3,
  "area_sqft": 1200,
  "furnishing": "furnished",
  "bathroom": 2,
  "parking": "Yes",
  "property_age": 5
}
```

**Success Response (200):**
```json
{
  "predicted_price": 45.67,
  "price_per_sqft": 3805.83
}
```

**Error Response (500):**
```json
{ "error": "error description" }
```

---

## 12. Setup & Run Instructions

### Prerequisites

| Tool | Version | Check Command |
|------|---------|---------------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Python | 3.10+ | `python --version` |
| pip | latest | `pip --version` |

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/punjab-prop-ai-guide.git
cd punjab-prop-ai-guide
```

### Step 2 — Setup Backend

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**`requirements.txt`:**
```
flask==3.1.*
flask-cors==5.*
scikit-learn==1.6.*
pandas==2.2.*
numpy==2.*
joblib==1.*
bcrypt==4.*
boto3==1.*
gunicorn==23.*
pytest==8.*
```

### Step 3 — Prepare Dataset

Place `punjab_property_dataset.csv` in the `backend/` folder with the columns listed in [Section 5](#5-dataset-preparation).

### Step 4 — Train the ML Model

```bash
python train_model.py
```

This generates three `.pkl` files in the backend folder.

### Step 5 — Start Backend Server

```bash
python app.py
```

Server runs at `http://127.0.0.1:5000`

### Step 6 — Setup Frontend

```bash
# Navigate to frontend folder
cd ../frontend   # (or the root of this repo)

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at `http://localhost:8080`

### Step 7 — Open in Browser

Visit `http://localhost:8080` and start predicting! 🎉

---

## 13. Testing

### Backend API Tests (`test_app.py`)

```python
import pytest
import json
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_health_check(client):
    res = client.get("/")
    assert res.status_code == 200

def test_signup(client):
    res = client.post("/signup", json={
        "name": "Test User",
        "email": "test_unique@test.com",
        "password": "test123"
    })
    assert res.status_code == 200

def test_login(client):
    # First signup
    client.post("/signup", json={
        "name": "Test",
        "email": "login_test@test.com",
        "password": "test123"
    })
    # Then login
    res = client.post("/login", json={
        "email": "login_test@test.com",
        "password": "test123"
    })
    assert res.status_code == 200

def test_predict(client):
    res = client.post("/predict", json={
        "city": "Mohali",
        "bhk": 3,
        "area_sqft": 1200,
        "furnishing": "furnished",
        "bathroom": 2,
        "parking": "Yes",
        "property_age": 5
    })
    data = json.loads(res.data)
    assert res.status_code == 200
    assert "predicted_price" in data
    assert data["predicted_price"] >= 0
```

Run tests:
```bash
pytest test_app.py -v
```

### Frontend Tests

```bash
npm run test
```

### Manual Testing with curl

```bash
# Health Check
curl http://127.0.0.1:5000/

# Signup
curl -X POST http://127.0.0.1:5000/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.com","password":"123456"}'

# Login
curl -X POST http://127.0.0.1:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"t@t.com","password":"123456"}'

# Predict
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"city":"Mohali","bhk":3,"area_sqft":1200,"furnishing":"furnished","bathroom":2,"parking":"Yes","property_age":5}'
```

---

## 14. Deployment

### Backend (Render / Railway / EC2)

1. Push backend folder to a separate GitHub repo
2. Set Python version in `runtime.txt`: `python-3.10.12`
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app --bind 0.0.0.0:$PORT`
5. Include `.pkl` files in the repo (or download from S3 on startup)

### Frontend (Vercel / Netlify)

1. Push frontend to GitHub
2. Connect to Vercel/Netlify
3. Build command: `npm run build`
4. Output directory: `dist`
5. Update `src/lib/api.ts` to point to deployed backend URL:
   ```typescript
   export const API_BASE = "https://your-backend.onrender.com";
   ```

### Environment Variables (Production)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `FLASK_ENV` | Environment | `production` |
| `AWS_ACCESS_KEY_ID` | S3 access (if using S3) | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | S3 secret (if using S3) | `wJal...` |

---

## Quick Reference

| Action | Command | Location |
|--------|---------|----------|
| Install frontend deps | `npm install` | Frontend root |
| Start frontend | `npm run dev` | Frontend root |
| Build frontend | `npm run build` | Frontend root |
| Create Python venv | `python -m venv venv` | Backend folder |
| Activate venv (Windows) | `.\venv\Scripts\Activate.ps1` | Backend folder |
| Install backend deps | `pip install -r requirements.txt` | Backend folder |
| Train ML model | `python train_model.py` | Backend folder |
| Start backend | `python app.py` | Backend folder |
| Run backend tests | `pytest test_app.py -v` | Backend folder |
| Run frontend tests | `npm run test` | Frontend root |

---

> **Developed by a Student Developer** • © 2026 Punjab Property AI. All Rights Reserved.
