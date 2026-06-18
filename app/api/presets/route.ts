import { NextResponse } from "next/server";
import { PRESET_WHEELS } from "@/lib/utils/constants";

export async function GET() {
  return NextResponse.json(PRESET_WHEELS);
}
