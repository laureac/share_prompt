import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";

type ParamsProps = {
  params: { id: number };
};

export const GET = async (req: NextRequest, { params }: ParamsProps) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest, { params }: ParamsProps) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const updatePrompt = await Prompt.findById(params.id).populate("creator");
    if (!updatePrompt) return new Response("Prompt Not Found", { status: 404 });

    updatePrompt.prompt = prompt;
    updatePrompt.tag = tag;

    await updatePrompt.save();

    return new Response("Success updating prompt", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest, { params }: ParamsProps) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
