import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// The front door. Sends the user to the right place based on their state:
//   not logged in       -> /login
//   logged in, no biz   -> /onboarding
//   logged in, has biz  -> /dashboard
export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("business_id")
    .eq("id", user.id)
    .single();

  if (!profile?.business_id) {
    redirect("/onboarding");
  }

  redirect("/dashboard");
}
