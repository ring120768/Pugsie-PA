import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CustomerImport from "@/components/CustomerImport";

export default async function ImportCustomersPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="container">
      <h1>Import customers</h1>
      <div className="spacer" />
      <CustomerImport />
    </div>
  );
}
