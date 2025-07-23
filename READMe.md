# Expense Tracker App

A modern, UX-focused expense tracking application built with React, TypeScript, and shadcn/ui. Features role-based access control for employees and administrators with intuitive workflows and comprehensive expense management capabilities.

## 🚀 Live Demo

**Live URL:** _[Leave blank - to be filled when hosted]_

## 📸 Screenshots

_[Leave blank space for screenshots to be added]_

---

## 🛠️ Setup Steps

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone [repository-url]
   cd expense-tracker
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

\`\`\`bash
npm run build
npm run preview
\`\`\`

---

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **UI Components:** shadcn/ui (built on Radix UI)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** React useState/useEffect (local state)
- **Notifications:** Sonner (toast notifications)

### Project Structure

\`\`\`
expense-tracker/
├── src/
│   ├── components/
│   │   ├── layouts/
│   │   │   ├── employee-layout.tsx    # Employee-specific UI
│   │   │   └── admin-layout.tsx       # Admin-specific UI
│   │   ├── dialogs/
│   │   │   └── add-expense-dialog.tsx # Expense submission form
│   │   ├── expense-list.tsx           # Reusable expense table
│   │   ├── insights-view.tsx          # Charts and analytics
│   │   ├── audit-logs-view.tsx        # Activity tracking
│   │   └── expense-tracker.tsx        # Main app component
│   ├── lib/
│   │   └── mock-data.ts              # Sample data and types
│   ├── app.tsx                       # App entry point
│   └── index.css                     # Global styles
├── components/ui/                    # shadcn/ui components
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
\`\`\`




### Key Architecture Decisions

#### 1. **Role-Based Conditional Rendering**
Instead of separate routes, the app uses conditional rendering based on user roles:
- Single main component (`ExpenseTracker`) handles role switching
- Separate layout components (`EmployeeLayout`, `AdminLayout`) for role-specific UI
- Shared components (`ExpenseList`) with props to customize behavior

#### 2. **Component Composition Pattern**
- Modular components that can be composed together
- Props-based customization rather than multiple similar components
- Reusable UI patterns (cards, tables, dialogs)

#### 3. **Mock Data Strategy**
- Centralized mock data in `lib/mock-data.ts`
- TypeScript interfaces for type safety
- Easy to swap for real API calls later

#### 4. **UX-First Design**
- Immediate visual feedback for all actions
- Contextual navigation based on user role
- Progressive disclosure of information
- Mobile-responsive design patterns

---

## 🎯 Features

### Employee Features
- **Dashboard Overview:** Personal expense statistics and quick actions
- **Add Expenses:** Streamlined form with validation and file upload
- **My Expenses:** Personal expense history with status tracking
- **Category Insights:** Visual breakdown of spending by category

### Admin Features
- **All Expenses Management:** Complete expense oversight with approval workflows
- **Quick Actions:** One-click approve/reject for pending expenses
- **Analytics Dashboard:** Charts showing expense trends and patterns
- **Audit Logs:** Complete activity trail for compliance
- **Employee Management:** Overview of all employee expense activity

### Shared Features
- **Role Switching:** Easy switching between employee and admin views.
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile
- **Real-time Feedback:** Toast notifications for all user actions


---

## 🔄 Trade-offs & Decisions

### ✅ What We Chose

#### **Vite over Create React App**
- **Why:** Faster development server, better build performance, modern tooling
- **Trade-off:** Slightly more configuration needed, but worth it for performance

#### **shadcn/ui over Material-UI or Ant Design**
- **Why:** Better customization, smaller bundle size, modern design system
- **Trade-off:** Less out-of-the-box components, but more design flexibility

#### **Local State over Redux/Zustand**
- **Why:** Simpler for this scope, easier to understand and maintain
- **Trade-off:** Would need refactoring for complex state management needs


### 🤔 Alternative Approaches Considered

#### **Separate Apps for Each Role**
- **Pros:** Complete separation, easier to scale teams
- **Cons:** Code duplication, harder to maintain shared components
- **Decision:** Single app with role-based rendering for better maintainability

#### **Server-Side Rendering (Next.js)**
- **Pros:** Better SEO, faster initial load
- **Cons:** More complexity, overkill for internal tool
- **Decision:** Client-side rendering sufficient for internal expense tool


---

## 🚀 Future Enhancements

### Phase 2 Features
- [ ] **Real API Integration:** Replace mock data with actual backend
- [ ] **Authentication:** Proper login/logout with JWT tokens and cookies


### Phase 3 Features
- [ ] **Real-time Updates:** WebSocket integration for live updates
- [ ] **Expense Policies:** Configurable approval rules and limits
- [ ] **Reporting:** PDF export and advanced analytics
- [ ] **Mobile App:** React Native version for mobile users
- [ ] **Integration:** Connect with accounting software (QuickBooks, etc.)

---


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for the beautiful chart components
- [Lucide React](https://lucide.dev/) for the icon set
