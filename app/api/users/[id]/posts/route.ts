import type { NextApiRequest } from "next";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (
  req: NextApiRequest,
  { params }: { params: { id: number } }
) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
