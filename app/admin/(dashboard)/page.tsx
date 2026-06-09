import Link from "next/link";
import {
  getAdminDashboardStats,
  getRecentLeads,
} from "@/lib/supabase/admin-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  Briefcase,
  FolderKanban,
  Mail,
  ClipboardList,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [stats, recentLeads] = await Promise.all([
    getAdminDashboardStats(),
    getRecentLeads(5),
  ]);

  const statCards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      sub: `${stats.newLeads} new`,
      icon: Users,
      href: "/admin/leads",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Blog Posts",
      value: stats.totalBlogPosts,
      sub: `${stats.publishedPosts} published · ${stats.draftPosts} drafts`,
      icon: FileText,
      href: "/admin/blogs",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Job Listings",
      value: stats.totalJobs,
      sub: `${stats.activeJobs} active`,
      icon: Briefcase,
      href: "/admin/jobs",
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      sub: "Total received",
      icon: ClipboardList,
      href: "/admin/applications",
      color: "from-orange-500 to-amber-500",
    },
    {
      title: "Subscribers",
      value: stats.totalSubscribers,
      sub: "Active subscribers",
      icon: Mail,
      href: "/admin/newsletter",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
    read: "bg-blue-500/15 text-blue-700 border-blue-500/20",
    contacted: "bg-amber-500/15 text-amber-700 border-amber-500/20",
    closed: "bg-gray-500/15 text-gray-600 border-gray-500/20",
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)] text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Welcome to the ASCIRVO admin dashboard
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border-border/50">
                <CardContent className="pt-5 pb-4 px-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold mt-1 font-[family-name:var(--font-sora)]">
                        {card.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {card.sub}
                      </p>
                    </div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} shadow-sm`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Leads */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold font-[family-name:var(--font-sora)]">
              Recent Leads
            </CardTitle>
            <Link
              href="/admin/leads"
              className="text-sm text-[#1B4FD8] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No leads yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.email}
                      {lead.company ? ` · ${lead.company}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <Badge
                      variant="outline"
                      className={`text-[10px] capitalize ${
                        statusColors[lead.status] ?? ""
                      }`}
                    >
                      {lead.status}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "New Blog Post", href: "/admin/blogs/new", icon: FileText },
          { label: "Post New Job", href: "/admin/jobs/new", icon: Briefcase },
          {
            label: "New Case Study",
            href: "/admin/case-studies/new",
            icon: FolderKanban,
          },
          { label: "View Leads", href: "/admin/leads", icon: Users },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.href} href={action.href}>
              <Card className="group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer border-border/50">
                <CardContent className="flex items-center gap-3 py-4 px-5">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-[#1B4FD8] transition-colors" />
                  <span className="text-sm font-medium">{action.label}</span>
                  <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
