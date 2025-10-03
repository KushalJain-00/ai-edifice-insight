import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  LogOut, 
  Building2, 
  FileText, 
  TrendingUp, 
  Users, 
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    totalInstitutions: 0,
    pendingDocuments: 0,
    approvedDocuments: 0,
    underReview: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setProfile(profileData);

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (roleData) {
        setUserRole(roleData.role);
        await fetchStats(roleData.role, session.user.id);
      }

      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  const fetchStats = async (role: string, userId: string) => {
    if (role === "reviewer" || role === "admin") {
      const { count: institutions } = await supabase
        .from("institutions")
        .select("*", { count: "exact", head: true });

      const { count: pending } = await supabase
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: approved } = await supabase
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("status", "approved");

      const { count: underReview } = await supabase
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("status", "under_review");

      setStats({
        totalInstitutions: institutions || 0,
        pendingDocuments: pending || 0,
        approvedDocuments: approved || 0,
        underReview: underReview || 0,
      });
    } else if (role === "institution") {
      const { data: institution } = await supabase
        .from("institutions")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (institution) {
        const { count: pending } = await supabase
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("institution_id", institution.id)
          .eq("status", "pending");

        const { count: approved } = await supabase
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("institution_id", institution.id)
          .eq("status", "approved");

        const { count: underReview } = await supabase
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("institution_id", institution.id)
          .eq("status", "under_review");

        setStats({
          totalInstitutions: 1,
          pendingDocuments: pending || 0,
          approvedDocuments: approved || 0,
          underReview: underReview || 0,
        });
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">UGC/AICTE Performance Tracker</h1>
              <p className="text-sm text-muted-foreground">Institutional Excellence Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{profile?.full_name}</p>
              <Badge variant="outline" className="text-xs">
                {userRole}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name}</h2>
          <p className="text-muted-foreground">
            {userRole === "reviewer" && "Review pending documents and manage institutional compliance"}
            {userRole === "institution" && "Upload documents and track your institution's performance"}
            {userRole === "admin" && "Oversee all institutions and manage the platform"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {userRole === "institution" ? "Your Institution" : "Total Institutions"}
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInstitutions}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Registered in system
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.pendingDocuments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting verification
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              <AlertCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.underReview}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Being processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.approvedDocuments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Verified documents
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access key features and tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {userRole === "institution" && (
                <>
                  <Button className="w-full justify-start" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Submissions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Performance Reports
                  </Button>
                </>
              )}
              {(userRole === "reviewer" || userRole === "admin") && (
                <>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Review Documents
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Building2 className="h-4 w-4 mr-2" />
                    Manage Institutions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics Dashboard
                  </Button>
                  {userRole === "admin" && (
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      User Management
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Document Approved</p>
                    <p className="text-xs text-muted-foreground">
                      Research report verified successfully
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Clock className="h-4 w-4 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pending Review</p>
                    <p className="text-xs text-muted-foreground">
                      New NAAC accreditation document
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Performance Update</p>
                    <p className="text-xs text-muted-foreground">
                      New ranking data available
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
