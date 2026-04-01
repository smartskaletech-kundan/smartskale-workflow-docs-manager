# SmartSkale WorkFlow Docs Manager

## Current State
Empty backend actor. Frontend scaffolding exists with shadcn/ui components, Tailwind CSS, React, and TypeScript. No pages or app logic implemented yet.

## Requested Changes (Diff)

### Add
- **Projects**: Create, list, update, delete projects with name, description, status, priority, and due dates
- **Tasks**: Create, list, update, delete tasks linked to projects; fields: title, description, status (TODO/IN_PROGRESS/IN_REVIEW/DONE), priority (LOW/MEDIUM/HIGH/URGENT), assignee, due date
- **Documents**: Create, list, update, delete documents linked to projects; supports title, content (rich text), version tracking, file attachments via blob-storage
- **Team Management**: Role-based access (Admin, Manager, Member) via authorization component; list team members, assign roles
- **Dashboard**: Stats overview (project count, task count by status, recent activity, overdue items)
- **Kanban Board**: Drag-and-drop Kanban per project with columns: TODO, IN_PROGRESS, IN_REVIEW, DONE
- **Reports**: Charts showing task completion rates, project progress, member workload
- **Notifications**: In-app notification list for task assignments, status changes, document updates
- **Sidebar navigation**: Persistent sidebar with links to all sections
- **Authentication**: Internet Identity login via ICP

### Modify
- Backend: Replace empty actor with full data model

### Remove
- Nothing

## Implementation Plan
1. Select authorization and blob-storage components
2. Generate Motoko backend with actors for projects, tasks, documents, notifications
3. Build React frontend:
   - App shell with sidebar navigation
   - Login page (Internet Identity)
   - Dashboard page
   - Projects list + detail page
   - Kanban board page (per project)
   - Tasks page (global task list with filters)
   - Documents page (list + editor)
   - Team page
   - Reports page
   - Notifications panel
