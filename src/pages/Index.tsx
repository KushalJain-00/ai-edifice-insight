import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Building2, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  Users,
  TrendingUp,
  Award
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">UGC/AICTE Performance Tracker</h1>
              <p className="text-xs text-muted-foreground">Ministry of Education, Govt. of India</p>
            </div>
          </div>
          <Button onClick={() => navigate("/auth")}>
            Sign In / Register
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Official Government Portal
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI-Powered Institutional Performance & Compliance Tracking
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Streamlined document verification, performance scoring, and compliance monitoring 
            for higher education institutions across India
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/auth")}>
              Get Started
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")}>
              View Public Dashboard
              <BarChart3 className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-2">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI Document Processing</CardTitle>
              <CardDescription>
                Automatic OCR and NLP extraction from PDFs with confidence scoring
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-3 bg-success/10 rounded-lg w-fit mb-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <CardTitle>Smart Verification</CardTitle>
              <CardDescription>
                Streamlined approval workflow with automated anomaly detection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-lg w-fit mb-2">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Performance Tracking</CardTitle>
              <CardDescription>
                Comprehensive scoring based on research, rankings, and accreditation
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                For Institutions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Easy Document Upload</p>
                  <p className="text-sm text-muted-foreground">
                    Submit reports, accreditation docs, and ranking data
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Real-time Status Tracking</p>
                  <p className="text-sm text-muted-foreground">
                    Monitor submission status and AI extraction results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Performance Dashboard</p>
                  <p className="text-sm text-muted-foreground">
                    View your institution's scores and trends
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                For Reviewers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">AI-Assisted Review</p>
                  <p className="text-sm text-muted-foreground">
                    Pre-extracted data with confidence scores
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Anomaly Detection</p>
                  <p className="text-sm text-muted-foreground">
                    Automatic flagging of inconsistencies
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Audit Trail</p>
                  <p className="text-sm text-muted-foreground">
                    Complete compliance and transparency logs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t bg-card/50 backdrop-blur-sm py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 University Grants Commission (UGC) / All India Council for Technical Education (AICTE)</p>
          <p className="mt-2">Ministry of Education, Government of India</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
