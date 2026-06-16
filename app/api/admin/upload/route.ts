import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth/dal";

// Mints a short-lived client-upload token so the browser can upload large
// images directly to Vercel Blob (bypassing the serverless body limit). The DB
// row is created afterward by the createItem Server Action.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAuthenticated())) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
          addRandomSuffix: true,
          maximumSizeInBytes: 30 * 1024 * 1024,
        };
      },
      // Fires via Vercel callback in production only (skipped on localhost).
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
