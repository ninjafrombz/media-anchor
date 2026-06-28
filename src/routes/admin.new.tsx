import { createFileRoute } from "@tanstack/react-router";
import { PostForm } from "@/components/admin/post-form";

export const Route = createFileRoute("/admin/new")({
  component: () => <PostForm />,
});