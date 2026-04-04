import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "../backend";
import { Card, CardContent } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { useActor } from "../hooks/useActor";
import { useAuth } from "../hooks/useAuth";

export function Team() {
  const { actor } = useActor();
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor) return;
    actor
      .getProjects()
      .then((p) => {
        setProjects(p);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [actor]);

  // Collect unique members across all projects
  const memberMap: Record<string, string[]> = {};
  for (const p of projects) {
    for (const m of p.memberIds) {
      const pid = m.toString();
      if (!memberMap[pid]) memberMap[pid] = [];
      memberMap[pid].push(p.name);
    }
  }
  const members = Object.entries(memberMap);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <p className="text-slate-500 text-sm mt-0.5">
          {members.length} member{members.length !== 1 ? "s" : ""} across{" "}
          {projects.length} project{projects.length !== 1 ? "s" : ""}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-20">
          <Users className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">
            No team members yet. Create a project to get started.
          </p>
          {user && (
            <p className="text-slate-400 text-sm mt-2">
              Logged in as: <span className="font-medium">{user.email}</span>
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map(([principal, projectNames]) => {
            const short = principal.slice(0, 10) + "...";
            return (
              <Card key={principal} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold shrink-0">
                      {principal.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900 text-sm truncate">
                        {short}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-slate-500">Projects:</div>
                    {projectNames.slice(0, 3).map((name) => (
                      <div
                        key={name}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full inline-block mr-1"
                      >
                        {name}
                      </div>
                    ))}
                    {projectNames.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{projectNames.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
