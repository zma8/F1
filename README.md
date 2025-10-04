# 🏎️ F1 Race Weekend Planner


<img width="1512" height="792" alt="Screenshot 2025-10-04 at 9 04 23 AM" src="https://github.com/user-attachments/assets/e731296a-34cc-41a4-b6d3-1ea894498e23" />

<img width="1512" height="819" alt="Screenshot 2025-10-04 at 9 04 18 AM" src="https://github.com/user-attachments/assets/a13b462c-7794-4caa-87c6-901b47f56b7d" />


## Description

F1 Race Weekend Planner is a full-stack web application that allows Formula 1 fans to predict race outcomes and compete with other users. Users can make predictions for upcoming F1 races, including pole position, race winner, podium finishers, fastest lap, and first DNF (Did Not Finish). Once races are completed and results are entered by administrators, the system automatically calculates points based on prediction accuracy.

This application was built to create an engaging platform for F1 enthusiasts to test their knowledge and compete with friends throughout the racing season.

### Key Features:
- **User Authentication**: Secure sign-up and sign-in with role-based access (users and admins)
- **Race Calendar**: View all upcoming and completed F1 races for the season
- **Prediction System**: Make detailed predictions for each race before it begins
- **Automatic Point Calculation**: Points are automatically awarded based on prediction accuracy when races are completed
- **Statistics Dashboard**: Track your prediction accuracy, total points, and performance over time
- **Admin Panel**: Administrators can create, edit, and manage races and results
- **Responsive Design**: Clean, modern interface optimized for desktop and mobile devices

## Getting Started

### Deployed Application
🔗 [Launch F1 Race Weekend Planner](#) 

### Planning Materials
📋 [View Project Planning & Wireframes](#) https://trello.com/invite/b/68d169d046204bad78276ecc/ATTI42345c07a17fbc6b09e3800b6594e1c40755859E/men-stack-crud-app-project


## User Stories

### Authentication & Security
- **As a user**, I want to **create an account**, so that **I can track my personal predictions.**
- **As a user**, I want to **securely log in and out**, so that **my data remains private and secure**.

### Race Information
- **As a user**, I want to **view upcoming race schedules**, so that **I can plan my weekends around race times**.
- **As a user**, I want to **see race details like date, time, and circuit**, so that **I can make informed predictions**.

### Predictions
- **As a user**, I want to **make predictions for each race** (pole position, winner, podium finishers), so that **I can test my F1 knowledge**.
- **As a user**, I want to **edit my predictions before the race starts**, so that **I can update them based on practice sessions**.

### Dashboard & Tracking
- **As a user**, I want to **see a dashboard with my next race and current predictions**, so that **I can quickly access what's coming up**.
- **As a user**, I want to **view my prediction history and accuracy**, so that **I can track my improvement over time**.

### Statistics & Gamification
- **As a user**, I want to **see my points scored for correct predictions**, so that **I can gamify my F1 experience**.
- **As a user**, I want to **view my statistics** (prediction accuracy, total points earned), so that **I can track my F1 knowledge improvement**.


## Technologies Used

### Backend
- **Node.js** - 
- **Express.js** - 
- **MongoDB** - 
- **Mongoose** -
- **Express Session** -
- **bcrypt** - 
- **method-override** - 

### Frontend
- **EJS** -
- **CSS** -
- **HTML** - 

### Development Tools
- **dotenv** - 
- **morgan** - 

## How to Use

### For Users:
1. **Sign Up/Sign In**: Create an account or log in to access the platform
2. **View Races**: Browse the F1 race calendar to see upcoming events
3. **Make Predictions**: Click on a race to make your predictions before race day
4. **Track Performance**: View your statistics and see how your predictions performed
5. **Edit Predictions**: Update your predictions anytime before the race starts

### For Administrators:
1. **Manage Races**: Create new races or edit existing ones
2. **Enter Results**: After a race concludes, enter the actual results
3. **Status Updates**: Change race status from "upcoming" to "completed"
4. **Automatic Scoring**: Points are automatically calculated when results are saved

## Point System

- **Pole Position**: 10 points
- **Race Winner**: 15 points
- **Podium Position** (each): 5 points (maximum 15 points)
- **Fastest Lap**: 5 points
- **First DNF**: 5 points
- **Maximum Total**: 50 points per race

## Next Steps (Planned Enhancements)

- [ ] Add user profile customization (favorite drivers, teams)
- [ ] Add race notifications/reminders before prediction deadlines
- [ ] Create mobile app versions (iOS/Android)
- [ ] Add social features (comments, race discussions)

