# Chinese Auction 🎉

Welcome to the **Chinese Auction** project! This is a full-stack application built with Angular on the client side and ASP.NET Core on the server side. The application allows users to participate in auctions, manage gifts, and track donors.

---

## 🚀 Features

- **User Management**: Register, login, and manage user profiles.
- **Gift Auctions**: Browse, bid, and manage gifts.
- **Donor Management**: Track and manage donors.
- **Reports**: Export winners and income reports to Excel.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## 🛠️ Tech Stack

### Client
- **Framework**: Angular
- **UI Components**: PrimeNG
- **Styling**: CSS with PrimeFlex

### Server
- **Framework**: ASP.NET Core
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Mapping**: AutoMapper

---

## 📂 Project Structure

### Client
```
client/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   ├── services/
│   │   ├── components/
│   ├── assets/
│   ├── styles.css
├── angular.json
├── package.json
```

### Server
```
server/
├── Controllers/
├── DAL/
├── Models/
├── Migrations/
├── Program.cs
├── appsettings.json
```

---

## 🖥️ Getting Started

### Prerequisites
- Node.js (v16+)
- Angular CLI
- .NET SDK (v8.0+)
- SQL Server

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/chinese-auction.git
   cd chinese-auction
   ```

2. Install client dependencies:
   ```bash
   cd client
   npm install
   ```

3. Restore server dependencies:
   ```bash
   cd ../server
   dotnet restore
   ```

4. Update the database:
   ```bash
   dotnet ef database update
   ```

---

## 🏃‍♂️ Running the Application

### Client
Start the Angular development server:
```bash
cd client
ng serve
```
Navigate to `http://localhost:4200/`.

### Server
Run the ASP.NET Core server:
```bash
cd server
dotnet run
```
The server will be available at `http://localhost:5000/`.

---

## 📊 Reports

To export reports:
1. Navigate to the **Gifts List** page.
2. Click on "Download Winners Report" or "Download Incomes Report".

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## 🙏 Acknowledgments

- [Angular](https://angular.io/)
- [PrimeNG](https://primeng.org/)
- [ASP.NET Core](https://dotnet.microsoft.com/)
- [AutoMapper](https://automapper.org/)

---

Happy coding! 💻
