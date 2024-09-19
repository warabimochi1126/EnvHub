import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const receivedFormData = await request.formData();
  console.log(receivedFormData);

  return Response.json({ aaa: "bbb" });
}
