import { getClient } from "@/lib/client";
import { UPDATE_LINK_MUTATION } from "@/lib/graphql";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .input(
      z.object({
        id: z.number().min(1),
      }),
    )
    .middleware(async ({ req, input }) => {
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { link_id: input.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const link_id = metadata.link_id;
      const file_url = file.url;
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { link_id, file_url };
    }),
  backgroundUpload: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ metadata, file }) => {
      const file_url = file.url;
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { file_url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
