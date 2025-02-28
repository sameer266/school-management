

# School Management System

This is a comprehensive website for a school management system, designed to be applicable in real schools. The system is built using Django Rest Framework (DRF) and React, Interated with chat bot using deepseek R1 AI model

## Features

- **Student Management**: Manage student information, enrollments, and records.
- **Teacher Management**: Manage teacher profiles, schedules, and assignments.
- **Class Management**: Organize classes, subjects, and timetables.
- **Attendance Tracking**: Track student and teacher attendance.
- **Grades and Reports**: Record grades and generate report cards.
- **Notifications**: Send notifications to students, teachers, and parents.
- **User Authentication**: Secure login for administrators, teachers, students, and parents.

## Technologies Used

- **Backend**: Python, Django Rest Framework (DRF)
- **Frontend**: JavaScript, React
- **Styling**: CSS, HTML

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sameer266/school-management.git
   cd school-management
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Django development server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the React project directory:
   ```bash
   cd sacred-react
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

The React app will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

For deployment instructions, refer to the [Django deployment documentation](https://docs.djangoproject.com/en/stable/howto/deployment/) and the [Create React App deployment documentation](https://facebook.github.io/create-react-app/docs/deployment).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Thanks to the Django and React communities for their excellent frameworks and tools.
- Special thanks to all contributors and testers for their support and feedback.

For more information, visit the [repository](https://github.com/sameer266/school-management).

Feel free to customize this README further to better suit your project's needs.
