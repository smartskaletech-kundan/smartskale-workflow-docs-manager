# SmartSkale WorkFlow Docs Manager

## Current State

Fully functional project/task/document management SaaS on Caffeine/ICP. The app has:
- Email/password auth (7 users hardcoded)
- Projects with CRUD, status management, priority, due dates
- Tasks with full column set (status, priority, assignee, transfer, work completion %)
- Kanban board, Documents with import/export, Reports (4 tabs), Team, Notifications
- Backend: 25 Motoko methods covering projects, tasks, documents, profiles, notifications, comments, activity
- Frontend: React+Vite+TypeScript, Tailwind, shadcn/ui

Project model fields: id, name, description, status, priority, ownerId, memberIds, createdAt, updatedAt, dueDate

**No sub-project support exists yet.**

## Requested Changes (Diff)

### Add
- **SubProject** type in Motoko backend with fields: id, parentProjectId, name, description, category (e.g. "Website Creation", "Online Classes", "Workshops", "Software Creation"), status, priority, ownerId, memberIds, createdAt, updatedAt, dueDate
- Backend methods: `createSubProject`, `getSubProjects`, `getSubProjectsByParent`, `getSubProject`, `updateSubProject`, `deleteSubProject`
- **10 default project categories** pre-seeded as parent projects:
  1. Website Creation (multiple sub-sites running)
  2. Online Classes (4 classes running)
  3. Workshops (5 workshops running)
  4. Software Creation (3 software projects)
  5-10. Additional project types (Mobile Apps, Marketing Campaigns, Training Programs, Client Projects, Internal Tools, Research & Development)
- **SubProjects page/tab** under Projects: clicking a project shows its sub-projects with full CRUD (add/edit/delete/save)
- Sub-project cards showing: name, description, category tag, status badge (clickable), priority, due date, task count, progress bar
- Sub-project forms with all fields: name, description, category, status, priority, due date, assigned members
- Full feature parity with projects: inline status change, delete confirmation, progress tracking
- Navigation: Projects list -> click project -> project detail with sub-projects tab
- ProjectDetail page updated to show sub-projects list with add/edit/delete

### Modify
- `ProjectDetail` page: add a "Sub Projects" tab alongside Kanban/Tasks/Documents
- `Projects` page: project cards show sub-project count
- `App.tsx`: add `sub-project-detail` page type for drilling into a sub-project
- `Sidebar`: ensure navigation flows are clear
- Backend `main.mo`: add SubProject type and all 6 CRUD methods
- `backend.d.ts`: add SubProject interface and 6 new method signatures
- `backend.did.js`: add SubProject IDL record and all 6 method IDL definitions

### Remove
- Nothing removed

## Implementation Plan

1. Update `src/backend/main.mo` -- add SubProject type and 6 CRUD methods
2. Update `src/frontend/src/declarations/backend.did.js` -- add SubProject IDL record + 6 method IDL entries in both `idlService` and `idlFactory`
3. Update `src/frontend/src/backend.d.ts` -- add SubProject interface + 6 method signatures
4. Update `src/frontend/src/pages/ProjectDetail.tsx` -- add Sub Projects tab with full list, add/edit/delete sub-project dialogs, status popover, progress per sub-project
5. Update `src/frontend/src/pages/Projects.tsx` -- show sub-project count on each project card
6. Update `src/frontend/src/App.tsx` -- add `sub-project-detail` page type and routing
7. Validate (lint + typecheck + build) and fix any errors
