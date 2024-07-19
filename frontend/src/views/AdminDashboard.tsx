/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import { GetUserQueryQuery } from "@/__generated__/graphql";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ADD_LINK_MUTATION,
  UPDATE_LINK_MUTATION,
  UPDATE_USER_MUTATION,
  USER_QUERY,
  USER_QUERY_WITH_LINK,
} from "@/lib/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useDebounceCallback } from "usehooks-ts";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { SocialIcon } from "react-social-icons";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/utils/uploadthing";
import {
  CircleHelp,
  GripVertical,
  Loader,
  Palette,
  Plus,
  ScanEye,
  Trash,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from "@hello-pangea/dnd";
import { toast } from "sonner";

const DEBOUNCE_TIME = 1500;

interface Links {
  id: number;
  title: string;
  url: string;
  show_icon: boolean;
  uploaded_icon: string | null | undefined;
}

const AdminDashboard = ({
  userData,
}: {
  userData: NonNullable<GetUserQueryQuery["getUser"]>;
}) => {
  const { data: user, refetch } = useQuery(USER_QUERY_WITH_LINK, {
    variables: {
      email: userData.email,
    },
  });

  const [updateUser, { loading: updateLoading }] =
    useMutation(UPDATE_USER_MUTATION);

  const [updateLink, { loading: isUpdateLoading }] =
    useMutation(UPDATE_LINK_MUTATION);

  const [createLinkMutation, { loading: isCreateLoading }] =
    useMutation(ADD_LINK_MUTATION);

  const [links, setLinks] = useState<Links[]>([]);

  const profile_title = z.string().min(1).max(100);
  const bio = z.string().min(1).max(250);

  const handleChangeTitle = useDebounceCallback(async (value: string) => {
    try {
      profile_title.parse(value);
      await updateUser({
        variables: {
          oldValue: {
            id: userData.id,
            profile_title: user?.getUser?.profile_title,
          },
          newValue: {
            profile_title: value,
          },
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }, DEBOUNCE_TIME);

  const handleChangeBio = useDebounceCallback(async (value: string) => {
    try {
      bio.parse(value);
      await updateUser({
        variables: {
          oldValue: {
            id: userData.id,
            bio: user?.getUser?.bio,
          },
          newValue: {
            bio: value,
          },
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }, DEBOUNCE_TIME);

  const handleLinkChange = useCallback((link: Links) => {
    setLinks((current) =>
      current.map((item) => {
        if (item.id === link.id) {
          return {
            id: item.id,
            title: item.title !== link.title ? link.title : item.title,
            url: item.url !== link.url ? link.url : item.url,
            show_icon:
              item.show_icon !== link.show_icon
                ? link.show_icon
                : item.show_icon,
            uploaded_icon:
              item.uploaded_icon !== link.uploaded_icon
                ? link.uploaded_icon
                : item.uploaded_icon,
          };
        }
        return item;
      }),
    );
  }, []);

  const handleEditLink = useCallback(async (link: Links) => {
    try {
      await updateLink({
        variables: {
          value: {
            id: link.id,
            title: link.title,
            url: link.url,
            show_icon: link.show_icon,
          },
        },
      });
    } catch (error) {
      toast.error("Error occurred while updating the order of the links");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user?.getUser?.links) {
      setLinks([
        ...user?.getUser?.links?.map((link) => {
          return {
            id: link.id,
            title: link.title,
            url: link.url,
            show_icon: link.show_icon,
            uploaded_icon: link.uploaded_icon,
          };
        }),
      ]);
    }
  }, [user]);

  return (
    <fieldset className="h-full w-full border border-dashed p-3">
      <legend className="px-2 text-sm">Admin Dashboard</legend>

      <div className="flex h-full w-full gap-10">
        <ScrollArea className="h-[calc(100vh-10.25rem)] w-full">
          <div className="space-y-3">
            <div className="">
              <Label htmlFor="profile-title">Profile Title</Label>
              <Input
                id="profile-title"
                placeholder="shadcn"
                onChange={(e) => handleChangeTitle(e.target.value)}
                defaultValue={user?.getUser?.profile_title ?? ""}
                maxLength={100}
              />
            </div>

            <div className="">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                placeholder="shadcn"
                id="bio"
                defaultValue={user?.getUser?.bio ?? ""}
                onChange={(e) => handleChangeBio(e.target.value)}
                maxLength={250}
              />
            </div>

            <Button
              className="w-full rounded-md bg-accent hover:bg-accent/80"
              disabled={isCreateLoading}
              onClick={async () => {
                await createLinkMutation({
                  variables: {
                    value: {
                      user_id: userData.id,
                      order: links.length + 1,
                      title: "",
                      url: "",
                      show_icon: false,
                    },
                  },
                });

                await refetch();
              }}
            >
              {isCreateLoading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <>
                  <Plus size={18} />
                  Add link
                </>
              )}
            </Button>
          </div>

          <DragDropContext
            onDragEnd={(result) => {
              const items = Array.from(links);
              const [reorderedItem] = items.splice(result.source.index, 1);
              items.splice(
                result.destination?.index ?? result.source.index,
                0,
                reorderedItem,
              );

              setLinks(items);

              Promise.all(
                items.map((link, index) => {
                  updateLink({
                    variables: {
                      value: {
                        id: link.id,
                        order: index + 1,
                        title: link.title,
                        url: link.url,
                        show_icon: link.show_icon,
                      },
                    },
                  });
                }),
              );
            }}
          >
            <Droppable droppableId="links">
              {(provided) => (
                <ul
                  className="links flex flex-col"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {links.map((link, index) => (
                    <Draggable
                      key={link.id}
                      draggableId={link.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className=""
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div className="h-2 w-full"></div>
                          <LinkComponent
                            link={link}
                            dragProps={provided.dragHandleProps}
                            handleLinkChange={handleLinkChange}
                            handleEditLink={handleEditLink}
                          />
                          <div className="h-2 w-full"></div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </ScrollArea>
        <div className="relative hidden h-full w-full flex-col items-center space-y-4 rounded-md bg-slate-100 p-5 pt-10 md:flex">
          <Loader
            className={cn("absolute left-3 top-3 hidden animate-spin", {
              block: updateLoading,
            })}
            size={18}
          />
          <LinkPreview user={user} links={links} />
        </div>

        <Drawer>
          <DrawerTrigger className="fixed bottom-8 left-0 right-0 mx-auto flex h-20 w-20 flex-col items-center justify-center rounded-md border bg-white md:hidden">
            <ScanEye />
            <p className="text-sm">Preview</p>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>Preview</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col items-center justify-center space-y-4 p-5">
              <LinkPreview user={user} links={links} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </fieldset>
  );
};

const LinkComponent = ({
  link,
  dragProps,
  handleLinkChange,
  handleEditLink,
}: {
  link: Links;
  dragProps: DraggableProvidedDragHandleProps | null;
  handleLinkChange: (link: Links) => void;
  handleEditLink: (link: Links) => void;
}) => {
  const [link_values, setLinkValues] = useState<Links>({
    id: link.id,
    title: link.title,
    url: link.url,
    show_icon: link.show_icon,
    uploaded_icon: link.uploaded_icon,
  });

  const handleEdit = useDebounceCallback(async () => {
    try {
      handleLinkChange(link_values);
      handleEditLink(link_values);
    } catch (error) {
      console.log(error);
    }
  }, DEBOUNCE_TIME);

  const handleChangeValues = useDebounceCallback(
    ({
      value,
      change,
    }: {
      value: string;
      change: "title" | "url" | "show_icon";
    }) => {
      if (change === "title") {
        setLinkValues({
          id: link.id,
          title: value,
          url: link.url,
          show_icon: link.show_icon,
          uploaded_icon: link.uploaded_icon,
        });
      } else if (change === "url") {
        setLinkValues({
          id: link.id,
          title: link.title,
          url: value,
          show_icon: link.show_icon,
          uploaded_icon: link.uploaded_icon,
        });
      }
    },
    DEBOUNCE_TIME,
  );

  const handleChangeCheck = ({ value }: { value: boolean }) => {
    setLinkValues({
      id: link.id,
      title: link.title,
      url: link.url,
      show_icon: value,
      uploaded_icon: link.uploaded_icon,
    });
  };

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    handleEdit();
  }, [link_values]);

  return (
    <div className="flex w-full items-center gap-2 space-y-2 rounded-md border bg-white p-2 pb-3 pr-4 shadow-sm">
      <div className="flex h-44 items-center" {...dragProps}>
        <GripVertical strokeWidth="1" />
      </div>
      <div className="w-full space-y-3">
        <div className="">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Type your title here"
            onChange={(e) => {
              const value = e.target.value;
              handleChangeValues({ value, change: "title" });
            }}
            maxLength={100}
            defaultValue={link_values.title}
          />
        </div>

        <div className="">
          <Label htmlFor="url">URL</Label>
          <Input
            placeholder="Type your URL here"
            id="url"
            onChange={(e) => {
              const value = e.target.value;
              handleChangeValues({ value, change: "url" });
            }}
            maxLength={250}
            defaultValue={link_values.url}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger>
                      <ImageIcon
                        size={18}
                        strokeWidth={1.2}
                        className="opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload an icon</DialogTitle>
                        <DialogDescription>
                          This will override the default icon that we provide
                          based on the URL input.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex w-full flex-col items-center justify-center gap-3">
                        <div className="flex w-24 flex-col items-center justify-center space-y-2">
                          <SocialIcon
                            url={link.url}
                            className=""
                            as="div"
                            style={{ width: 40, height: 40 }}
                          />
                          <p className="text-xs">Current icon</p>
                        </div>

                        <div
                          {...getRootProps()}
                          className="inset flex w-full cursor-pointer items-center justify-center rounded-xl bg-slate-100 py-4 outline-dashed outline-black/20"
                        >
                          <input {...getInputProps()} />
                          <div className="flex flex-col items-center gap-1 opacity-60">
                            <Upload />
                            <p className="text-sm">Drop files here!</p>
                          </div>
                        </div>
                      </div>

                      <DialogFooter className="mt-2 flex w-full gap-1">
                        <Button className="w-full" variant={"destructive"}>
                          Reset to default
                        </Button>
                        <Button className="w-full">Save</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload icon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Palette
                    size={18}
                    strokeWidth={1.2}
                    className="opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Trash
                    size={18}
                    strokeWidth={1.2}
                    className="opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center justify-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="my-auto h-fit">
                    <CircleHelp
                      size={16}
                      strokeWidth={1.2}
                      className="opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    We automatically add the icon based on the URL input. If the
                    URL is not invalid, we may not be able to get its icon. See
                    the available icons{" "}
                    <Link
                      target="_blank"
                      href="https://camo.githubusercontent.com/bb10ce76806a2db855ae9411682342b31f2857ce8ab62b8c0a46d3c3cdb77fdf/68747470733a2f2f7374617469632e72656163742d736f6369616c2d69636f6e732e636f6d2f726561646d652d696d6167652e706e67"
                      className="text-accent underline"
                    >
                      here
                    </Link>{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Label htmlFor="thumbnail">Show icon</Label>

            <Switch
              checked={link_values.show_icon}
              id="thumbnail"
              className="bg-accent"
              onCheckedChange={(value) => {
                handleChangeCheck({ value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkPreview = ({
  user,
  links,
}: {
  user: GetUserQueryQuery | undefined;
  links: Links[];
}) => {
  return (
    <>
      <Image
        src={(user?.getUser?.image as string) ?? ""}
        alt={user?.getUser?.name as string}
        width={500}
        height={500}
        className="w-20 rounded-full"
      />
      <div className="text-center">
        <h1 className="font-bold">@{user?.getUser?.profile_title}</h1>
        <h1 className="text-sm">{user?.getUser?.bio}</h1>
      </div>

      <div className="mt-4 w-full max-w-xs space-y-4">
        {links.map((link) => (
          <div
            className="shadowed-button relative flex h-14 w-full items-center justify-center rounded-full border border-black bg-white"
            key={link.id}
          >
            <p className="text-black">{link.title}</p>
            {link.show_icon && (
              <div className="absolute left-2">
                <SocialIcon
                  url={link.url}
                  className=""
                  as="div"
                  style={{ width: 40, height: 40 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="absolute bottom-10 left-0 right-0 mx-auto w-fit font-medium">
        Join Treelink
      </p>
    </>
  );
};

export default AdminDashboard;
