# Guild Ledger - Guild Wars 2 Trading Post Manager

[![Python](https://img.shields.io/badge/Python-3.10+-blue?logo=python)](https://python.org)
[![Django](https://img.shields.io/badge/Django-4.0-brightgreen?logo=django)](https://djangoproject.com)
[![React](https://img.shields.io/badge/React-18.x-%2361DAFB?logo=react)](https://reactjs.org)

A comprehensive trading post management system for Guild Wars 2, providing real-time market insights and inventory management.

![Guild Ledger Home Page Preview](https://i.imgur.com/pf55bF9.png)
![Guild Ledger API Page Preview](https://i.imgur.com/4pwO9HN.png)
![Guild Ledger Character Page Preview](https://imgur.com/9kyrWbE.png)
![Guild Ledger Watchlist Page Preview](https://imgur.com/aNXHqbm.png)


## Features

🔒 **Secure Authentication**  
- JWT token-based login system  
- Session management with refresh tokens  

📈 **Market Analytics**  
- Historical price tracking for 5000+ items  
- Interactive price charts with 4-day trends   

💼 **Order Management** 
- Live character inventory viewer 
- Create/modify/delete buy/sell orders  

## Tech Stack

**Backend**  
- Python 3.10+  
- Django 4.0  
- Django REST Framework  
- PostgreSQL  

**Frontend**  
- React 18  
- React-Bootstrap 2.7  
- Chart.js  
- Axios  

## Installation

1. **Clone Repository**  
```bash
git clone https://github.com/yourusername/guild-ledger.git
cd guild-ledger
```

2. **Backend Setup**  
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/MacOS
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

3. **Database Configuration**  
```bash
python manage.py migrate
python manage.py createsuperuser
```

4. **Frontend Setup**  
```bash
cd ../frontend
npm install
```

5. **Environment Variables**  
Create `.env` file in backend directory:  
```env
SECRET_KEY=your_django_secret
DB_NAME=ledger_db
DB_USER=postgres_user
```

## Usage

**Start Development Servers**  
```bash
# Backend (from backend directory)
python manage.py runserver

# Frontend (from frontend directory)
npm start
```

Access the application at:  
- API Server: `http://localhost:8000`  
- Web Client: `http://localhost:3000`

# API Integration

This project integrates with multiple APIs:

**Official Guild Wars 2 API**   
- Character inventory synchronization  
- Account information verification  

**Datawars 2 API**  
- Historical market price data archive  
- Long-term trend analysis datasets  
- Bulk historical transaction records  

```bash
# Example Datawars 2 API call
GET /api/v2/history?item_id=19721&range=30d

_Note: Requires valid Guild Wars 2 API key with appropriate permissions._

## Contributing

1. **Set Up Development Environment**  
```bash
git clone https://github.com/yourusername/guild-ledger.git
cd guild-ledger && ./setup_dev.sh
```

2. **Follow Workflow**  
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# After making changes
git commit -m "feat: add new inventory viewer"

# Push and open PR
git push origin feature/your-feature-name
```

## License

[MIT License](LICENSE)  
_Permission is granted for free use, modification, and distribution with attribution._

## Acknowledgements

This project utilizes data from the following services:

- [ArenaNet's Guild Wars 2 API](https://wiki.guildwars2.com/wiki/API:Main) for real-time game data  
- [Datawars 2 Historical API](https://datawars2.io/docs) for long-term market trends  
- [React-Bootstrap](https://react-bootstrap.github.io/) for UI components  
- [Django REST Framework](https://www.django-rest-framework.org/) for backend architecture  

Special thanks to:
- Guild Wars 2 community for item metadata contributions
- Open source maintainers of supporting libraries

## Disclaimer

❗ **Third-Party Data Sources**  
This application is not affiliated with or endorsed by:
- ArenaNet
- Guild Wars 2
- Datawars 2
- NCsoft

**Data Usage Notice**:  
- Guild Wars 2 data obtained through their official API  
- Historical pricing data provided by Datawars 2's third-party service  

**User Responsibility**:  
- API keys are stored encrypted but use at your own risk  
- Historical data accuracy depends on Datawars 2's archives  
- Market actions taken in-game are your own responsibility
