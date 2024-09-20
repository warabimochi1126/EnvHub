import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

const supabase = createClient();
export async function POST(request: NextRequest) {
  const receivedFormData = await request.formData();
  console.log(receivedFormData.getAll("metaData"));

  return Response.json({ aaa: "bbb" });
}
