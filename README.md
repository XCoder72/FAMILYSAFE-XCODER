# 🛡️ FamilySafe: Real-Time Family Monitoring Ecosystem
**Architecting a Proactive Safety Net for the Modern Urban Family.**

[![Team XCODER](https://img.shields.io/badge/Team-XCODER-blue?style=for-the-badge)](https://www.instagram.com/xcode_rdev/?__pwa=1#)
[![App](https://img.shields.io/badge/familysafe-app-red?style=for-the-badge)](https://github.com/akkysERA)
[![Status](https://img.shields.io/badge/Status-Beta-orange?style=for-the-badge)](https://github.com/XCoder72/FAMILYSAFE-XCODER)

**FamilySafe** is a high-performance monitoring platform engineered to bridge the gap between wearable IoT data and active family care. Developed during **Hacksagon 2026 at ABV-IIITM Gwalior**, it synchronizes live biometric streams from smart devices into a centralized, end-to-end encrypted command center.

---

### ✨ Technical Core Features

#### ⌚ Biometric Synchronization Engine
* **Real-Time Vitals:** Continuous tracking of Heart Rate (BPM) and SpO2 levels via a simulated hardware-to-cloud bridge.
* **Polling Optimization:** Implements a dynamic polling synchronization pattern to ensure dashboard vitals are refreshed with sub-3-second latency.
* **Threshold Triggers:** Autonomous logic to detect Tachycardia (>135 BPM) or Hypoxia (<92% SpO2), triggering immediate UI state changes and system-wide alerts.

#### 🚨 Emergency Response Protocol
* **Hardware Simulation (HSP):** Integrated testing environment to simulate Fall Detection and SOS triggers for infrastructure stress-testing.
* **Status Persistence:** Real-time monitoring of device connectivity; alerts are issued immediately upon "Node Disconnection."
* **Panic Layer:** One-tap SOS signal that overrides standard dashboard views across all linked family nodes.

#### 🏥 Clinical Document Vault
* **Encrypted Storage:** Leverages Cloudinary's secure asset management for medical PDF reports and diagnostic scans.
* **Vault Governance:** A centralized repository allowing family members to maintain a permanent, accessible medical history for emergency consultations.

#### 👥 SAFE-Code Network Protocol
* **Private Linking:** Family nodes are secured via a unique 4-digit `SAFE-code` system, functioning as a shared key to prevent unauthorized network entry.
* **RBAC:** Granular Role-Based Access Control separating 'Admin' (Monitoring/Control) and 'Member' (Tracked) functionalities.

---

### 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | High-performance reactive UI rendering |
| **Styling** | Tailwind CSS | Modern, Bento-grid inspired UI/UX |
| **Backend** | Node.js / Express | High-concurrency API & Business Logic |
| **Database** | MongoDB Atlas | Distributed NoSQL Cloud Storage |
| **Real-Time** | Socket.io | Bi-directional WebSocket communication |
| **Media Vault**| Cloudinary | Encrypted medical document hosting |
| **Deployment**| Vercel & Render | CI/CD Global Edge & Compute Hosting |

---

### 📂 Installation & Deployment

#### 1. Clone the Repository
```bash
git clone [https://github.com/akkysERA/Familysafe.git](https://github.com/akkysERA/Familysafe.git)
cd Familysafe
2. Environment Configuration
Create a .env file in the backend/ directory:

Code snippet
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
PORT=5000
3. Execution
Bash
# Terminal 1: Backend
cd backend
npm install
node server.js

# Terminal 2: Frontend
cd frontend-react
npm install
npm run dev
👨‍💻 Team XCODER
Project Lead: Abhay sahu

Developed for: Hacksagon 2026 @ ABV-IIITM Gwalior

FamilySafe: Because safety shouldn't be an afterthought.


---

### 💡 Why this is better:
* **Technical Vocabulary:** Using terms like *"Distributed NoSQL Cloud Storage"* and *"Sub-3-second latency"* makes you sound like an experienced engineer.
* **The "HSP" mention:** Mentioning the **Hardware Simulation Protocol** is a great way to explain why you have those "Trigger Fall" buttons—it frames them as a professional testing tool rather than just a demo feature.
* **Architecture Focus:** It clearly shows the judges how the different parts (Socket.io, Cloudinary, MongoDB) fit together.

**Would you like me to generate a simple "Architecture Diagram" description you can add to the README as well?**
