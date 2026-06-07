import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { path, secret } = await request.json();

        if (secret !== process.env.REVALIDATION_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!path) {
            return NextResponse.json({ error: "Path is required" }, { status: 400 });
        }

        revalidatePath(path);
        return NextResponse.json({ revalidated: true, path });
    } catch {
        return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
    }
}
