✅ System Overview: Warehouse Management System (WMS)
🔐 Authentication
Login system using JWT tokens

Protected routes (Inventory, Inbound, Outbound) only accessible after login

🧮 Inventory Management
View all products in a searchable, sortable table

Add new products (via a dedicated page)

Edit and delete existing products

Archive/unarchive products

Highlight low stock products (based on threshold)

Filter by:

All

Active

Archived

CSV/XLSX bulk upload of products

📦 Inbound Management
Track stock received from suppliers

Stores:

Product (linked to inventory)

Quantity

Supplier (received_from)

Date received

View inbound records

Bulk upload via CSV/XLSX

📤 Outbound Management
Track stock issued/shipped to recipients

Stores:

Product (linked to inventory)

Quantity

Recipient

Shipping date

Remarks

View outbound records

Bulk upload via CSV/XLSX

📁 UI & Navigation
Dashboard layout with sidebar navigation (Inventory, Inbound, Outbound, Logout)

Responsive and clean Tailwind-based design

Pages:

/inventory → inventory list

/inventory/add → add product form

/inbound → inbound records

/outbound → outbound records

🛠️ Tech Stack
Frontend: React + Vite + Tailwind CSS

Backend: Django + Django REST Framework

Database: MySQL

Authentication: JWT

Others: Axios, React Router, File Upload (pandas)
