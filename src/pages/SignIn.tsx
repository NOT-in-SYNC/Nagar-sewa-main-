import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, AlertCircle, Github, Chrome, Fingerprint } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Basic validation: need either username or email + password
    if ((!username.trim() && !email.trim()) || !password.trim()) {
      setError("Enter your username or email, and your password.");
      setIsLoading(false);
      return;
    }

    // Demo: accept any credentials; replace with API auth later
    const displayName = username.trim() || email.trim();
    localStorage.setItem("nagarSevaAuth", "true");
    localStorage.setItem("nagarSevaUser", displayName);
    navigate("/app");

    setIsLoading(false);
  };

  const handleBackToLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue/5 via-background to-civic-green/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background/80 backdrop-blur-sm border border-border/50 shadow-elegant">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-civic rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{t("welcome_back")}</h1>
            <p className="text-muted-foreground">{t("signin_subtitle")}</p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium">
                {t("username")}
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("username")}
                className="mt-1"
                required={false}
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                {t("email")}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email")}
                className="mt-1"
                required={false}
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="mobile" className="text-sm font-medium">
                {t("mobile")}
              </Label>
              <Input
                id="mobile"
                type="tel"
                inputMode="numeric"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, "").slice(0, 10))}
                placeholder="9876543210"
                className="mt-1"
                required={false}
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">
                {t("password")}
              </Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("password")}
                  className="pr-10"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mb-2"><LanguageSwitcher /></div>
            <Button
              type="submit"
              className="w-full bg-gradient-civic hover:opacity-90 transition-opacity"
              disabled={isLoading || (!username.trim() && !email.trim()) || !password.trim()}
            >
              {isLoading ? t("signing_in") : t("sign_in")}
            </Button>
          </form>

          {/* Aadhaar Verification */}
          <div className="mt-8">
            <div className="flex items-center mb-3">
              <div className="h-px bg-border flex-1" />
              <span className="px-3 text-xs text-muted-foreground">Aadhaar verification</span>
              <div className="h-px bg-border flex-1" />
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                className="w-full bg-civic-green/90 hover:bg-civic-green text-white"
                onClick={() => {
                  const win = window.open("https://myaadhaar.uidai.gov.in/", "_blank");
                  if (!win) {
                    toast({ title: "Popup blocked", description: "Allow popups to open the UIDAI portal." });
                  }
                }}
              >
                <Fingerprint className="w-4 h-4 mr-2" /> Verify via UIDAI Portal
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const url = "https://connect.csc.gov.in/account/authorize?state=YMMCMAACK5Q942SQEM&response_type=code&client_id=76f80dea-122b-4427-9883-13fb5de738e0&redirect_uri=https://pgportal.gov.in/Signin/CscResponse";
                  const win = window.open(url, "_blank");
                  if (!win) {
                    toast({ title: "Popup blocked", description: "Allow popups to continue with Digital Seva Connect." });
                  }
                }}
              >
                {/* Ideally add CSC logo asset under public and reference here */}
                {t("csc_connect")}
              </Button>
              <p className="text-xs text-muted-foreground">
                Note: This Aadhaar number is used only to verify profile for Indian citizen. Nothing else; it is end-to-end encrypted.
              </p>
            </div>
          </div>

          {/* Social sign-in options */}
          <div className="flex items-center my-6">
            <div className="h-px bg-border flex-1" />
            <span className="px-3 text-xs text-muted-foreground">{t("or_continue_with")}</span>
            <div className="h-px bg-border flex-1" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => {
                const win = window.open("https://accounts.google.com/signin", "_blank");
                if (!win) {
                  toast({ title: "Popup blocked", description: "Allow popups to continue with Google." });
                  return;
                }
              }}
            >
              <Chrome className="w-4 h-4 mr-2" /> {t("google")}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const entered = window.prompt("Enter your GitHub username or email:")?.trim() || "";
                if (!entered) return;
                localStorage.setItem("nagarSevaAuth", "true");
                localStorage.setItem("nagarSevaUser", entered);
                navigate("/app");
              }}
            >
              <Github className="w-4 h-4 mr-2" /> {t("github")}
            </Button>
          </div>

          {/* Back to Landing */}
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={handleBackToLanding}
              className="text-muted-foreground hover:text-foreground"
              disabled={isLoading}
            >
              {t("back_to_landing")}
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border/30 text-center">
            <p className="text-xs text-muted-foreground">Use your email/username and password, or continue with Google/GitHub.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;
